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
import { ref } from "vue";
import { searchTMDB } from "../lib/tmdb";

import Card from "../components/Card";
import Modal from "../components/Modal";

export default {
  components: { Card, Modal },
  setup() {
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
  .movie-card {
    position: relative;

    .poster-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .details {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 1rem;
      z-index: 1;

      h3 {
        color: white;
        margin-bottom: 1rem;
      }

      p {
        color: white;
      }
    }
  }

  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

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
        font-size: 1.3rem;
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
        font-size: 1.3rem;
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

    .movie {
      border-radius: 0.3rem;
      overflow: hidden;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .movie-poster {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            object-fit: cover;
          }

          .movie-type {
            position: absolute;
            padding: 0.5rem 1rem;
            background-color: #42b883;
            color: white;
            bottom: 1rem;
            left: 0;
            text-transform: capitalize;
          }
        }

        .details {
          background-color: #496583;
          padding: 1rem 0.5rem;
          flex: 1 1 100%;

          .year {
            color: #aaa;
            font-size: 0.8rem;
          }

          h3 {
            color: white;
            font-weight: 600;
            font-size: 1.2rem;
            margin: 0.5rem 0;
          }
        }
      }
    }
  }
}
</style>
