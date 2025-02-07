import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { fetchGeminiSuggestion } from "@src/lib/lib";

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleBlur = (event: FocusEvent) => {
      const textBox = event.target as HTMLElement;
      textBox?.querySelector(".ai-icon")?.remove();
    };

    const handleFocus = (event: FocusEvent) => {
      const textBox = event.target as HTMLElement;
      textBox.style.backgroundColor = "red";

      // Find the nearest post container and extract the description
      const postContainer = textBox.closest(".feed-shared-update-v2");
      const description = postContainer?.querySelector(".feed-shared-update-v2__description")?.textContent?.trim();

      console.log("Focused post description:", description);
      setPostData(description || null);

      // Inject AI icon into the focused comment box
      if (!textBox.querySelector(".ai-icon")) { // Prevent duplicate icons
        const container = document.createElement("div");
        container.className = "ai-icon";
        container.setAttribute("style", "position:absolute; bottom:0; right:6rem;");

        const imgElement = document.createElement("img");
        imgElement.src = "https://icon-icons.com/icons2/961/PNG/512/bulb_icon-icons.com_74600.png";
        imgElement.alt = "ai-icon";
        imgElement.setAttribute("style", "width: 32px; height: 32px; cursor:pointer;");
        imgElement.addEventListener("click", () => {
          setShowModal((prev) => !prev);
        });

        container.appendChild(imgElement);
        textBox.appendChild(container);
      }
    };

    const attachEventListeners = () => {
      const textBoxList = document.querySelectorAll(".comments-comment-box-comment__text-editor");
      textBoxList.forEach((textBox) => {
        (textBox as HTMLElement).style.backgroundColor = 'red';
        if (!(textBox as HTMLElement).dataset.listenerAdded) {
          (textBox as HTMLElement).dataset.listenerAdded = "true";
          (textBox as HTMLElement).addEventListener("click", ()=>{
            alert("clicked");
            const postContainer = textBox.closest(".feed-shared-update-v2");
            const descriptionElement = postContainer?.querySelector(".feed-shared-update-v2__description");
            const description = descriptionElement?.textContent?.trim();
            console.log("Description : ", description)
          });
          (textBox as HTMLElement).addEventListener("focus", handleFocus);
          (textBox as HTMLElement).addEventListener("blur", handleBlur);
        }
      });
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
        (textBox as HTMLElement).removeEventListener("focus", handleFocus);
        (textBox as HTMLElement).removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  useEffect(() => {
    const fetchSuggestion = async () => {
      if (postData) {
        console.log("Fetching suggestion for:", postData);
        const response = await fetchGeminiSuggestion(postData);
        console.log("Generated Comment:", response);
      }
    };

    fetchSuggestion();
  }, [postData]); // Fetch suggestion only when postData changes

  return (
    <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50 p-2">
      Content script <span className="font-bold">loaded</span>
      <button className="ml-2 px-2 py-1 bg-black text-white" onClick={() => setShowModal(true)}>
        Show AI Icon
      </button>
    </div>
  );
};

root.render(<App />);