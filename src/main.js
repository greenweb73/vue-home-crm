import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import 'materialize-css/dist/js/materialize.min'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filters/date.filter' // Импортируем фильтер даты
import currencyFilter from '@/filters/currency.filter' // Импортируем фильтер валюты
import localizeFilter from '@/filters/localize.filter' // Импортируем фильтер языковой фильтр
import tooltipDirective from '@/directives/tooltip.directive' // Импортируем директиву

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(messagePlugin) // Регистрируем плагин
Vue.use(Vuelidate) // Регистрируем плагин Vuelidate
Vue.use(VueMeta) // Регистрируем плагин VueMeta
Vue.use(titlePlugin) // Регистрируем плагин VueMeta
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.filter('date', dateFilter) // Регистрируем фильтер даты
Vue.filter('currency', currencyFilter) // Регистрируем фильтер валют
Vue.filter('localize', localizeFilter) // Регистрируем фильтер языков
Vue.directive('tooltip', tooltipDirective) // Регистрируем глобально директиву

// Your web app's Firebase configuration
// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCgv2j9B6Olb_-PuXUfCg9D5GT6MzOAYFo',
  authDomain: 'vue-home-learncrm.firebaseapp.com',
  databaseURL: 'https://vue-home-learncrm.firebaseio.com',
  projectId: 'vue-home-learncrm',
  storageBucket: 'vue-home-learncrm.appspot.com',
  messagingSenderId: '882260241982',
  appId: '1:882260241982:web:07c9f3ba773692bfa8eb6f',
  measurementId: 'G-VN9JW4C3WY'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
