const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const resultDiv = document.getElementById("result-div");

function onSearch() {
  let input = searchInput.value.trim().toLowerCase();
  input = input.slice(0, input.length - 1);
  if (input.length === 0) return;
  fetch("./travel_recommendation_api.json")
    .then(reponse => reponse.json())
    .then(data => {
      let keyFound;
      for (const key in data) {
        if (key.includes(input)) {
          keyFound = key;
        }
      }
      if (keyFound) {
        resultDiv.innerHTML = "";
        for (const element of data[keyFound]) {
          if (element.hasOwnProperty("cities")) {
            element.cities.forEach(item => {
              createCard(item);
            });
          } else {
            createCard(element);
          }
        }
      };
    });
}
searchBtn.addEventListener("click", onSearch);


function createCard(obj) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add('card');
  cardDiv.innerHTML = `<img class="card-img" src=${obj.imageUrl} alt="" />
          <div class="card-content">
            <h3 class="name">${obj.name}</h3>
            <p class="description">${obj.description}</p>
            <button>Visit</button>
          </div>`;
  resultDiv.appendChild(cardDiv);
}

function onClear() {
  resultDiv.innerHTML = "";
  searchInput.value = "";
}
clearBtn.addEventListener("click", onClear);