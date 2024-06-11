const pokemonCount = 151; // 151 means all gen 1 pokemon
const pokedex = [];
let shinySprite = false;

// setup functions
window.onload = async function () {
  await getPokemon(1);
  updateInfo(1);
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString().padStart(3, "0") + "_" + pokedex[i]["name"].toUpperCase();
    pokemon.addEventListener("click", updateInfo);
    document.getElementById("pokemon-list").append(pokemon);
  }
};
async function getPokemon(num) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();
  // creating and populating the pokemon object in the pokedex
  pokedex[num] = {
    image: pokemon["sprites"]["front_default"],
    name: pokemon["name"].toUpperCase(),
    types: pokemon["types"],
    abilities: pokemon["abilities"],
    stats: pokemon["stats"],
  };
}

// loop functions
function toggleMenu() {
  const pokemonList = document.getElementById("pokemon-list");
  const svgPath = document.getElementById("svg-path");

  if (pokemonList.style.zIndex === "-10") {
    pokemonList.style.zIndex = "10";
    svgPath.setAttribute("d", "M 4 4 L 20 20 M 4 20 L 20 4");
  } else {
    pokemonList.style.zIndex = "-10";
    svgPath.setAttribute("d", "M 4 4 L 20 4 M 4 12 L 20 12 M 4 20 L 20 20");
  }
}
function toggleShiny() {
  const pokemonImage = document.getElementById("pokemon-image");

  if (shinySprite) {
    pokemonImage.src = pokemonImage.src.replace("pokemon/shiny", "pokemon");
    shinySprite = false;
  } else {
    pokemonImage.src = pokemonImage.src.replace("pokemon", "pokemon/shiny");
    shinySprite = true;
  }
}
function updateInfo(num) {
  const pokemonList = document.getElementById("pokemon-list");
  const svgPath = document.getElementById("svg-path");

  if (pokemonList.style.zIndex === "10") {
    pokemonList.style.zIndex = "-10";
    svgPath.setAttribute("d", "M 4 4 L 20 4 M 4 12 L 20 12 M 4 20 L 20 20");
  }

  let pokemon;
  if (num === 1) {
    pokemon = pokedex[num];
  } else {
    console.log(this.id);
    pokemon = pokedex[this.id];
  }
  if (pokemon === undefined) {
    console.log("Pokemon not found");
    return;
  }

  // updating the pokemon image
  document.getElementById("pokemon-image").src = pokemon.image;
  shinySprite = false;

  // updating the pokemon name
  document.getElementById("pokemon-name").innerText = pokemon.name.toUpperCase();

  // updating the pokemon types
  const typesDiv = emptyElement(document.getElementById("pokemon-types"));
  for (let tp = 0; tp < pokemon.types.length; tp++) {
    const typeName = pokemon.types[tp].type.name;
    const typeElement = document.createElement("span");
    typeElement.innerText = typeName.toUpperCase();
    typeElement.classList.add("type-box", typeName);
    typesDiv.append(typeElement);
  }
  // updating the pokemon abilities
  const abilitiesDiv = emptyElement(document.getElementById("pokemon-abilities"));

  const abilitiesHead = document.createElement("h2");
  abilitiesHead.innerText = "Abilities";
  abilitiesDiv.append(abilitiesHead);
  for (let ab = 0; ab < pokemon.abilities.length; ab++) {
    const abilityName = pokemon.abilities[ab].ability.name.toUpperCase().replace("-", " ");
    const abilityElement = document.createElement("p");
    abilityElement.innerText = "- " + abilityName; //.toUpperCase();
    abilitiesDiv.append(abilityElement);
  }
  // updating the pokemon base stats
  let BST = 0;
  for (let st = 0; st < pokemon.stats.length; st++) {
    BST += pokemon.stats[st].base_stat;
    document.getElementById("stat-" + st).innerText = pokemon.stats[st].base_stat;
    document.getElementById("bar-" + st).style.width = 1.2 * pokemon.stats[st].base_stat + "px";
    document.getElementById("bar-" + st).style.backgroundColor = statBarColor(pokemon.stats[st].base_stat);
  }
  document.getElementById("BST").innerText = BST;
}
function emptyElement(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
  return element;
}
function statBarColor(stat) {
  if (stat < 30) return "#F34444";
  else if (stat < 60) return "#FF7F0F";
  else if (stat < 90) return "#FFDD57";
  else if (stat < 120) return "#A0E515";
  else if (stat < 150) return "#23CD5E";
  else return "#00C2B8";
}
