const getCurrentPageInfo = () => {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, (tabs) => {
    let tab = tabs[0];
    let url = tab.url;
    let title = tab.title;
    document.getElementById('page-title').innerText = title;
    document.getElementById('page-url').value = url;
  });
}

const copyUrlToClipboard = async () => {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return
  }
  let url = document.getElementById('page-url').value;

  try {
    await navigator.clipboard.writeText(url)
  } catch (err) {
    console.error('Failed to copy!', err)
  }
}

document.getElementById("url-copy-button").addEventListener("click", copyUrlToClipboard);

const addPotato = () => {
  const form = document.getElementById("email-form");
  const numPotatoes = form["potato-email"].length;

  const newSection = document.createElement("DIV");
  newSection.className = "main-section__group";

  const newLabel = document.createElement("DIV");
  newLabel.className = "main-section__label";
  newLabel.innerText = "Potato " + parseInt(numPotatoes + 1) + ": ";

  const newInput = document.createElement("input");
  newInput.setAttribute("type", "email");
  newInput.setAttribute("name", "potato-email");
  newInput.className = "main-section__input";

  newSection.append(newLabel);
  newSection.append(newInput);
  form.append(newSection);
}

document.getElementById("add-potato-button").addEventListener("click", addPotato);

const revealDateSection = () => {
  const dateSection = document.getElementById("date-selection");
  dateSection.className = dateSection.className + " date-section--revealed";

  document.getElementById("potato-later-button").removeEventListener("click", revealDateSection);
}

document.getElementById("potato-later-button").addEventListener("click", revealDateSection);

getCurrentPageInfo();
