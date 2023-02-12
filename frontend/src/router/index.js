import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/Home.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import splashScreen from '../views/splash-screen.vue'
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
		// {
		//   path: '/about',
		//   name: 'about',
		//   // route level code-splitting
		//   // this generates a separate chunk (About.[hash].js) for this route
		//   // which is lazy-loaded when the route is visited.
		//   component: () => import('../views/AboutView.vue')
		// }
	],
})

export default router
