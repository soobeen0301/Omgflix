import { fetchMovies } from './detail-api.js';
import { loading } from './detail-loding.js';
import { moveTop } from './move-top-detail.js';
import { initializeEventHandlers } from './move-comments.js';
import { openModal } from './review-pop.js';
import { closeModal } from './review-pop.js';

fetchMovies();
loading();
initializeEventHandlers();
moveTop();
openModal();
closeModal();