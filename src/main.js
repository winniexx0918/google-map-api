import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';
import GoogleMap from './components/GoogleMap.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router: new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/HelloWorld',
      },
      {
        path: '/HelloWorld',
        component: HelloWorld,
      },
      {
        path: '/GoogleMap',
        component: GoogleMap,
      },
    ],
  }),
  render: (h) => h(App),
}).$mount('#app');
