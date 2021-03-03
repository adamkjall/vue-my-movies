<template>
  <div class="home">
    <form @submit.prevent="searchMovies" class="search-box">
      <input type="text" placeholder="Search here..." v-model="search" />
      <input type="submit" value="Search" />
    </form>

    <div class="movie-list">
      <Card
        v-for="movie in movies"
        @click="toggleModal"
        :key="movie.id"
        :title="movie?.title || movie?.name"
        :releaseYear="
          movie?.release_date?.split('-')[0] ||
            movie?.first_air_date?.split('-')[0]
        "
        :posterPath="movie.poster_path"
        :alt="Poster"
        :mediaType="movie.media_type"
        :rating="movie.vote_average"
        :ratingCount="movie.vote_count"
      />
    </div>

    <Modal v-show="showModal" @close-modal="toggleModal" />
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import { searchTMDB } from "../lib/tmdb";

import Card from "../components/Card";
import Modal from "../components/Modal";

export default {
  components: { Card, Modal },
  setup(props, context) {
    const search = ref("");
    const movies = ref([]);
    const showModal = ref(false);

    const searchMovies = async () => {
      if (search.value.length) {
        const data = await searchTMDB(search.value);
        movies.value = data.results;
        search.value = "";
        console.log(data);
      }
    };

    const toggleModal = () => (showModal.value = !showModal.value);

    return {
      search,
      movies,
      searchMovies,
      toggleModal,
      showModal,
    };
  },
};
</script>

<style lang="scss">
.home {
  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        width: 100%;
        color: white;
        background-color: #496583;
        padding: 0.8rem 1rem;
        border-radius: 0.5rem 0 0 0.5rem;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 0.8rem 1rem;
        border-radius: 0 0.5rem 0.5rem 0;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 320px));
    gap: 1rem;
    justify-content: center;
  }
}
</style>
