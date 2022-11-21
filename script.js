const form = document.querySelector(".feedback-form");
const input = document.querySelector(".feedback-input");
const list = document.querySelector("#dynamic-list");

const externalFile = "./projects.json";
fetch(externalFile)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
function appendData(data) {
  const mainContainer = document.querySelector(".cards");
  for (var i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    mainContainer.appendChild(card);

    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = data[i].title;
    card.appendChild(cardTitle);

    const image = document.createElement("img");
    image.setAttribute("src",data[i].imageLink);
    image.setAttribute("alt","project");
    card.appendChild(image)

    const cardDescription = document.createElement("p");
    cardDescription.classList.add("card-desc");
    cardDescription.innerHTML = data[i].description;
    card.appendChild(cardDescription);

    const github = document.createElement("a");
    github.setAttribute("href",data[i].githubLink);
    github.innerHTML = "Github Link>>";
    cardDescription.appendChild(github);
  }
}

window.addEventListener("load", () => onBrowserLoad());

function onBrowserLoad() {
  form.addEventListener("submit", (e) => onSubmit(e));
}

function onSubmit(e) {
  e.preventDefault();

  const feedback = input.value;
  if (!feedback) {
    alert("Please enter a feedback");
    return;
  }

  const feedbackDiv = document.createElement("div");
  feedbackDiv.classList.add("dynamic-feedback");
  list.appendChild(feedbackDiv);

  const feedbackContentDiv = document.createElement("div");
  feedbackContentDiv.classList.add("feedback-content");
  feedbackDiv.appendChild(feedbackContentDiv);

  const feedbackInput = document.createElement("input");
  feedbackInput.classList.add("text");
  feedbackInput.type = "text";
  feedbackInput.value = feedback;
  feedbackInput.setAttribute("readonly", "readonly");
  feedbackContentDiv.appendChild(feedbackInput);

  const feedbackActionsDiv = document.createElement("div");
  feedbackActionsDiv.classList.add("actions");
  feedbackDiv.appendChild(feedbackActionsDiv);

  const feedbackEditButton = document.createElement("button");
  feedbackEditButton.classList.add("Edit");
  feedbackEditButton.innerHTML = "Edit";

  feedbackActionsDiv.appendChild(feedbackEditButton);

  feedbackEditButton.addEventListener("click", () => onEdit());
  input.value = "";

  function onEdit() {
    if (feedbackEditButton.innerText.toLowerCase() == "edit") {
      feedbackInput.removeAttribute("readonly");
      feedbackInput.focus();
      feedbackEditButton.innerText = "Save";
      feedbackInput.style.textDecoration = "none";
    } else {
      feedbackInput.setAttribute("readonly", "readonly");
      feedbackEditButton.innerText = "Edit";
    }
  }
}
