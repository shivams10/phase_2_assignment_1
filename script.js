const form = document.querySelector(".feedback-form");
const input = document.querySelector(".feedback-input");
const list = document.querySelector("#dynamic-list");

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
