import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import "./style.css"
import { fetchGeminiSuggestion } from '@src/lib/lib';

// Create and inject a React UI into the page
const div = document.createElement("div")
div.id = "__react_root"
document.body.appendChild(div)

const rootContainer = document.querySelector("#__react_root")
if (!rootContainer) throw new Error("Can't find Content root element")

const root = createRoot(rootContainer)

// Function to modify the DOM elements
const applyStyles = () => {

  
  const element = document.querySelector(".feed-shared-update-v2__description");

  const commentBox = document.querySelector(".ql-editor");
  
    
  (commentBox as HTMLElement).style.backgroundColor = 'blue';
  


 console.log("Waiting for elements...")
  
}

const App = () => {

  const [postData, setPostData] = useState(null);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".comments-comment-box-comment__text-editor");
      if (textBox) {
        textBox.addEventListener("focus", handleFocus);
        textBox.addEventListener("blur", handleBlur);
        clearInterval(intervalId); // Stop checking once the class is found
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

   // method to unmount AI Icon
   const handleBlur = () => {
    const textBox = document.querySelector(".comments-comment-box-comment__text-editor");
    const container = textBox?.querySelector(".ai-icon"); 
    container?.remove();
  };


   // method to mount AI Icon
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
      setShowModal(true);
    });
    container.appendChild(imgElement);
    textBox?.appendChild(container);
  };




  useEffect(() => {
    const textBox = document.querySelector(".feed-shared-update-v2__description");
    console.log("Text box text : ", textBox?.textContent)

    const postData = textBox;

    // // Interval to check for elements every second
    // const intervalId = setInterval(() => {
    //   applyStyles()
    // }, 1000)

    // // MutationObserver to handle dynamically added elements
    // const observer = new MutationObserver(() => {
    //   applyStyles()
    // })

    // observer.observe(document.body, { subtree: true, childList: true })

    // return () => {
    //   clearInterval(intervalId) // Cleanup interval
    //   observer.disconnect() // Cleanup observer
    // }
  }, [])

  return (
    <div className="absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50 p-2">
      Content script <span className="font-bold">loaded</span>
      <button className="ml-2 px-2 py-1 bg-black text-white" onClick={applyStyles}>
        Change Color
      </button>
    </div>
  )
}

root.render(<App />)
