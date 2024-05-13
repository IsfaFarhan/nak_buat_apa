function save2nd() {
  if (document.getElementById("textInput").value !== "") {
    saveText();
  }
}

function saveText() {
  let inputText = document.getElementById("textInput").value;
  let Delete = "Siap";
  if (typeof Storage !== "undefined") {
    let container = document.getElementById("container");
    let newContainer = document.createElement("div");
    let newParagraph = document.createElement("p");
    let removeButton = document.createElement("button");

    let i = container.children.length + 1;
    newContainer.id = "container" + i;
    newParagraph.id = "newParagraph" + i;
    removeButton.id = "removeButton" + i;
    newContainer.classList.add("childContainer");

    newParagraph.textContent = inputText;
    removeButton.textContent = Delete;

    removeButton.addEventListener("click", function () {
      container.removeChild(newContainer);
      for (let j = 0; j < localStorage.length; j++) {
        let key = localStorage.key(j);
        if (key.startsWith("saveText" + i) || key.startsWith("saveData" + i)) {
          localStorage.removeItem(key);
          j--;
        }
      }
      let children = newContainer.children;
      for (let j = 0; j < children.length; j++) {
        let childId = children[j].id;
        if (
          childId &&
          (childId.startsWith("newParagraph") ||
            childId.startsWith("removeButton"))
        ) {
          let childIndex = childId.substring(childId.length - 1);
          localStorage.removeItem("saveText" + childIndex);
        }
      }
    });
    newContainer.appendChild(newParagraph);
    newContainer.appendChild(removeButton);
    container.appendChild(newContainer);

    let saveData = {
      inputText: inputText,
      html: newContainer.outerHTML,
      className: "childContainer",
    };
    localStorage.setItem("saveText" + i, inputText);
    localStorage.setItem("saveData" + i, JSON.stringify(saveData));
    document.getElementById("textInput").value = "";
  } else {
    alert("Local Storage is not supported in this browser.");
  }
}

window.onload = function () {
  retrieve();
};

function retrieve() {
  if (typeof Storage !== "undefined") {
    let container = document.getElementById("container");

    for (let i = 1; i <= localStorage.length; i++) {
      let savedData = localStorage.getItem("saveData" + i);
      if (savedData !== null) {
        let data = JSON.parse(savedData);
        let newContainer = document.createElement("div");
        newContainer.id = "container" + i;
        newContainer.innerHTML = data.html;

        let removeButton = newContainer.querySelector("button");
        removeButton.addEventListener("click", function () {
          container.removeChild(newContainer);
          localStorage.removeItem("saveText" + i);
          localStorage.removeItem("saveData" + i);
        });
        container.appendChild(newContainer);
      }
    }
  } else {
    alert("Local Storage is not support in this browser.");
  }
}

function remove() {
  let container = document.getElementById("container");
  Array.from(container.children).forEach(function (child) {
    if (child.id) {
      container.removeChild(child);
    }
  });

  localStorage.clear();
}

function hideElement() {
  let removeArea = document.getElementById("subhead2");
  if (removeArea.style.display === "none") {
    removeArea.style.display = "block";
  } else if (removeArea.style.display === "block") {
    removeArea.style.display = "none";
  }
}
