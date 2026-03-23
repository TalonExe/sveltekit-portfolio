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
			tags: ['Python', 'Google Cloud API', 'SQLite3']
		},
		{
			title: 'Automated Penetration test Report generator',
			description:
				'An app designed to streamline Penetration test reporting processes in the most seamless and hands-off way possible.',
			tags: ['Python']
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
				Some of the things i have built, for now it is mostly full of hackathon and my internship
				related projects so I won't be releasing the source code.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as p (p.title)}
				<ProjectCard {...p} />
			{/each}
		</div>
	</div>
</section>
