import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "./assets/styles/index.scss";

library.add(faTimesCircle, faBars)

createApp(App)
  .use(router)
  .component('fa-icon', FontAwesomeIcon)
  .mount("#app");
