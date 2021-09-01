const infoCard = document.querySelector('[info-poke-card]');
const infoName = document.querySelector('[info-poke-name]');
const infoImg = document.querySelector('[info-poke-img]');
const infoImgContainer = document.querySelector('[info-poke-img-container]');
const infoId = document.querySelector('[info-poke-id]');
const infoTypes = document.querySelector('[info-poke-types]');
const infoStats = document.querySelector('[info-poke-stats]');

const typeColors = {
 electric: '#FFEA70',
 default: '#2a1a1f',
 fighting: '#2f2f2f',
 steel: '#1d8a99',
 deagon: '#da627d',
 ground: '#d2b074',
 poison: '#795663',
 bug: '#a2faa3',
 ghost: '#561d25',
 psychic: '#ffc6d9',
 grass: '#4a9681',
 flying: '#7ae7c7',
 rock: '#999799',
 ice: '#afeafd',
 water: '#0596c7',
 fire: '#ff675c',
 normal: '#b09398',
 fairy: '#FF7EDB',
};

const searchPokemon = (event) => {
 event.preventDefault(); //EVITA EL SUBMIT DEL FORM
 const { value } = event.target.pokemon;
 fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //BUSQUEDA DEL POKEMON
  .then((data) => data.json())
  .then((response) => renderPokemonData(response))
  .catch((err) => renderNotFound());
};

const renderPokemonData = (data) => {
 const sprite = data.sprites.front_default;
 const { stats, types } = data;

 infoName.textContent = data.name;
 infoImg.setAttribute('src', sprite);
 infoId.textContent = `N° ${data.id}`;
 setCardColor(types);
 renderPokemonTypes(types);
 renderPokemonStats(stats);
};

const setCardColor = (types) => {
 const colorOne = typeColors[types[0].type.name];
 const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
 infoImg.style.background = `linear-gradient(${colorTwo} 90%, ${colorOne} 90%)`;
 infoImg.style.backgroundSize = '5px 5px';
};

const renderPokemonTypes = (types) => {
 infoTypes.innerHTML = '';
 types.forEach((type) => {
  const typeTextElement = document.createElement('div');
  typeTextElement.style.color = typeColors[type.type.name];
  typeTextElement.textContent = type.type.name;
  infoTypes.appendChild(typeTextElement);
 });
};

const renderPokemonStats = (stats) => {
 infoStats.innerHTML = '';
 stats.forEach((stat) => {
  const statElement = document.createElement('div');
  const statElementName = document.createElement('div');
  const statElementAmount = document.createElement('div');
  statElementName.textContent = stat.stat.name;
  statElementAmount.textContent = stat.base_stat;
  statElement.appendChild(statElementName);
  statElement.appendChild(statElementAmount);
  infoStats.appendChild(statElement);
 });
};

const renderNotFound = () => {
 infoName.textContent = 'No existe ;(';
 infoImg.setAttribute('src', './images/pokeball.png');
 infoImg.style.background;
 infoTypes.innerHTML = '';
 infoStats.innerHTML = '';
 infoId.innerHTML = '';
};

// MENU HAMBURGUESA

const navHambur = document.querySelector('.hambur');
const navMenu = document.querySelector('.nav-menu');

navHambur.addEventListener('click', () => {
 navMenu.classList.toggle('nav-menu_visible');
});
