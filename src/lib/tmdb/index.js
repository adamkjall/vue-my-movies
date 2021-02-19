import { completeImgUrls } from "./helpers";

const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
const DEFAULT_PARAMS = `api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&include_adult=false`;

export const searchTMDB = async (query, page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?query=${query}&page=${page}&${DEFAULT_PARAMS}`
    );
    const data = await res.json();
    if (data?.results) {
      data.results = completeImgUrls(data.results);
    }
    return data;
  } catch (error) {
    console.log("Error searching", error);
    return null;
  }
};

export const getTrendingMovies = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?page=${page}&${DEFAULT_PARAMS}`
    );
    const data = await res.json();
    if (data?.results) {
      data.results = completeImgUrls(data.results);
    }
    return data;
  } catch (error) {
    console.log("Error fetching trending movies", error);
    return null;
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?${DEFAULT_PARAMS}`);
    const data = await res.json();
    return completeImgUrls([data])[0];
  } catch (error) {
    console.log("Error fetching movie by id", error);
    return null;
  }
};
