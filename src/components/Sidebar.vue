<template>
  <div class="sidebar" :class="{ 'isOpen' : isOpen }" ref="sidebar">
    <div class="hamburger-icon" @click.prevent="toggleSidebar">
      <fa-icon :icon="['fas', 'bars']" size="2x" :style="{ color: 'white'}" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const isOpen = ref(false);
    const sidebar = ref(null)

    const toggleSidebar = () => isOpen.value = isOpen.value ? false : true;

    const handleClick = event => {
      if (!isOpen.value || !sidebar.value) return;
      if (!sidebar.value.contains(event.target)) {
        isOpen.value = false;
      }
    }

    return {
      isOpen,
      toggleSidebar,
      handleClick,
      sidebar
    };
  },
  mounted() {
    window.addEventListener("click", this.handleClick)
  },
  beforeDestroy() {
    window.removeEventListener("click", this.handleClick)
  }
  
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 100vh;
  background-color: black;
  transform: translate3d(-100%, 0, 0);
  transition: transform 400ms ease;
  padding: 1rem;

  &.isOpen {
    transform: translate3d(0, 0, 0);
  }

  .hamburger-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate3d(100%, 0, 0);
    cursor: pointer;
    padding: 1rem;
    background-color: black;
    border-bottom-right-radius: 0.375rem;;
  }
}
</style>
