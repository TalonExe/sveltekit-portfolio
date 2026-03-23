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
	<!-- Back link -->
	<a class="back" href="/blog">← Back to all posts</a>

	<!-- Header block -->
	<header class="post-header">
		<p class="eyebrow">// lab notes</p>
		<h1 class="font-[pixelmix]">{metadata.title}</h1>
		<p class="lead">{metadata.description}</p>

		<div class="post-meta">
			<span class="date">{formattedDate}</span>
			{#if metadata.minutesToRead}
				<span class="meta-sep">·</span>
				<span class="reading-time">{metadata.minutesToRead} min read</span>
			{/if}
		</div>

		{#if metadata.tags?.length}
			<ul class="tags">
				{#each metadata.tags as tag}
					<li>{tag}</li>
				{/each}
			</ul>
		{/if}

		<div class="header-rule"></div>
	</header>

	<!-- Body -->
	<div class="content">
		<Content />
	</div>
</article>

<style>
	/* ── Layout ── */
	.post {
		max-width: 780px;
		margin: 0 auto;
		padding: 5rem clamp(1rem, 5vw, 3rem) 5rem;
		display: flex;
		flex-direction: column;
		gap: 0;
		color: white;
	}

	/* ── Back link ── */
	.back {
		font-size: 0.78rem;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: rgba(220, 38, 38, 0.75);
		margin-bottom: 2.5rem;
		display: inline-block;
		transition: color 0.2s;
	}
	.back:hover {
		color: rgb(220, 38, 38);
	}

	/* ── Header ── */
	.post-header {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin-bottom: 2.5rem;
	}

	.eyebrow {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.25em;
		color: rgb(220, 38, 38);
		opacity: 0.8;
		margin: 0;
	}

	.post-header h1 {
		font-size: clamp(2rem, 6vw, 3.2rem);
		font-weight: 700;
		color: white;
		line-height: 1.15;
		margin: 0;
	}

	.lead {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.55);
		line-height: 1.65;
		max-width: 60ch;
		margin: 0;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.3);
	}

	.meta-sep {
		opacity: 0.4;
	}

	.tags {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding: 0;
		margin: 0;
	}

	.tags li {
		font-size: 0.68rem;
		border: 1px solid rgba(220, 38, 38, 0.3);
		color: rgba(220, 38, 38, 0.8);
		padding: 0.15rem 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.header-rule {
		width: 3rem;
		height: 2px;
		background: rgb(220, 38, 38);
		margin-top: 0.25rem;
	}

	/* ── Content ── */
	.content {
		line-height: 1.8;
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.75);
	}

	:global(.content h2) {
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin-top: 2.5rem;
		margin-bottom: 0.75rem;
		padding-left: 0.75rem;
		border-left: 2px solid rgb(220, 38, 38);
	}

	:global(.content h3) {
		font-size: 1.15rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.9);
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}

	:global(.content p) {
		margin-bottom: 1.25rem;
	}

	:global(.content a) {
		color: rgba(220, 38, 38, 0.85);
		text-decoration: underline;
		text-decoration-color: rgba(220, 38, 38, 0.3);
		text-underline-offset: 3px;
		transition:
			color 0.2s,
			text-decoration-color 0.2s;
	}

	:global(.content a:hover) {
		color: rgb(220, 38, 38);
		text-decoration-color: rgba(220, 38, 38, 0.7);
	}

	:global(.content ul),
	:global(.content ol) {
		margin-left: 1.25rem;
		margin-bottom: 1.25rem;
	}

	:global(.content li) {
		margin-bottom: 0.4rem;
	}

	:global(.content blockquote) {
		border-left: 2px solid rgba(220, 38, 38, 0.5);
		margin: 1.5rem 0;
		padding: 0.75rem 1.25rem;
		background: rgba(220, 38, 38, 0.05);
		color: rgba(255, 255, 255, 0.6);
		font-style: italic;
	}

	:global(.content code) {
		background: rgba(220, 38, 38, 0.1);
		border: 1px solid rgba(220, 38, 38, 0.2);
		padding: 0.1em 0.4em;
		font-size: 0.88rem;
		color: rgba(255, 255, 255, 0.8);
	}

	:global(.content pre) {
		background: rgba(7, 7, 12, 0.85);
		padding: 1.25rem 1.5rem;
		overflow-x: auto;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-left: 2px solid rgba(220, 38, 38, 0.4);
		margin: 1.5rem 0;
	}

	:global(.content pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.75);
	}

	:global(.content hr) {
		border: none;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		margin: 2.5rem 0;
	}
</style>
