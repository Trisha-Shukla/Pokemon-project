let container = document.querySelector(".pok-container");
let search = document.querySelector("#input-search");
let select = document.querySelector("#select");
let promise = [];

async function Displaypokemon(searchQuery = "") {
  let Selecttype = [];

  for (let i = 1; i <= 100; i++) {
    let pok = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let results = await pok.json();
    promise.push(results);

    results.types.map((type) => {
      Selecttype.push(type.type.name);
    });
  }
  let myset = new Set(Selecttype);
  console.log(myset);
  myset.forEach((value) => {
    document.getElementById(
      "select"
    ).innerHTML += `<option value="${value}">${value}</option>`;
  });

  aadingdetails(promise);
}
function aadingdetails(promises) {
  let poktype = "";
  container.innerHTML = "";
  promises.forEach((promise) => {
    if (promise.types.length > 1) {
      let type1 = promise.types[0].type.name;
      let type2 = promise.types[1].type.name;
      poktype = `${type1}/${type2}`;
    } else {
      poktype = promise.types[0].type.name;
    }
    container.innerHTML += ` <div class="pok-cards">
                
                <div class="image"><img id=${promise.id} src="${promise.sprites.other["showdown"].front_default}" alt="">
    
                </div>
                <h3 class="name">${promise.name}</h3>
                <h3 >Type: <span class="type">${poktype}</span></h3>
            </div>`;
  });
}

search.addEventListener("keyup", () => {
  let allCards = document.querySelectorAll(".pok-cards");
  allCards.forEach((card) => {
    let cardName = card.querySelector(".name").textContent;
    console.log(cardName);

    if (cardName.includes(search.value)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});
select.addEventListener("change", () => {
  let allCards = document.querySelectorAll(".pok-cards");
  console.log(select.value);
  allCards.forEach((card) => {
    let cardType = card.querySelector(".type").textContent;

    if (cardType.includes(select.value) || select.value === "filter-by-type") {
      card.style.display = "flex";
      console.log(card);
    } else {
      card.style.display = "none";
    }
  });
});

Displaypokemon();
