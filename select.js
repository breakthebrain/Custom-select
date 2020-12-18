let wrapper = document.getElementById("wrapper"),
  selectId = document.getElementById("selectId"),
  arrow = "&#9660;";

function getContext() {
  selectId.style.display = "none";

  let newSelectWrap = document.createElement("div"),
    newSelectList = document.createElement("ul"),
    placeholder = document.createElement("div");

  newSelectWrap.classList.add("custom-select");
  newSelectList.classList.add("custom-select-list");

  newSelectWrap.append(newSelectList);
  wrapper.append(newSelectWrap);

  placeholder.classList.add("placeholder");
  placeholder.id = "placeholder";
  placeholder.innerHTML = `Select items <span class='arrow'>${arrow}</span>`;
  newSelectWrap.prepend(placeholder);

  for (let i = 0; i < selectId.length; i++) {
    let newSelectItems = document.createElement("li");
    newSelectItems.classList.add("custom-select-item");
    newSelectItems.dataset.value = selectId.options[i].value;
    newSelectItems.innerText = selectId.options[i].text;

    newSelectList.append(newSelectItems);
  }
  chooseItem(newSelectWrap, placeholder);
}

function chooseItem(newSelectWrap, placeholder) {
  newSelectWrap.addEventListener("click", function (e) {
    let items = document.querySelectorAll(".custom-select-item");
    let target = e.target;
    Array.from(items).forEach((item) => {
      if (target.classList.contains("custom-select-item")) {
        item.classList.remove("selected");
      }
    });
    if (target.classList.contains("custom-select-item")) {
      target.classList.add("selected");
      placeholder.innerHTML =
        target.innerText + `<span class='arrow'>${arrow}</span>`;
      newSelectWrap.classList.remove("show");

      selectId.value = target.dataset.value;
    }
  });
}

function toggle() {
  let toggleList = document.getElementById("placeholder");
  toggleList.addEventListener("click", function (e) {
    let parent = this.parentElement;
    if (parent.classList.contains("show")) {
      parent.classList.remove("show");
    } else {
      parent.classList.add("show");
    }
  });
}

getContext();
toggle();
