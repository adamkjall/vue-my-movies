<template>
  <div class="card cursor-pointer rounded-md overflow-hidden" ref="card">
    <div class="relative">
      <img class="poster" :src="posterPath" :alt="alt" :style="height" />
      <div
        class="absolute bottom-0 right-0 bg-green-500 capitalize text-white p-2"
      >
        {{ mediaType }}
      </div>
      <div class="absolute bottom-0 left-0 bg-green-500 text-white p-2">
        {{ releaseYear }}
      </div>
    </div>
    <div class="flex justify-between text-white p-4 bg-gray-900">
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
  computed: {
    height() {
      // const cardRef= this.$refs;
      // console.log(cardRef);
    }
  },
  mounted() {
    // console.log("mounted", this.$refs);
  }
  
};
</script>

<style lang="scss" scoped>
.card {
  /* .poster {
  } */
}
</style>