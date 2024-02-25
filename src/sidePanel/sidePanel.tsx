import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./sidePanel.scss";
import { apiRequestBangla, apiRequestGerman } from "../utils/api";

const SidePanel = () => {
  const [englishText, setEnglishText] = useState("Select preferred word(s)");
  const [germanText, setGermanText] = useState("Translation");
  const [banglaText, setBanglaText] = useState("Translation");

  const handleSuggest = () => {
    console.log("Suggest button clicked");
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  useEffect(() => {
    apiRequestGerman(englishText)
      .then((data) => {
        setGermanText(data);
      })
      .catch((err) => "error");

    apiRequestBangla(englishText)
      .then((data) => {
        setBanglaText(data);
      })
      .catch((err) => "error");
  }, [englishText]);

  const highlight = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      action: "highlight",
      text: "Last male of his kind",
    });
  };

  const removeHighlight = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "unhighlight" });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.action === "updatePopup") {
        setEnglishText(request.selectedText);
        if (request.selectedText === "Last male of his kind") {
          console.log("got exact match");
          document.getElementById("excat-match").style.display = "block";
          document.getElementById("key-suggestions").style.display = "none";
        } else {
          console.log("does not match");
          setEnglishText(request.selectedText);
          showSuggestions(request.selectedText);
          removeHighlight();
          document.getElementById("key-suggestions").style.display = "block";
          document.getElementById("excat-match").style.display = "none";
        }
        removeHighlight();
        document.getElementById("select-a-word").style.display = "none";
        document.getElementById("selectedText").innerText =
          request.selectedText;
      }
    });
    return () => {};
  }, []);

  const showSuggestions = (sentence) => {
    const suggestions = ["APP_X", "APP_Y", "APP_Z", "APP_KEY_SOMETHING"];

    const chipContainer = document.getElementById("chipContainer");
    chipContainer.innerHTML = "";

    for (let i = 0; i < suggestions.length; i++) {
      let chip = document.createElement("div");
      chip.classList.add("chip");
      chip.textContent = suggestions[i];
      chipContainer.appendChild(chip);

      if (i === 3) {
        chip.addEventListener("click", function () {
          document.getElementById("excat-match").style.display = "block";
          setEnglishText("Last male of his kind");
          highlight();
        });
      } else {
        chip.addEventListener("click", function () {
          document.getElementById("selectedText").innerText = sentence;
          document.getElementById("excat-match").style.display = "block";
          removeHighlight();
        });
      }
    }
  };

  return (
    <div>
      <h2>&lt;blocks/&gt; Language Manager</h2>
      <hr />
      <div id="key-suggestions">
        <h3>Key Suggestions</h3>
        <p id="select-a-word">Select words to see key suggestions.</p>
        <div id="chipContainer" className="chip-container"></div>
      </div>

      <div id="excat-match">
        <p>
          <span style={{ fontWeight: "bold" }}>Exact Matched Key: </span>
          APP_KEY_SOMETHING
        </p>

        <table>
          <tbody>
            <tr>
              <th>English</th>
              <td>
                <textarea
                  id="selectedText"
                  rows={2}
                  cols={20}
                  value={englishText}
                  onChange={(e) => setEnglishText(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>German</th>
              <td>
                <textarea
                  id="definition-text-de"
                  rows={2}
                  cols={20}
                  value={germanText}
                  onChange={(e) => setGermanText(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>Bangla</th>
              <td>
                <textarea
                  id="definition-text-bn"
                  rows={2}
                  cols={20}
                  value={banglaText}
                  onChange={(e) => setBanglaText(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="button-container">
          <button id="suggest-button" onClick={handleSuggest}>
            Suggest
          </button>
          <button id="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(<SidePanel />);
