import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./style.css"

// Create and inject a React UI into the page
const div = document.createElement("div")
div.id = "__react_root"
document.body.appendChild(div)

const rootContainer = document.querySelector("#__react_root")
if (!rootContainer) throw new Error("Can't find Content root element")

const root = createRoot(rootContainer)

// Function to modify the DOM elements
const applyStyles = () => {
  console.log("applyStyles called")
  
  const elements = document.querySelectorAll(".feed-shared-update-v2__description")
  if (elements.length > 0) {
    console.log("Elements found! Applying styles...")
    elements.forEach((element) => {
      (element as HTMLElement).style.backgroundColor = "red"
    })
  } else {
    console.log("Waiting for elements...")
  }
}

const App = () => {
  useEffect(() => {
    console.log("Content script L dawg")
    const textBox = document.querySelector(".feed-shared-update-v2__description");
    console.log("Text box text : ", textBox?.innerHTML)

    // Interval to check for elements every second
    const intervalId = setInterval(() => {
      applyStyles()
    }, 1000)

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      applyStyles()
    })

    observer.observe(document.body, { subtree: true, childList: true })

    return () => {
      clearInterval(intervalId) // Cleanup interval
      observer.disconnect() // Cleanup observer
    }
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
