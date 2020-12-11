import { createRouter, createWebHistory } from 'vue-router'

import apolloClient from '@/graphql/grapql'
import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import Docs from '@/views/Docs'
import Login from '@/views/auth/Login'
import DashBoard from '@/views/DashBoard'
import CreateCharacter from '@/views/character/CreateCharacter'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/documentation',
    name: 'Docs',
    component: Docs
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    meta: { needToBeLoggedOut: true }
  },
  {
    path: '/dashboard',
    name: 'MainDashBoard',
    component: DashBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/character/new',
    name: 'CreateCharacter',
    component: CreateCharacter,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const data = apolloClient.cache.readQuery({ query: authDataLocalQuery })
  const isUserLoggedIn = data?.authDataLocal
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.needToBeLoggedOut)) {
    if (isUserLoggedIn) {
      next({
        path: '/dashboard'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
