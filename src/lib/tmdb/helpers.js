import { BASE_IMG_URL } from "./index";

export const completeImgUrls = (movies) =>
  movies.map((movie) => ({
    ...movie,
    backdrop_path: BASE_IMG_URL + movie.backdrop_path,
    poster_path: BASE_IMG_URL + movie.poster_path,
  }));
