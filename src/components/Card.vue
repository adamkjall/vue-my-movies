<template>
  <div class="">
    <div class="relative">
      <img :src="posterPath" :alt="alt" />
      <div
        class="absolute bottom-0 right-0 bg-green-500 capitalize text-white p-2"
      >
        {{ mediaType }}
      </div>
      <div class="absolute bottom-0 left-0 bg-green-500 text-white p-2">
        {{ releaseYear }}
      </div>
    </div>
    <div class="">
      <!-- <h3>{{ title }}</h3> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["posterPath", "mediaType", "releaseYear", "title", "alt"],
};
</script>
