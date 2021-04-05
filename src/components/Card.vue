<template>
  <div class="card cursor-pointer rounded-md overflow-hidden bg-gray-800" ref="card">
    <div class="relative container">
      <img
        class="poster bg-gray-700"
        :class="{ 'animate-pulse' : loading}"
        :src="posterPath"
        :alt="alt"
        :onload="loading = false"
        oncomplete="alert('com')"
        onerror="this.onerror=null;this.src='./img/default-poster.webp';"
      />
      <div
        class="absolute bottom-0 right-0 bg-green-500 capitalize text-white p-2"
      >
        {{ mediaType }}
      </div>
      <div class="absolute bottom-0 left-0 bg-green-500 text-white p-2">
        {{ releaseYear }}
      </div>
    </div>
    <div class="flex justify-between text-white p-4">
      <!-- <h3>{{ title }}</h3> -->
      <div>Rating: {{ rating }}</div>
      <div>Votes: {{ ratingCount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "posterPath",
    "mediaType",
    "releaseYear",
    "title",
    "alt",
    "rating",
    "ratingCount",
  ],
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    // console.log("mounted", this.$refs);
  },
};
</script>

<style lang="scss" scoped>
.card {
  .container {
    position: relative;
    width: 100%;
    padding-top: 150%;

    .poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
