import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faStickyNote,
  faComment,
  faShare,
  faEllipsisH,
  faClock,
  faImages,
  faBars
} from '@fortawesome/free-solid-svg-icons';

import store from './store'

library.add(faUser, faUserPlus, faSignInAlt, faSignOutAlt, faStickyNote, faComment, faShare, faEllipsisH, faClock, faImages, faBars);

Vue.use(Vuex)
Vue.config.productionTip = false


Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
