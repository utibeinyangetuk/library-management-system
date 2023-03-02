<template>
	<div class="wrapper">
		<!--TODO: navigation bar component goes here -->
		<div class="container">
			<form @submit.prevent="login">
				<input type="text" placeholder="username" v-model.trim="username" />
				<input type="password" placeholder="password" v-model.trim="password" />
				<button type="submit">Login</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const username = ref('')
	const password = ref('')
	const login = () => {
		console.log({ username: username.value, password: password.value })
		router.push('/account')
	}
</script>
