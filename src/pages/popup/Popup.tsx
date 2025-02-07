import React, { useEffect } from 'react';

export default function Popup() {
  
    useEffect(() => {
        const intervalId = setInterval(() => {
          const elements = document.querySelectorAll(".feed-shared-update-v2__description");
          if (elements.length > 0) {
            console.log("Elements found!");
            elements.forEach((element) => {
              (element as HTMLElement).style.backgroundColor = "red";
            });
            clearInterval(intervalId);
          } else {
            console.log("Waiting for elements...");
          }
        }, 1000); // Check every second
      
        return () => clearInterval(intervalId);
      }, []);
      

  const handleFocus = ()=>{
    const textBox = document.querySelector('.msg-form__contenteditable') as HTMLElement;

    if(textBox){
        alert("focused")
    }
    textBox.style.backgroundColor = "red";
    
  }
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".msg-form__contenteditable");
      if (textBox) {
        textBox.addEventListener("focus", handleFocus);
        // textBox.addEventListener("blur", handleBlur);
        clearInterval(intervalId); // Stop checking once the class is found
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  

  return (
    <>
     <h1>Hello, world!</h1>
     <button className= 'p-4 bg-black text-white hover:cursor-pointer'
     onClick={()=>{applyStyles()}}>
        change color to gray
     </button>
    </>
  ); // No UI, just a side effect
}



const applyStyles = () => {
    console.log("apply styles called")
    const elements = document.querySelectorAll(".feed-shared-update-v2__description");
    elements.forEach((element) => {
      (element as HTMLElement).style.backgroundColor = "red";
      const text = (element as HTMLElement).innerText
      alert(text);
    });
  };