import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    redirect: '/query',
    component: () => import(/* webpackChunkName: "about" */ '../components/Main'),
    children: [
      {
        path: 'query',
        name: 'query',
        component: () => import(/* webpackChunkName: "about" */ '../views/frontend/query')
      },
      {
        path: 'download',
        name: 'download',
        component: () => import(/* webpackChunkName: "about" */ '../views/frontend/download')
      },
      {
        path: 'auth',
        name: 'auth',
        component: () => import(/* webpackChunkName: "about" */ '../views/frontend/auth')
      }
    ]
  },
  {
    path: '/login',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
