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
  const [postData, setPostData] = useState(null);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".comments-comment-box-comment__text-editor");
      if (textBox) {
        textBox.addEventListener("focus", handleFocus);
        textBox.addEventListener("blur", handleBlur);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      const textBox = document.querySelector(".comments-comment-box-comment__text-editor");
      textBox?.removeEventListener("focus", handleFocus);
      textBox?.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleBlur = () => {
    const textBox = document.querySelector(".comments-comment-box-comment__text-editor");
    const container = textBox?.querySelector(".ai-icon");
    container?.remove();
  };

  const handleFocus = () => {
    const textBox = document.querySelector(".comments-comment-box-comment__text-editor");
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
    textBox?.appendChild(container);
  };

  useEffect(() => {
    const fetchSuggestion = async () => {
      const description = document.querySelector(".feed-shared-update-v2__description");
      console.log("Description : ", description?.textContent);

      const postData = description?.textContent;
      let response = "Couldn't generate suggestion";

      if (postData) {  
          response = await fetchGeminiSuggestion(postData.trim());
          console.log("generated Comment :", response)
      }

      console.log(response);
    };

    fetchSuggestion();
  }, []);

  return (
    <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50 p-2">
      Content script <span className="font-bold">loaded</span>
      <button className="ml-2 px-2 py-1 bg-black text-white" onClick={handleFocus}>
        Show AI Icon
      </button>
    </div>
  );
};

root.render(<App />);
