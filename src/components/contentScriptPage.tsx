import React, { useEffect } from 'react'
import '../stylesheets/global.scss'

const ContentPage = () => {
	const searchPageContent = document.querySelectorAll(
		"h1, h2, h3, h4, h5, p, li, td, th, caption, span, button, strong, em, div:not(:has(a)), pre, code, br, hr, input, select, textarea, option"
	  );
	  // Highlighting
	  chrome.runtime.onMessage.addListener(function (request,sender, sendResponse) {
		if (request.action === "highlight") {
		  console.log("Received text in content script:", request.text);
		  highlightText(request.text);
		} else if (request.action === "unhighlight") {
		  console.log("Received text in content script:", request.text);
		  removeHighlight();
		}
	  });
	
	  const highlightText = (text) => {
		searchPageContent.forEach((element) => {
		  if (
			element.tagName.toLowerCase() !== "a" &&
			element.tagName.toLowerCase() !== "img"
		  ) {
			const innerHTML = element.innerHTML;
			const highlightedHTML = innerHTML.replace(
			  new RegExp(text, "gi"),
			  (match) => `<span class="highlight">${match}</span>`
			);
			element.innerHTML = highlightedHTML;
		  }
		});
	  };
	
	  const removeHighlight = () => {
		const highlightedElements = document.querySelectorAll(".highlight");
		highlightedElements.forEach((element) => {
		  const parent = element.parentNode;
		  parent.replaceChild(
			document.createTextNode(element.textContent),
			element
		  );
		});
	  };
	
	  useEffect(() => {
		const handleMouseUp = () => {
		  const selectedText = window.getSelection().toString();
		  console.log("selection.toString()", selectedText);
		  if (selectedText.length > 0) {
			chrome.runtime.sendMessage({
			  action: "updatePopup",
			  selectedText: selectedText,
			});
		  }
		};
	
		window.addEventListener("mouseup", handleMouseUp);
	
		return () => {
		  window.removeEventListener("mouseup", handleMouseUp);
		};
	  }, []);
	
	  return <></>;
}

export default ContentPage
