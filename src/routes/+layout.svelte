<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import MouseCursor from '$lib/components/MouseCursor.svelte';

	let { children } = $props();
	let open = $state();
</script>

<svelte:head>
	<link rel="icon" href="favicon.ico" />
</svelte:head>

<MouseCursor />
<NavBar bind:open />

{@render children?.()}
