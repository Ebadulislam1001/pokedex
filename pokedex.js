const pokemonCount = 151; // 151 means all gen 1 pokemon
const pokedex = [];

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
function statBarColor(stat) {
  if (stat < 30) return "#F34444";
  else if (stat < 60) return "#FF7F0F";
  else if (stat < 90) return "#FFDD57";
  else if (stat < 120) return "#A0E515";
  else if (stat < 150) return "#23CD5E";
  else return "#00C2B8";
}
function updateInfo() {
  const pokemonList = document.getElementById("pokemon-list");
  const svgPath = document.getElementById("svg-path");

  if (pokemonList.style.zIndex === "10") {
    pokemonList.style.zIndex = "-10";
    svgPath.setAttribute("d", "M 4 4 L 20 4 M 4 12 L 20 12 M 4 20 L 20 20");
  }

  const pokemon = pokedex[this.id];
  // updating the pokemon image
  const pokemonImageElement = document.getElementById("pokemon-image");
  pokemonImageElement.src = pokemon.image;
  // updating the pokemon name
  const pokemonNameElement = document.getElementById("pokemon-name");
  pokemonNameElement.innerText = pokemon.name.toUpperCase();
  // updating the pokemon types
  const typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }
  for (let t = 0; t < pokemon.types.length; t++) {
    const typeName = pokemon.types[t].type.name;
    const typeElement = document.createElement("span");
    typeElement.innerText = typeName.toUpperCase();
    typeElement.classList.add("type-box");
    typeElement.classList.add(typeName);
    typesDiv.append(typeElement);
  }
  // updating the pokemon abilities
  const abilitiesDiv = document.getElementById("pokemon-abilities");
  while (abilitiesDiv.firstChild) {
    abilitiesDiv.firstChild.remove();
  }
  const abilitiesHead = document.createElement("h2");
  abilitiesHead.innerText = "Abilities";
  abilitiesHead.style.fontSize = "1.2em";
  abilitiesHead.style.fontWeight = "bold";
  abilitiesDiv.append(abilitiesHead);
  for (let ab = 0; ab < pokemon.abilities.length; ab++) {
    const abilityName = pokemon.abilities[ab].ability.name.toUpperCase().replace("-", " ");
    const abilityElement = document.createElement("p");
    abilityElement.innerText = "- " + abilityName; //.toUpperCase();
    abilityElement.classList.add("ability-name");
    abilitiesDiv.append(abilityElement);
  }
  // updating the pokemon base stats
  let BST = 0;
  for (let s = 0; s < pokemon.stats.length; s++) {
    BST += pokemon.stats[s].base_stat;
  }
  document.getElementById("HP-stat").innerText = pokemon.stats[0].base_stat;
  document.getElementById("HP-bar").style.width = 2 * pokemon.stats[0].base_stat + "px";
  document.getElementById("HP-bar").style.backgroundColor = statBarColor(pokemon.stats[0].base_stat);
  document.getElementById("PA-stat").innerText = pokemon.stats[1].base_stat;
  document.getElementById("PA-bar").style.width = 2 * pokemon.stats[1].base_stat + "px";
  document.getElementById("PA-bar").style.backgroundColor = statBarColor(pokemon.stats[1].base_stat);
  document.getElementById("PD-stat").innerText = pokemon.stats[2].base_stat;
  document.getElementById("PD-bar").style.width = 2 * pokemon.stats[2].base_stat + "px";
  document.getElementById("PD-bar").style.backgroundColor = statBarColor(pokemon.stats[2].base_stat);
  document.getElementById("SA-stat").innerText = pokemon.stats[3].base_stat;
  document.getElementById("SA-bar").style.width = 2 * pokemon.stats[3].base_stat + "px";
  document.getElementById("SA-bar").style.backgroundColor = statBarColor(pokemon.stats[3].base_stat);
  document.getElementById("SD-stat").innerText = pokemon.stats[4].base_stat;
  document.getElementById("SD-bar").style.width = 2 * pokemon.stats[4].base_stat + "px";
  document.getElementById("SD-bar").style.backgroundColor = statBarColor(pokemon.stats[4].base_stat);
  document.getElementById("SP-stat").innerText = pokemon.stats[5].base_stat;
  document.getElementById("SP-bar").style.width = 2 * pokemon.stats[5].base_stat + "px";
  document.getElementById("SP-bar").style.backgroundColor = statBarColor(pokemon.stats[5].base_stat);
  document.getElementById("BST-stat").innerText = BST;
}

// Load pokemon data
window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.classList.add("pokemon-name");
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
