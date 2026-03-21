<script>
	import Hero from '$lib/components/Hero.svelte';
	import MouseCursor from '$lib/components/MouseCursor.svelte';
	import Projects from '$lib/components/Projects.svelte';

	const heroBackgroundUrl = '/aquarium-8bit.gif';
</script>

<MouseCursor/>
<Hero backgroundUrl={heroBackgroundUrl} />
<Projects />
