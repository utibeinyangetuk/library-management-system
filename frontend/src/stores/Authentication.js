import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('Authentication', {
	state: () => ({
		authenticated: false,
	}),
	getters: {},
	actions: {
		setAuthentication(status) {
			this.authenticated = status
		},
	},
})
