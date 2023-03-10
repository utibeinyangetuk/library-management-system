import { createRouter, createWebHistory } from 'vue-router'
import account from '../views/account.vue'
import dashboard from '../views/dashboard.vue'
import homepage from '../views/Home.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import splashScreen from '../views/splash-screen.vue'

import { useAuthenticationStore } from '../stores/Authentication'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'splash-screen',
			component: splashScreen,
		},
		{
			path: '/home',
			name: 'home',
			component: homepage,
		},
		{
			path: '/login',
			name: 'login',
			component: login,
		},
		{
			path: '/register',
			name: 'register',
			component: register,
		},
		{
			path: '/account',
			name: 'account',
			component: account,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: dashboard,
			// Route guarding
			beforeEnter: (to, from, next) => {
				const store = useAuthenticationStore()
				if (store.authenticated == false) {
					next('/login')
				} else {
					next()
				}
			},
		},
	],
})

export default router
