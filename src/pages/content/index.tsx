import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { addCommentToLocalStorage, addPostToLocalStorage, fetchGeminiSuggestion } from "@src/lib/lib";
import browser from "webextension-polyfill";
import { supabase } from "@src/utils/supabase/supabase";
import { signUpNewUser } from "@src/actions";

// Ensure we don't inject multiple root elements
if (!document.getElementById("__react_root")) {
  const div = document.createElement("div");
  div.id = "__react_root";
  document.body.appendChild(div);
}

const rootContainer = document.querySelector("#__react_root");
if (!rootContainer) throw new Error("Can't find Content root element");

const root = createRoot(rootContainer);

const App = () => {
  const [postData, setPostData] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [generatedComment, setGeneratedComment] = useState<string | null>(null);
  const [activeTextBox, setActiveTextBox] = useState<HTMLElement | null>(null);

  const handleCommentButton = async (event: FocusEvent) => {
    console.log("Comment button clicked")
    //@ts-expect-error sendMessage type error
    browser.runtime.sendMessage({ action: "addComment" },
      ()=>console.log("Message sent")
    );
    
    const commentResponse = await addCommentToLocalStorage();
    console.log("Comment response", commentResponse);
  };

  const handlePostButton = async (event: MouseEvent) => {
    console.log("Post button clicked");
  
    const target = event.target as HTMLElement;
  
    if (target.classList.contains("artdeco-button--disabled")) {
      console.log("Button is disabled");
    } else {
    
      
      const postResponse = await addPostToLocalStorage();
      console.log("POST response", postResponse);
    }
  };
  
  

  const handleAiButtonClick = (event : FocusEvent)=>{
   
    const button = event.target as HTMLElement;
    const textBox = button.closest(".comments-comment-box-comment__text-editor") as HTMLElement;
    if(textBox){
      setActiveTextBox(textBox);
    }

     // Find the nearest post container and extract the description
     const postContainer = textBox.closest(".feed-shared-update-v2");
     const description = postContainer?.querySelector(".feed-shared-update-v2__description")?.textContent?.trim();

     
     setPostData(description || null);
  }

  useEffect(() => {
    const handleBlur = (event: FocusEvent) => {
      const textBox = event.target as HTMLElement;
      textBox?.querySelector(".ai-icon")?.remove();
    };

    const attachEventListeners = () => {
      const textBoxList = document.querySelectorAll(".comments-comment-box-comment__text-editor");
      textBoxList.forEach((textBox) => {
        if (!(textBox as HTMLElement).dataset.listenerAdded) {

          if (!textBox.querySelector(".ai-icon")) {
            const container = document.createElement("div");
            container.className = "ai-icon";
            container.setAttribute(
              "style",
              "position: absolute; bottom: 0; right: 8rem; display: flex; align-items: center; justify-content: center; height: 100%; "
            );
    
            const button = document.createElement("button");
            button.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/></svg>';

            button.classList.add("ai-suggest-btn");

            button.addEventListener("click", handleAiButtonClick);

            container.appendChild(button);
            textBox.appendChild(container);
          }

          
          (textBox as HTMLElement).dataset.listenerAdded = "true";
          (textBox as HTMLElement).addEventListener("blur", handleBlur);
        }
      });

      const commentSubmitButtons = document.querySelectorAll('.comments-comment-box__submit-button--cr.artdeco-button--primary')
      commentSubmitButtons.forEach((button) =>{
        if(!(button as HTMLElement).dataset.listenerAdded){
          (button as HTMLElement).dataset.listenerAdded = "true";
          (button as HTMLElement).addEventListener("click", handleCommentButton);
        }
      })

      const postButtons = document.querySelectorAll(".share-box_actions button")
      postButtons.forEach((button)=>{
        (button as HTMLElement).addEventListener("click", handlePostButton)
      })

    };

    const observeDOMChanges = () => {
      const observer = new MutationObserver(() => {
        attachEventListeners();
      });

      observer.observe(document.body, { childList: true, subtree: true });
      return observer;
    };

    // Initial listener attachment
    attachEventListeners();
    const observer = observeDOMChanges();

    return () => {
      observer.disconnect(); // Cleanup MutationObserver when unmounting
      document.querySelectorAll(".comments-comment-box-comment__text-editor").forEach((textBox) => {
        (textBox as HTMLElement).removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  useEffect(() => {
    const fetchSuggestion = async () => {
      if (postData) {
        const response = await fetchGeminiSuggestion(postData);
        console.log("Generated Comment:", response);
        setGeneratedComment(response);
      }
    };

    fetchSuggestion();
  }, [postData]); // Fetch suggestion only when postData changes

  // Insert generated comment into the text box
  useEffect(() => {
    if (generatedComment && activeTextBox) {
      const textArea = activeTextBox.getElementsByTagName("p");

      if (textArea.length > 0) {
        textArea[0].textContent = ""; // Clear existing content
        textArea[0].textContent =" Generating Comment ...."
      }

      setTimeout(() => {
      if (textArea[0]) {
        textArea[0].textContent = generatedComment;
      }
    }, 2000);

      const aiIcon = activeTextBox.getElementsByClassName("ai-icon");
      if (aiIcon.length > 0) {
        aiIcon[0].remove(); // Remove the first AI button
      }

      setGeneratedComment(""); // Reset generated comment after insertion
    }
  }, [generatedComment, activeTextBox]);

  
  return (
    <div>
    </div>
  );
};

root.render(<App />);
