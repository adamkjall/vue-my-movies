<template>
  <div
    class="fixed top-0 w-full h-full bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div class="w-40 p-6 mx-auto mt-10 bg-white rounded">
      <slot>Hej Movie</slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
