const pokemonCount = 386;
let pokedex = {};

function paddedIndex(number) {
  return number.toString().padStart(3, '0') + '_';
}
function processed(str) {
  str = str.replaceAll("\n", " ");
  str = str.replaceAll("\f", " ");
  return str;
}
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

function updateInfo() {
  const pokemonList = document.getElementById("pokemon-list");
  const svgPath = document.getElementById("svg-path");

  if (pokemonList.style.zIndex === "10") {
    pokemonList.style.zIndex = "-10";
    svgPath.setAttribute("d", "M 4 4 L 20 4 M 4 12 L 20 12 M 4 20 L 20 20");
  }

  const pokemon = pokedex[this.id];
  const pokemonImageElement = document.getElementById("pokemon-image");
  const pokemonNameElement = document.getElementById("pokemon-name");
  const pokemonDescElement = document.getElementById("pokemon-desc");

  pokemonImageElement.src = pokemon.image;
  pokemonNameElement.innerText = pokemon.name.toUpperCase();
  pokemonDescElement.innerText = pokemon.desc.toUpperCase();

  const typesDiv = document.getElementById("pokemon-types");

  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }

  for (const type of pokemon.types) {
    const typeElement = document.createElement("span");
    typeElement.innerText = type.type.name.toUpperCase();
    typeElement.classList.add("type-box");
    typeElement.classList.add(type.type.name);
    typesDiv.append(typeElement);
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
    pokemon.innerText = paddedIndex(i) + pokedex[i]["name"].toUpperCase();
    pokemon.addEventListener("click", updateInfo);
    document.getElementById("pokemon-list").append(pokemon);
  }
};
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();

  // let pokemonIcon = pokemon["sprites"]["front_default"];
  let pokemonName = pokemon["name"];
  let pokemonTypes = pokemon["types"];
  let pokemonImage = pokemon["sprites"]["front_default"];
  // let pokemonShiny = pokemon["sprites"]["front_shiny"];
  // let pokemonImage = "https://img.pokemondb.net/artwork/large/" + pokemonName + ".jpg";

  res = await fetch(pokemon["species"]["url"]);
  let flavorText = await res.json();
  let Desc1 = flavorText["flavor_text_entries"][9]["flavor_text"];
  let Desc2 = flavorText["flavor_text_entries"][10]["flavor_text"];
  let pokemonDesc = processed(Desc1) + " " + processed(Desc2);

  pokedex[num] = { name: pokemonName, types: pokemonTypes, desc: pokemonDesc, image: pokemonImage };
}
