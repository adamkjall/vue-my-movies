<template>
  <header>
    <router-link to="/">
      <h1><span>Vue</span>Movies</h1>
    </router-link>
  </header>
  <main>
    <router-view />
  </main>
  <Sidebar />
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  components: { Sidebar },
  setup(props, context) {
    return {};
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;

  &::selection {
    background: transparentize(#42b883, 0.5);
  }
}

body {
  position: relative;
  background-color: #35495e;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .8rem 1rem;
  background-color: #2c3d4e;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);

  h1 {
    color: white;
    font-size: 1.8rem;

    span {
      color: #42b883;
    }
  }
}
</style>
