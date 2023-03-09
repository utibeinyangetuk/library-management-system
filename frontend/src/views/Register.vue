<template>
	<div class="container">
		<form @submit.prevent.trim="register">
			<input type="text" placeholder="username" v-model="username" />
			<input type="email" placeholder="email" v-model="email" />
			<input type="password" placeholder="password" v-model="password" />
			<input type="password" placeholder="confirm password" v-model="Confirmpassword" />
			<button type="submit">signup</button>
		</form>
	</div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const Confirmpassword = ref('')

const register = async () => {
	const Userdata = { username: username.value, email: email.value, password: password.value, Confirmpassword: Confirmpassword.value }
	await axios
		.post('/api/users/signup', Userdata)
		.then((res, err) => {
			if (res.data.success) {
				console.log('registration successful')
				router.push('/login')
			} else if (res.data.err) {
				console.log('an error occured during registration')
				router.push('/signup')
			} else {
				throw err
			}
		})
		.catch((error) => {
			throw error
		})
}
</script>
