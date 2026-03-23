<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	let { data } = $props();
	const { posts } = data satisfies PageData;

	const formatDate = (value: string) => {
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return value;
		return parsed.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	// Distribute posts into columns for masonry
	const COLS = 3;
	let columns: (typeof posts)[] = Array.from({ length: COLS }, () => []);
	posts.forEach((post, i) => columns[i % COLS].push(post));

	onMount(async () => {
		const { animate, stagger } = await import('animejs');
		animate('.post-card', {
			opacity: [0, 1],
			translateY: [24, 0],
			delay: stagger(80),
			easing: 'easeOutBack',
			duration: 500
		});
	});
</script>

<svelte:head>
	<title>Blog | Offensive Security Notes</title>
	<meta
		name="description"
		content="CTF walkthroughs, penetration testing methodology, and learning notes."
	/>
</svelte:head>

<section class="blog">
	<header class="blog-header">
		<p class="eyebrow">// lab notes</p>
		<h1 class="font-[pixelmix]">Thoughts from<br />the field</h1>
		<p class="header-desc">
			CTF tactics, penetration testing methodology, and what I'm learning as a cybersecurity
			practitioner. Drop a <code>.svx</code> into <code>src/posts</code> and it appears here automatically.
		</p>
		<div class="header-rule"></div>
	</header>

	{#if posts.length === 0}
		<p class="empty">No posts yet. Check back soon.</p>
	{:else}
		<!-- Desktop: masonry columns -->
		<div class="masonry-grid">
			{#each columns as col}
				<div class="masonry-col">
					{#each col as post}
						<a href={`/blog/${post.slug}`} class="post-card" style="opacity:0">
							<div class="card-inner">
								<p class="card-date">{formatDate(post.metadata.date)}</p>
								<h2 class="card-title">{post.metadata.title}</h2>
								<p class="card-desc">{post.metadata.description}</p>
								{#if post.metadata.tags?.length}
									<ul class="card-tags">
										{#each post.metadata.tags as tag}
											<li>{tag}</li>
										{/each}
									</ul>
								{/if}
								<span class="card-arrow" aria-hidden="true">→</span>
							</div>
						</a>
					{/each}
				</div>
			{/each}
		</div>

		<!-- Mobile: single column list -->
		<ul class="mobile-list">
			{#each posts as post}
				<li>
					<a href={`/blog/${post.slug}`} class="post-card" style="opacity:0">
						<div class="card-inner">
							<p class="card-date">{formatDate(post.metadata.date)}</p>
							<h2 class="card-title">{post.metadata.title}</h2>
							<p class="card-desc">{post.metadata.description}</p>
							{#if post.metadata.tags?.length}
								<ul class="card-tags">
									{#each post.metadata.tags as tag}
										<li>{tag}</li>
									{/each}
								</ul>
							{/if}
							<span class="card-arrow" aria-hidden="true">→</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	/* ── Layout ── */
	.blog {
		padding: 5rem clamp(1rem, 5vw, 3rem) 4rem;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	/* ── Header ── */
	.blog-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.eyebrow {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.25em;
		color: rgb(220, 38, 38);
		opacity: 0.8;
	}

	.blog-header h1 {
		font-size: clamp(2.2rem, 5vw, 3.5rem);
		font-weight: 700;
		color: white;
		line-height: 1.15;
		margin: 0;
	}

	.header-desc {
		max-width: 55ch;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.95rem;
	}

	.header-desc code {
		background: rgba(220, 38, 38, 0.15);
		border: 1px solid rgba(220, 38, 38, 0.3);
		padding: 0.1em 0.4em;
		font-size: 0.85em;
		color: rgba(255, 255, 255, 0.75);
	}

	.header-rule {
		width: 3rem;
		height: 2px;
		background: rgb(220, 38, 38);
		margin-top: 0.5rem;
	}

	/* ── Masonry (desktop) ── */
	.masonry-grid {
		display: none;
	}

	@media (min-width: 768px) {
		.masonry-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1.25rem;
			align-items: start;
		}
		.mobile-list {
			display: none !important;
		}
	}

	.masonry-col {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	/* ── Mobile list ── */
	.mobile-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* ── Card shared ── */
	.post-card {
		display: block;
		text-decoration: none;
		color: inherit;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(8, 8, 8, 0.45);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition:
			border-color 0.2s,
			transform 0.2s,
			background 0.2s;
		position: relative;
		overflow: hidden;
	}

	.post-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, transparent 60%);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.post-card:hover {
		border-color: rgba(220, 38, 38, 0.5);
		transform: translateY(-3px);
		background: rgba(15, 8, 8, 0.6);
	}

	.post-card:hover::before {
		opacity: 1;
	}

	.card-inner {
		padding: 1.4rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card-date {
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
	}

	.card-title {
		font-size: 1.05rem;
		font-weight: 700;
		color: white;
		line-height: 1.35;
		margin: 0;
	}

	.card-desc {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.55);
		line-height: 1.55;
		margin: 0.25rem 0 0;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		padding: 0;
		margin: 0.5rem 0 0;
	}

	.card-tags li {
		font-size: 0.68rem;
		border: 1px solid rgba(220, 38, 38, 0.3);
		color: rgba(220, 38, 38, 0.8);
		padding: 0.15rem 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.card-arrow {
		display: block;
		margin-top: 1rem;
		font-size: 1rem;
		color: rgba(220, 38, 38, 0.5);
		transition:
			transform 0.2s,
			color 0.2s;
	}

	.post-card:hover .card-arrow {
		transform: translateX(4px);
		color: rgb(220, 38, 38);
	}

	/* ── Empty state ── */
	.empty {
		font-style: italic;
		color: rgba(255, 255, 255, 0.3);
		font-size: 0.9rem;
	}
</style>
