const $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

const $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

const ALL_CATEGORY_TAB = "ALL";
const categories = [];

import { pokemons } from "./data.js";
const searchInput = $_(".js-input-search");
const wrapperElement = $_(".wrapper");
const categoryWrapper = $_(".category-wrapper");
const template = $_(".pokemons-template").content;

const displayPokemons = function (pokemons) {
  const pokemonsFragment = document.createDocumentFragment();
  wrapperElement.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const wrapperClone = template.cloneNode(true);
    $_(".box__wrapp__content__title", wrapperClone).textContent = pokemon.name;
    $_(".pacemon__img", wrapperClone).src = pokemon.img;
    $_(".weight", wrapperClone).textContent = pokemon.weight;
    $_(".height", wrapperClone).textContent = pokemon.height;

    $_(".box__wrapp__content__text", wrapperClone).textContent = pokemon.type;
    pokemonsFragment.appendChild(wrapperClone);
  });

  wrapperElement.appendChild(pokemonsFragment);
};

displayPokemons(pokemons);

const displayCategories = function (categories) {
  const categoryFragment = document.createDocumentFragment();
  const categoryTemplate = $_(".category-template").content;
  categories.forEach((category) => {
    const categoryItem = categoryTemplate.cloneNode(true);

    $_(".category-item", categoryTemplate).textContent = category;
    $_(".category-item", categoryTemplate).dataset.id = category;

    categoryFragment.appendChild(categoryItem);
  });

  categoryWrapper.appendChild(categoryFragment);
};

pokemons.forEach((pokemon) => {
  pokemon.type.forEach((category) => {
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
});

displayCategories(categories);

categoryWrapper.addEventListener("click", (evt) => {
  evt.preventDefault();
  let newSelect;
  if (evt.target.matches("li") && evt.target.dataset.id !== ALL_CATEGORY_TAB) {
    newSelect = pokemons.filter((pokemon) => {
      return pokemon.type.includes(evt.target.dataset.id);
    });
  } else if (
    evt.target.matches("li") &&
    evt.target.dataset.id === ALL_CATEGORY_TAB
  ) {
    newSelect = pokemons;
  }

  displayPokemons(newSelect);
});

searchInput.addEventListener("keyup", (evt) => {
  const inputValue = new RegExp(evt.target.value, `gi`);
  const newPokemons = pokemons.filter((pokemon) =>
    pokemon.name.match(inputValue)
  );

  displayPokemons(newPokemons);
});
