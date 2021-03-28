<template>
  <div class="home">
    <form @submit.prevent="searchMovies" class="search-box">
      <input
        type="text"
        placeholder="Search here..."
        v-model="search"
        autofocus
      />
      <input type="submit" value="Search" />
    </form>

    <div class="movie-list">
      <Card
        v-for="movie in movies"
        @click="toggleModal(movie.id)"
        :key="movie.id"
        :title="movie?.title || movie?.name"
        :releaseYear="
          movie?.release_date?.split('-')[0] ||
            movie?.first_air_date?.split('-')[0]
        "
        :posterPath="movie.poster_path"
        alt="Poster"
        :mediaType="movie.media_type"
        :rating="movie.vote_average"
        :ratingCount="movie.vote_count"
      />
    </div>
    <transition name="component-fade" mode="out-in">
      <Router-view />
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { searchTMDB, fetchTrendingMovies } from "../lib/tmdb";

import Card from "../components/Card";
import MovieDetails from "../components/MovieDetails";

export default {
  components: { Card, MovieDetails },
  setup(props, context) {
    const search = ref("");
    const movies = ref([]);

    const router = useRouter();

    const getTrendingMovies = async () => {
      const res = await fetchTrendingMovies();
      movies.value = res.results;
    };

    const searchMovies = async () => {
      if (search.value.length) {
        const res = await searchTMDB(search.value);
        movies.value = res.results;
        search.value = "";
      }
    };

    const toggleModal = (id) => {
      if (!id) router.push("/");
      else router.push({ name: "movie", params: { id } });
    };

    return {
      search,
      movies,
      getTrendingMovies,
      searchMovies,
      toggleModal,
    };
  },
  mounted() {
    this.getTrendingMovies();
  },
};
</script>

<style lang="scss">
.home {
  position: relative;

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

/* Modal transition */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
