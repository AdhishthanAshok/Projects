let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "cursive",
  "Courier New",
  "Georgia",
];

const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }
  fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};
const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();

const videoInput = document.getElementById("videoInput");

const insertVideo = () => {
  videoInput.click();
};

videoInput.addEventListener("change", () => {
  const file = videoInput.files[0];
  if (file) {
    const videoURL = URL.createObjectURL(file);

    const videoElement = document.querySelector("#video-section video");
    videoElement.src = videoURL;
    videoElement.controls = true;

    const embedCode = `<div style="position: relative; width: 150px; height: 100px; overflow: hidden; border: 1px solid #ccc; z-index: 1;"><video controls width="100%" height="100%" src="${videoURL}"></video></div>`;
    modifyText("insertHTML", false, embedCode);

    videoInput.value = "";
  }
});

let isCodeFormatting = false;

const insertCode = () => {
  const selectedText = window.getSelection().toString();

  if (selectedText) {
    const codeBlock = `\`\`\`\n${selectedText}\n\`\`\``;
    modifyText("insertHTML", false, codeBlock);
  } else {
    const emptyCodeBlock = "```\n\n```";
    modifyText("insertHTML", false, emptyCodeBlock);
  }
};

document.getElementById("insertCode").addEventListener("click", insertCode);
document
  .querySelector(".file-upload-container")
  .addEventListener("click", insertVideo);
function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}

document.getElementById("submitButton").addEventListener("click", function () {
  const mainQuestion = document.getElementById("main-question");
  const videoSection = document.getElementById("video-section");
  const description = document.getElementById("description");

  const videoInput = document.getElementById("videoInput");

  const hasVideo = videoInput.files.length > 0;

  let successMessage = "No question to submit.";

  if (mainQuestion.innerText.trim() !== "" || hasVideo) {
    successMessage = hasVideo
      ? "Your question along with the video is being submitted."
      : "Your question is being submitted.";
  }

  document.getElementById("successMessage").innerText = successMessage;
  document.getElementById("successPopup").style.display = "block";

  mainQuestion.innerHTML =
    '<h3 contenteditable="false">Question :</h3><p contenteditable="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>';
  videoSection.innerHTML =
    '<h3 contenteditable="false">Video :</h3><video controls width="200" height="150" src="" style="display: block"></video>';
  description.innerHTML =
    '<h3 contenteditable="false">Description :</h3><p contenteditable="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>';

  videoInput.value = "";
});
