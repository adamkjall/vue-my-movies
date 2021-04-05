<template>
  <div class="home">
    <form @submit.prevent="searchMovies" class="search-box">
      <input
        class="rounded-l-md"
        type="text"
        placeholder="Search here..."
        v-model="search"
        autofocus
      />
      <input class="rounded-r-md" type="submit" value="Search" />
    </form>

    <div class="movie-list">
      <Card
        v-for="movie in movies"
        @click.prevent="toggleModal(movie.id)"
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
    <!-- Movie details route -->
    <router-view v-slot="{ Component }">
      <transition name="component-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { searchTMDB, fetchMovies } from "../lib/tmdb";

import Card from "../components/Card";

export default {
  components: { Card },
  setup(props, context) {
    const search = ref("");
    const movies = ref([]);

    const router = useRouter();

    const getMovies = async () => {
      const res = await fetchMovies("popular");
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
      getMovies,
      searchMovies,
      toggleModal,
    };
  },
  mounted() {
    this.getMovies();
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
    margin: 1rem;

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
    margin: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1rem;
    justify-content: center;
  }
}

/* Movie details transition */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.350s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
