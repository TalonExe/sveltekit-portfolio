<script lang="ts">
	import type { BlogMetadata } from '$lib';
	import { error } from '@sveltejs/kit';
	import type { ComponentType } from 'svelte';

	let { data } = $props();

	const postModules = import.meta.glob('../../../posts/*.svx', { eager: true });
	const lookupKey = Object.keys(postModules).find((path) => path.endsWith(`${data.slug}.svx`));

	if (!lookupKey) {
		throw error(404, `Post "${data.slug}" not found.`);
	}

	const module = postModules[lookupKey] as {
		default: ComponentType;
		metadata: BlogMetadata;
	};

	const Content = module.default;
	const metadata = data.metadata satisfies BlogMetadata;

	const publishedDate = new Date(metadata.date);
	const formattedDate = Number.isNaN(publishedDate.getTime())
		? metadata.date
		: publishedDate.toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
</script>

<svelte:head>
	<title>{metadata.title} | Blog</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<article class="post">
	<a class="back" href="/blog">← Back to all posts</a>
	<p class="date">{formattedDate}</p>
	<h1>{metadata.title}</h1>
	<p class="lead">{metadata.description}</p>

	{#if metadata.tags?.length}
		<ul class="tags">
			{#each metadata.tags as tag}
				<li>{tag}</li>
			{/each}
		</ul>
	{/if}

	{#if metadata.minutesToRead}
		<p class="reading-time">{metadata.minutesToRead} min read</p>
	{/if}

	<div class="content">
		<Content />
	</div>
</article>

<style>
	.post {
		max-width: 780px;
		margin: 0 auto;
		padding: 3rem clamp(1rem, 5vw, 4rem);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.back {
		font-size: 0.9rem;
		text-decoration: none;
		color: var(--accent, #5ae9ff);
		font-weight: 600;
	}

	.date {
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #9ea0a4;
	}

	h1 {
		font-size: clamp(2.2rem, 6vw, 3.5rem);
		margin: 0;
	}

	.lead {
		font-size: 1.1rem;
		color: #cfcfd2;
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	.tags {
		list-style: none;
		display: flex;
		gap: 0.6rem;
		padding: 0;
		margin: 0;
	}

	.tags li {
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		padding: 0.2rem 0.9rem;
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.reading-time {
		font-size: 0.9rem;
		color: #9ea0a4;
	}

	.content {
		margin-top: 1rem;
		line-height: 1.75;
	}

	:global(.content h2),
	:global(.content h3) {
		margin-top: 2rem;
		margin-bottom: 0.7rem;
	}

	:global(.content ul),
	:global(.content ol) {
		margin-left: 1.25rem;
	}

	:global(.content code) {
		background: rgba(255, 255, 255, 0.08);
		padding: 0.1rem 0.3rem;
		border-radius: 0.4rem;
		font-size: 0.95rem;
	}

	:global(.content pre) {
		background: rgba(7, 7, 12, 0.8);
		padding: 1rem;
		border-radius: 1rem;
		overflow-x: auto;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>

