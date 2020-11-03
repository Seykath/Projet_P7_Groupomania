import Vue from 'vue'
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
  faBars,
  faFileImage
} from '@fortawesome/free-solid-svg-icons';


library.add(faUser, faUserPlus, faSignInAlt, faSignOutAlt, faStickyNote, faComment, faShare, faEllipsisH, faClock, faImages, faBars, faFileImage);



Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
