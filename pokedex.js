const pokemonCount = 386;
let pokedex = {};

function index(num) {
  if (num < 10) return "00" + num + "_";
  if (num < 100) return "0" + num + "_";
  return "" + num + "_";
}
function processed(str) {
  str = str.replaceAll("\n", " ");
  str = str.replaceAll("\f", " ");
  return str;
}
function expand() {
  let z = document.getElementById("pokemon-list").style.zIndex;
  if (z == "-10") {
    document.getElementById("pokemon-list").style.zIndex = "+10";
    document.getElementById("svg-path").setAttribute("d", "M 4 4 L 20 20 M 4 20 L 20 4"); // set to cross
  } else {
    document.getElementById("pokemon-list").style.zIndex = "-10";
    document.getElementById("svg-path").setAttribute("d", "M 4 4 L 20 4 M 4 12 L 20 12 M 4 20 L 20 20"); // set to hamburger
  }
}
function updateInfo() {
  let z = document.getElementById("pokemon-list").style.zIndex;
  if (z == "10") {
    document.getElementById("pokemon-list").style.zIndex = "-10";
    document.getElementById("svg-path").setAttribute("d", "M 4 4 L 20 4 M 4 12 L 20 12 M 4 20 L 20 20"); // set to hamburger
  }
  document.getElementById("pokemon-image").src = pokedex[this.id]["image"];
  document.getElementById("pokemon-name").innerText = pokedex[this.id]["name"].toUpperCase();
  document.getElementById("pokemon-desc").innerText = pokedex[this.id]["desc"].toUpperCase();
  let typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
    // console.log("type removed");
  }
  let types = pokedex[this.id]["types"];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]);
    document.getElementById("pokemon-types").append(type);
    // console.log("type added");
  }
}

/////////////////////////////////////////////
////    Computing done at window load    ////
/////////////////////////////////////////////
window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.classList.add("pokemon-name");
    pokemon.innerText = index(i) + pokedex[i]["name"].toUpperCase();
    pokemon.addEventListener("click", updateInfo);
    document.getElementById("pokemon-list").append(pokemon);
  }
  // console.log(pokedex);
};
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();
  // console.log(pokemon);

  // let pokemonIcon = pokemon["sprites"]["front_default"];
  let pokemonName = pokemon["name"];
  let pokemonTypes = pokemon["types"];
  let pokemonImage = pokemon["sprites"]["front_default"];
  // let pokemonShiny = pokemon["sprites"]["front_shiny"];
  // let pokemonImage = "https://img.pokemondb.net/artwork/large/" + pokemonName + ".jpg";

  res = await fetch(pokemon["species"]["url"]);
  let flavorText = await res.json();
  // console.log(flavorText);
  let Desc1 = flavorText["flavor_text_entries"][9]["flavor_text"];
  let Desc2 = flavorText["flavor_text_entries"][10]["flavor_text"];
  let pokemonDesc = processed(Desc1) + " " + processed(Desc2);
  // console.log(pokemonDesc);

  pokedex[num] = { name: pokemonName, types: pokemonTypes, desc: pokemonDesc, image: pokemonImage };
}
