let langOption = document.querySelectorAll(".select_languages");
let fromText = document.querySelector(".fromText");
let transText = document.querySelector(".toTranslate");
let fromVoice = document.getElementById("fromSpeech");
let toVoice = document.getElementById("toSpeech");
let cpyBtn =  document.querySelector(".bx-copy");
let countValue = document.querySelector(".code_length");
let exchangeLang = document.querySelector(".bx-transfer")

// making the option  value interact with the API
langOption.forEach((get, con) => {
  for (let countryCode in language) {
    let selected;
    if (con == 0 && countryCode == "en-GB") {
      selected = "selected";
    } else if (con == 1 && countryCode == "hi-IN") {
      selected = "selected";  
    }
    let option = `<option value="${countryCode}"${selected}>${language[countryCode]}</option>`;
    get.insertAdjacentHTML("beforeend", option);
  }
});

// making the tranlastion translateed live
fromText.addEventListener("input", function () {
  let content = fromText.value;
  fromContent = langOption[0].value;
  transContent = langOption[1].value;

  let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

  fetch(transLINK)
    .then((translate) => translate.json())
    .then((data) => {
      transText.value = data.responseData.translatedText;
    });
});

fromVoice.addEventListener("click", function () {
  let fromTalk;
  fromTalk = new SpeechSynthesisUtterance(fromText.value);
  fromTalk.lang = langOption[0].value;
  console.log('Attempting to speak:', fromTalk);
  window.speechSynthesis.speak(fromTalk);
  console.log("first icon clicked");
});

toVoice.addEventListener("click", function () {
  let toTalk;
  toTalk = new SpeechSynthesisUtterance(transText.value);
  toTalk.lang = langOption[1].value;
  console.log('Attempting to speak:', toTalk);
  window.speechSynthesis.speak(toTalk);
  console.log("second icon clicked");
});

cpyBtn.addEventListener('click' , function() {
  navigator.clipboard.writeText(transText.value);
})

fromText.addEventListener('keyup' , function() {
  countValue.innerHTML = `${fromText.value.length}/5000`;
})

exchangeLang.addEventListener('click' , function(){
  let tempText = fromText.value;
  fromText.value = transText.value;
  transText.value = tempText;
  
  let tempOpt = langOption[0].value;
  langOption[0].value = langOption[1].value;
  langOption[1].value = tempOpt;
})
