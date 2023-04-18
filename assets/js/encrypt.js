const texto = document.getElementById("text_encrypt");

const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton");

const callbackNoResult = document.getElementById("no-result");

const callbackResult = document.getElementById("result");
const copyButton = document.getElementById("copyButton");

const triggerPopUp = document.getElementById("trigger-popup");
const popUp = document.getElementsByClassName("result");

const triggerNotice = document.getElementById("close-notice");
const messageNotice = document.getElementById("alert");

encryptButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!texto.value) {
    callbackNoResult.classList.remove("d-none");
    callbackResult.classList.add("d-none");
    copyButton.classList.add("d-none");
    alertNotice("warning", "Agrege un texto");
  } else {

    if (!validateText(texto.value)) {
      alertNotice("error", "Texto no valido");
      return;
    }

    callbackNoResult.classList.add("d-none");
    callbackResult.classList.remove("d-none");
    copyButton.classList.remove("d-none");

    popUp[0].classList.remove("close");

    if (popUp[0].classList.contains("close")) {
      triggerPopUp.innerText = "Ver resultados";
    } else {
      triggerPopUp.innerText = "X";
    }

    const texToResult = encryptText(texto.value);

    callbackResult.innerText = texToResult;

  }
});

decryptButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!texto.value) {
    callbackNoResult.classList.remove("d-none");
    callbackResult.classList.add("d-none");
    copyButton.classList.add("d-none");
    alertNotice("warning", "Agrege un texto");
  } else {

    if (!validateText(texto.value)) {
        alertNotice("error", "Texto no valido");
        return;
      }

    callbackNoResult.classList.add("d-none");
    callbackResult.classList.remove("d-none");
    copyButton.classList.remove("d-none");
    popUp[0].classList.remove("close");

    if (popUp[0].classList.contains("close")) {
      triggerPopUp.innerText = "Ver resultados";
    } else {
      triggerPopUp.innerText = "X";
    }

    const texToResult = decryptText(texto.value);

    callbackResult.innerText = texToResult;
  }
});

copyButton.addEventListener("click", (e) => {
  let copyText = callbackResult.innerText;

  copyTextToClipboard(copyText);
});

function validateText(text) {
  const regex = /[A-ZñÑáéíóúÁÉÍÓÚ]/g;

  return !text.match(regex) ? true : false;
}

function encryptText(text) {
  const pattern = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
  };

  let textToEncrypt = text.split("");
  let encryptedText = "";

  textToEncrypt.forEach((element) => {
    if (pattern[element]) {
      encryptedText += pattern[element];
    } else {
      encryptedText += element;
    }
  });

  return encryptedText;
}

function decryptText(text) {
  const pattern = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
  };

  let decryptedText = "";

  decryptedText = text.replace(/ai|enter|imes|ober|ufat/gi, function (matched) {
    return pattern[matched];
  });

  return decryptedText;
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      alertNotice("success", "Copiado al portapapeles");
    },
    function (err) {
      alertNotice("error", "Error al copiar en portapapeles");
    }
  );
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    alertNotice("success", "Copiado al portapapeles");
  } catch (e) {
    alertNotice("error", "Error al copiar en portapapeles");
  }

  document.body.removeChild(textArea);
}

triggerPopUp.addEventListener("click", () => {
    popUp[0].classList.toggle("close");
  
    if (popUp[0].classList.contains("close")) {
      triggerPopUp.innerText = "Ver resultados";
    } else {
      triggerPopUp.innerText = "X";
    }
  });
  
  triggerNotice.addEventListener("click", () => {
    triggerNotice.parentNode.className = "";
    triggerNotice.parentNode.classList.add("notice");
    triggerNotice.parentNode.classList.add("notice-hide");
  });
  
  function alertNotice(type, msg) {
      if (msg) {
        triggerNotice.parentNode.classList.add(type);
        messageNotice.innerText = msg;
        triggerNotice.parentNode.classList.remove("notice-hide");
      }
    
      setTimeout(() => {
        triggerNotice.parentNode.className = "";
        triggerNotice.parentNode.classList.add("notice");
        triggerNotice.parentNode.classList.add("notice-hide");
      }, 3000);
    }
    