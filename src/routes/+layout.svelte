<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="favicon.ico" />
</svelte:head>

<NavBar />

{@render children?.()}
