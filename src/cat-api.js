import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_wyzTG3Fa7jMfSwxR80ZayFtfomRZt60sO7fXZt95esYdIvR2JwIvQ1KPNnN9lRj2';

export function fetchBreeds() {
  return axios.get('/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`);
}
