<script>
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import AchievementTimeline from '$lib/components/AchievementTimeline.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const heroBackgroundUrl = '/aquarium-8bit.gif';
</script>

<Hero backgroundUrl={heroBackgroundUrl} />
<Projects />
<AchievementTimeline />
<Footer />
