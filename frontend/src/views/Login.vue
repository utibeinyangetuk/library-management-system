<template>
	<div class="container">
		<form @submit.prevent.trim="login">
			<input type="email" placeholder="email" v-model="email" />
			<input type="password" placeholder="password" v-model="password" />
			<button type="submit">login</button>
		</form>
	</div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
	const userData = { email: email.value, password: password.value }
	await axios
		.post('/api/users/login', userData)
		.then((res, err) => {
			if (res.data.success) {
				console.log('login successful')
				router.push('/dashboard')
			} else if (res.data.err) {
				console.log('error detected during login')
				router.push('/login')
			} else {
				throw err
			}
		})
		.catch((error) => {
			throw error
		})
}
</script>
