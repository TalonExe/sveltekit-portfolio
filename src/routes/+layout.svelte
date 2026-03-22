<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import MouseCursor from '$lib/components/MouseCursor.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="favicon.ico" />
</svelte:head>

<MouseCursor />
<NavBar />

{@render children?.()}
