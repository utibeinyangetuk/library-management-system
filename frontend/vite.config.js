import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	//setting up a proxy to catch every request that begins with /api and send it to the server for processing
	server: {
		proxy: {
			'^/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
})
