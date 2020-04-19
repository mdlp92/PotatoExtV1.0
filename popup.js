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

  const addPotato = () => {
    const form = document.getElementById("user-form");
    // const numPotatoes = "potato-email1";

  const newSection = document.createElement("DIV");
  newSection.className = "form-group";

  const newLabel = document.createElement("DIV");
  newLabel.className = "potato-email1";
  newLabel.innerText = "Potato " + parseInt( + 1) + " ";

  const newInput = document.createElement("input"); // also place need to fix/adjust to get names with add potato button
  newInput.setAttribute("type", "email");
  newInput.setAttribute("name", "potato-email");
  newInput.className = "main-section_input";

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

// Using fetch POST to send data to EC2 instance via a public dns URL

const awsapi = 'ec2-52-53-127-73.us-west-1.compute.amazonaws.com:3000';

// creating listener for potatonow --> submit info to database
const handleClickPotatoNow = function() {
  // The data we are going to send in our request
  // The parameters we are gonna pass to the fetch function
  let fetchData = {
    method: 'POST',
    body: new FormData(document.getElementById('user-form')),
    headers: new Headers()
  }

  fetch(awsapi, fetchData).then(() => {
    // do something
  });
}

// creating a listener for Potato now button
document.getElementById("potato-now-button").addEventListener("click", handleClickPotatoNow);

// creating listener for go button --> submit info to database
const handleClickGo = function() {
  // The data we are going to send in our request
  // The parameters we are gonna pass to the fetch function
  let fetchData = {
    method: 'POST',
    body: new FormData(document.getElementById('user-form')),
    headers: new Headers()
  }
  fetch(awsapi, fetchData).then(() => {
    // do something
  });
}

// creating a listener for Potato now button
document.getElementById("go-button").addEventListener("click", handleClickGo);
