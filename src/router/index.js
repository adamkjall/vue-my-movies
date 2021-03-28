import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieDetails from "../components/MovieDetails.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: '/movie/:id',
        name: "movie",
        component: MovieDetails,
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
