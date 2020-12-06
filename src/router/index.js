import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vector',
    name: 'vector',
    component: () => import(/* webpackChunkName: "vector" */ '../views/vector.vue')
  },
  {
    path: '/camera1',
    name: 'camera1',
    component: () => import(/* webpackChunkName: "camera1" */ '../views/camera1.vue')
  },
  {
    path: '/line1',
    name: 'line1',
    component: () => import(/* webpackChunkName: "line1" */ '../views/line1.vue')
  },
  {
    path: '/tween1',
    name: 'tween1',
    component: () => import(/* webpackChunkName: "tween1" */ '../views/tween1.vue')
  },
  {
    path: '/light1',
    name: 'light1',
    component: () => import(/* webpackChunkName: "light1" */ '../views/light1.vue')
  },
  {
    path: '/geometry1',
    name: 'geometry1',
    component: () => import(/* webpackChunkName: "geometry1" */ '../views/geometry1.vue')
  },
  {
    path: '/geometry2',
    name: 'geometry2',
    component: () => import(/* webpackChunkName: "geometry2" */ '../views/geometry2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
