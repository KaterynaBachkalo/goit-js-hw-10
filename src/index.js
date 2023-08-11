import axios from 'axios';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_wyzTG3Fa7jMfSwxR80ZayFtfomRZt60sO7fXZt95esYdIvR2JwIvQ1KPNnN9lRj2';

const refs = {
  catInfo: document.querySelector('.cat-info'),
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const ERROR_MESSAGE = 'Oops! Something went wrong! Try reloading the page!';

refs.breedSelect.style.width = '300px';

refs.breedSelect.addEventListener('change', selectCat);

function selectCat(e) {
  const breedId = e.currentTarget.value;
  refs.catInfo.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');

  fetchCatByBreed(breedId)
    .then(res => {
      refs.catInfo.innerHTML = renderCatCard(res.data);
      refs.loader.classList.add('is-hidden');
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(e => {
      console.error(e);
      onError();
    });
}

fetchBreeds()
  .then(response => {
    refs.loader.classList.add('is-hidden');
    refs.breedSelect.classList.remove('is-hidden');

    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      renderBreeds(response.data)
    );
    new SlimSelect({
      select: refs.breedSelect,
      settings: {
        placeholderText: 'Select the breed of the cat, please',
      },
    });
  })
  .catch(e => {
    console.error(e);
    onError();
  });

function renderBreeds(array) {
  return array
    .map(({ id, name }) => `<option value="${id}" >${name}</option>`)
    .join('');
}

function renderCatCard(obj) {
  const url = obj[0].url;
  const { description, temperament, name } = obj[0].breeds[0];

  return `<img src="${url}" alt="${name}" width="480px" />
      <div><h1>${name}</h1>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p></div>`;
}

function onError() {
  refs.loader.classList.add('is-hidden');
  refs.error.classList.remove('is-hidden');

  Notify.failure(ERROR_MESSAGE, {
    position: 'center-top',
  });
}
