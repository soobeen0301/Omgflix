import { fetchMovies } from './api.js';
import { searchButton, onSubmit } from './movie-search.js';
import { pagenation } from './pagenation.js';
import { moveTop } from './move-top-page.js';

export let movieDataList = [];

fetchMovies(1);

searchButton();

onSubmit();

moveTop();

pagenation();
