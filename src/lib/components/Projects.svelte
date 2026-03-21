<script lang="ts">
	import ProjectCard from '$lib/components/project/Card.svelte';

	type Project = {
		title: string;
		description: string;
		href?: string;
		tags: string[];
	};

	export let projects: Project[] = [
		{
			title: 'IoT health check Dashboard for proactive device diagnosis',
			description:
				'Producing report of device health for over 10,000 deployed devices and automating proactive anomaly detection to prevent device failure.',
			href: 'https://github.com',
			tags: ['Python', 'Google Cloud API', 'SQLite3']
		},
		{
			title: 'Pixel Reef Portfolio',
			description: 'Animated reef-scape UI with a crisp, readable layout and fast loads.',
			tags: ['SvelteKit', 'UI', 'Design']
		}
	];
</script>

<section
	id="projects"
	class="reef h-screen scroll-mt-24 px-6 py-24 text-white"
	aria-label="Projects"
>
	<div class="mx-auto max-w-6xl">
		<div class="mb-10 flex flex-col gap-3">
			<h2 class="font-[pixelmix] text-4xl font-bold tracking-wide">Projects</h2>
			<p class="max-w-2xl opacity-80">
				A few things I've built—some security-flavored, some dev-heavy, all with a little
				pixel-ocean energy.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as p (p.title)}
				<ProjectCard {...p} />
			{/each}
		</div>
	</div>
</section>
