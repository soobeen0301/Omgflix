import { fetchMovies } from './detail-api.js';
import { loading } from './detail-loding.js';
import { moveTop } from './move-top-detail.js';
import { initializeEventHandlers } from './move-comments.js';

fetchMovies();
loading();
initializeEventHandlers();
moveTop();
