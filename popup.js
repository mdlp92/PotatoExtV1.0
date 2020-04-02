
// processing the current tab/URL and putting it into the extension popup
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

// The form for emails & full names - doesn't included full name for the "add potato" button
const addPotato = () => {
  const form = document.getElementById("email-form");
  const numPotatoes = form["potato-email"].length; //this is what we need to fix/adjust so we can add name & email when they say "add potatoes"

  const newSection = document.createElement("DIV");
  newSection.className = "main-section__group";

  const newLabel = document.createElement("DIV");
  newLabel.className = "main-section__label";
  newLabel.innerText = "Potato " + parseInt(numPotatoes + 1) + ": ";

  const newInput = document.createElement("input");// also place need to fix/adjust to get names with add potato button
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

// Using fetch POST to send data to mysql environment

const urlsql = 'extensiondb-1.czzb64wzgtnf.us-west-1.rds.amazonaws.com';
// The data we are going to send in our request
// The parameters we are gonna pass to the fetch function
let fetchData = {
    method: 'POST',
    body: new FormData(document.getElementById('email-form')),
    headers: new Headers()
}
fetch(urlsql, fetchData)
.then(function() {
    // Handle response you get from the server
});

// PotatoNow function will run fetch post when prompted
const PotatoNow = = () => {
  fetch(urlsql, fetchData)
  .then(function() {
  })};

// creating a listener for Potato now button
document.getElementById("potato-now-button").addEventListener("click", PotatoNow)
