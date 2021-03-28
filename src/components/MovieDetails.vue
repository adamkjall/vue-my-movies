<template>
    <div
      class="movie-details"
      :style="{ backgroundImage: `url(${movie.backdrop_path})` }"
    >
      <div @click="close">CLOSE</div>
      <h1>{{ movie.title }}</h1>
      <!-- <img :src="movie.backdrop_path" alt="" /> -->
    </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchMovieById } from "../lib/tmdb";

export default {
  setup() {
    const movie = ref({});

    const route = useRoute();
    const router = useRouter();

    const getMovie = async () => {
      movie.value = await fetchMovieById(route.params.id);
      console.log(movie.value.backdrop_path);
    };

    const close = () => {
      router.push("/");
    };

    return { movie, getMovie, close };
  },
  mounted() {
    // console.log("Movie details mounted");
    this.getMovie();
    document.querySelector("body").style.overflow = "hidden";
  },
  unmounted() {
    // console.log("Movie details unmounted");
    document.querySelector("body").style.overflow = "unset";
  },
};
</script>

<style lang="scss" scoped>
.movie-details {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-color: #111827;
  color: white;
  border-radius: 8px;
  
}

</style>
