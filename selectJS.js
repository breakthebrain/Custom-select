class ItkSelect {
  constructor({ wrapper, select, arrow="&#9660;", finder=false}) {
    this.wrapper = document.querySelector(wrapper);
    this.select = document.querySelector(select);
    this.arrow = arrow;
    this.finder = finder;
  }
  init() {
    this.buildCustomUI();
  }
  buildCustomUI() {
    //Create new select wrapper
    // this.select.style.display = 'none';
    const newSelectWrap = document.createElement("div");
    newSelectWrap.classList.add("custom-select");
    this.wrapper.appendChild(newSelectWrap);

    //Create new select placeholder
    const placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");
    placeholder.id = "placeholder";
    placeholder.innerHTML = `Select items <span class='arrow'>${this.arrow}</span>`;
    newSelectWrap.appendChild(placeholder);

    const arr = [];

    //Create list
    const newSelectList = document.createElement("ul");
    newSelectList.classList.add("custom-select-list");
    newSelectWrap.appendChild(newSelectList);

    //Create li
    for (let i = 0; i < this.select.length; i++) {
      const newSelectItems = document.createElement("li");
      newSelectItems.classList.add("custom-select-item");
      newSelectItems.dataset.value = selectId.options[i].value;
      newSelectItems.innerText = selectId.options[i].text;

      newSelectList.append(newSelectItems);

      arr.push(selectId.options[i].text);
    }

    this.chooseItem(newSelectWrap, placeholder, this)
    this.listToggle();
    this.updateResult(newSelectList, arr)
  }

  updateResult(list, arr) {
    const searchInput = document.createElement("input");
    searchInput.classList.add("placeholder");
    searchInput.id = "placeholder";
    searchInput.placeholder = 'Type word for find'
    list.prepend(searchInput);

    searchInput.addEventListener('input', function() {
      list.innerHTML = '';
      let searchValue = this.value;
      arr.map(algo =>{
        searchValue.split(" ").map(word =>{
          if(algo.toLowerCase().indexOf(word.toLowerCase()) != -1){
            list.innerHTML += `<li class="custom-select-item">${algo}</li>`;
          }
        })
      })
    })
  }


  chooseItem(newSelectWrap, placeholder, context) {
    //Choose custom select option
    newSelectWrap.addEventListener("click", function (e) {
      const items = document.querySelectorAll(".custom-select-item");
      const target = e.target;
      //Remove class 
      Array.from(items).forEach((item) => {
        if (target.classList.contains("custom-select-item")) {
          item.classList.remove("selected");
        }
      });
      //Add class
      if (target.classList.contains("custom-select-item")) {
        target.classList.add("selected");
        placeholder.innerHTML =
          target.innerText + `<span class='arrow'>${context.arrow}</span>`;
        newSelectWrap.classList.remove("show");
        context.select.value = target.dataset.value;
      }
    });
  }

  listToggle() {
    //Toggle custom list
    const toggleList = document.getElementById("placeholder");
    toggleList.addEventListener("click", function (e) {
      const parent = this.parentElement;
      if (parent.classList.contains("show")) {
        parent.classList.remove("show");
      } else {
        parent.classList.add("show");
      }
    });
  }
}


