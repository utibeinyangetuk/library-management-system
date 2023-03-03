<template>
	<div class="wrapper">
		<!--TODO: navigation bar component goes here -->
		<div class="container">
			<form @submit.prevent.trim="register">
				<input type="text" placeholder="username" v-model="username" />
				<input type="email" placeholder="email" v-model="email" />
				<input type="password" placeholder="password" v-model="password" />
				<input type="password" placeholder="confirm password" v-model="Confirmpassword" />
				<button type="submit">Register</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()

	const username = ref('')
	const email = ref('')
	const password = ref('')
	const Confirmpassword = ref('')

	const register = async () => {
		const userData = { username: username.value, email: email.value, password: password.value, Confirmpassword: Confirmpassword.value }
		await axios
			.post('/api/users/register', userData)
			.then((response, err) => {
				if (response.data.success) {
					console.log(response.data)
					router.push('/dashboard')
				} else if (response.data.error) {
					router.push('/register')
				} else throw err
			})

			.catch((e) => {
				throw e
			})
	}
</script>
