import { fetchMovies } from './detail-api.js';
import { loading } from './detail-loding.js';
import { moveTop } from './move-top-detail.js';

fetchMovies();

loading();

moveTop();
