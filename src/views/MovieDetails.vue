<template>
  <div class="movie-details">
    <h1>{{ movie.title }}</h1>
    <img :src="movie.backdrop_path" alt="" />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { getMovieById } from "../lib/tmdb";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();

    onBeforeMount(async () => {
      movie.value = await getMovieById(route.params.id);
      console.log(movie.value);
    });

    return {
      movie,
    };
  },
};
</script>

<style></style>
