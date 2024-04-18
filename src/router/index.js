import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: HomeView,
    children: [
      {
        path: 'CarView',
        name: 'CarView',
        component: () => import('../views/CarView.vue')
      },
      {
        path:'/CarSettingsView',
        name:'CarSettingsView',
        component:()=>import('../views/CarSettingView.vue')
      },
      {
        path:'DataView',
        name:'DataView',
        component:()=>import('../views/DataView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
