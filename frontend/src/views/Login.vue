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


import { useAuthenticationStore } from "../stores/Authentication";
const store = useAuthenticationStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {

	// TODO: perform validation
	const userData = { email: email.value, password: password.value }
	await axios
		.post('/api/users/login', userData)
		.then((res, err) => {
			if (res.data.success) {
				store.setAuthentication(true)
				console.log(store.authenticated)
				router.replace('/dashboard')
			} else if (res.data.err) {
				console.log('error detected during login')
				router.push('/login')
			} else {
				console.log(err)
			}
		})
		.catch((error) => {
			throw error
		})
}

</script>
