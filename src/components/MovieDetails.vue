<template>
  <div
    class="movie-details"
    :style="{ backgroundImage: `url(${movie.backdrop_path})` }"
  >
    <div class="overlay"></div>
    <div class="close-btn" @click="close">CLOSE</div>
    <div class="details-wrapper">
      <div class="content">
        <h1 class="title">{{ movie.title }}</h1>
        <div class="release-date">Release date:{{ movie.release_date }}</div>
        <div class="runtime">Runtime: {{ getRuntime(movie.runtime) }}</div>
        <div class="genres">Genres: {{ genres }}</div>
        <div class="tagline" v-if="movie.tagline">
          Tagline: {{ movie.tagline }}
        </div>
        <a
          class="imdb-link"
          v-if="movie.imdb_id"
          :href="`https://www.imdb.com/title/${movie.imdb_id}`"
          target="_blank"
        >
          <img src="/img/imdb-logo.svg" alt="imdb logo" />
        </a>
        <img class="poster" :src="movie.poster_path" alt="" />
        <p>Overview: {{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchMovieById } from "../lib/tmdb";

export default {
  setup() {
    const movie = ref({});

    const route = useRoute();
    const router = useRouter();

    const genres = computed(() =>
      movie.value.genres?.map((genre) => genre.name).join(", ")
    );

    const getMovie = async () => {
      movie.value = await fetchMovieById(route.params.id);
      console.log(movie.value);
    };

    const getRuntime = (runtime) => {
      if (!runtime) return "";
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return (hours ? hours + "h " : "") + (minutes ? minutes + "m" : "");
    };

    const close = () => {
      router.push("/");
    };

    return { movie, getMovie, close, genres, getRuntime };
  },
  mounted() {
    this.getMovie();
    document.querySelector("body").style.overflow = "hidden";
  },
  unmounted() {
    document.querySelector("body").style.overflow = "unset";
  },
};
</script>

<style lang="scss" scoped>
.movie-details {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-color: #111827;
  color: white;

  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
  }

  .details-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    overflow: auto;
    padding: 5rem 1.5rem 5rem 6.5rem;

    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      .poster {
        width: 20rem;
      }

      .imdb-link {
        width: 3.5rem;
        display: block;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
