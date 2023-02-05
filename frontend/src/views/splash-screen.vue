<template>
	<div v-if="showSplash" class="splash-screen">
		<h1 class="splash-text">Welcome to ABUAD LMS</h1>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const showSplash = ref(true)

onMounted(() => {
	setTimeout(() => {
		showSplash.value = ref(false)
		router.push({ name: 'home' })
	}, 5000);
})
</script>

<style scoped>
.splash-screen {
	height: 100vh;
	width: 100%;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeUp 3s ease-in-out, fadeOut 3s ease-in-out 3s;
}

.splash-text {
	color: #000;
	font-size: 36px;
	text-align: center;
}

@keyframes fadeUp {
	from {
		transform: translateY(100%);
	}

	to {
		transform: translateY(0);
	}
}

@keyframes fadeOut {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
}
</style>
