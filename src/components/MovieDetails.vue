<template>
  <div
    class="movie-details"
    :style="{ backgroundImage: `url(${movie.backdrop_path})` }"
  >
    <div class="overlay"></div>
    <fa-icon
      class="close-btn"
      :icon="['far', 'times-circle']"
      size="2x"
      @click.prevent="close"
    ></fa-icon>

    <div class="details-wrapper">
      <div class="content">
        <img class="poster" :src="movie.poster_path" alt="" />
        <div class="details">
          <div class="details__header">
            <h1 class="title">
              {{ movie.title }}
              <span class="release-date"
                >({{ movie.release_date?.split("-")[0] }})</span
              >
            </h1>
            <div class="vote">
              {{ movie.vote_average }} <span>({{ movie.vote_count }})</span>
            </div>
          </div>
          <div class="tagline" v-if="movie.tagline">
            {{ movie.tagline }}
          </div>
          <div class="details__subheader">
            <div class="runtime">{{ getRuntime(movie.runtime) }}</div>
            <span>|</span>
            <div class="genres">{{ genres }}</div>
            <span>|</span>
            <a
              class="imdb-link"
              v-if="movie.imdb_id"
              :href="`https://www.imdb.com/title/${movie.imdb_id}`"
              target="_blank"
            >
              <img src="/images/imdb-logo.svg" alt="imdb logo" />
            </a>
          </div>
          <p class="overview">{{ movie.overview }}</p>
        </div>
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
    bottom: 2.5rem;
    left: 1.5rem;
    z-index: 5;
    cursor: pointer;
  }

  .details-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    overflow: auto;
    padding: 5rem 1.5rem 5rem 6.5rem;

    .content {
      display: grid;
      grid-auto-flow: column;
      gap: 4rem;

      .poster {
        max-width: 20rem;
        /* float: left; */
      }

      .details {
        &__header {
          display: flex;
          justify-content: space-between;

          .title {
            font-size: 3.5rem;

            span {
              font-size: 2.5rem;
              filter: brightness(50%);
            }
          }

          .vote {
            font-size: 2.5rem;

            span {
              font-size: 2rem;
              filter: brightness(50%);
            }
          }
        }

        .tagline {
          font-size: 1.5rem;
          font-style: italic;

          &::before,
          &::after {
            content: '"';
          }
        }

        &__subheader {
          margin-top: 0.5rem;
          display: flex;
          color: gainsboro;

          span {
            margin: 0 0.75rem;
          }

          .imdb-link {
            width: 3rem;
            /* height: 100%; */
            display: block;
            img {
              width: 100%;
              height: auto;
            }
          }
        }

        .overview {
          margin-top: 2rem;
        }
      }
    }
  }
}
</style>
