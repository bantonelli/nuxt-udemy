<template>
	<div>
		<nuxt />
	</div>
</template>

<style>
html {
	font-family: "Open Sans", sans-serif;
}
body {
	margin: 0;
}
</style>

<script>
export default {
	middleware: ['check-auth', 'auth']
};
</script>

