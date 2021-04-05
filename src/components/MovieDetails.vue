<template>
  <div
    class="movie-details"
    :style="{ backgroundImage: `url(${movie.backdrop_path})` }"
  >
    <!-- <div class="overlay"></div> -->
    <div class="close-btn" @click="close">CLOSE</div>
    <div class="details-wrapper">
      <div class="content">
        <h1>{{ movie.title }}</h1>
        <div>{{ genres }}</div>
        <img :src="movie.backdrop_path" alt="" />
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

    const genres = computed(() => movie.value.genres?.map(genre => genre.name).join(", "))

    const getMovie = async () => {
      movie.value = await fetchMovieById(route.params.id);
      console.log(movie.value);
    };

    const close = () => {
      router.push("/");
    };

    return { movie, getMovie, close, genres };
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
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.6);
  }

  .close-btn {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
  }

  .details-wrapper {
    overflow: auto;
    height: 100%;
    padding: 5rem 1.5rem 0 6.5rem;
  }
}
</style>
