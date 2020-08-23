import HelloWorld from './components/HelloWorld.vue';
import GoogleMap from './view/GoogleMap.vue';

export default [
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
];

// export default new VueRouter({
//   mode: 'history',
//   routers,
// });
