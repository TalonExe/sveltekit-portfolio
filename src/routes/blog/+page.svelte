<script lang="ts">
	import type { PageData } from './$types';

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
</script>

<svelte:head>
	<title>Blog | Offensive Security Notes</title>
	<meta
		name="description"
		content="CTF walkthroughs, penetration testing methodology, and learning notes."
	/>
</svelte:head>

<section class="blog">
	<header>
		<p class="eyebrow">Lab Notes</p>
		<h1>Thoughts from the field</h1>
		<p>
			I write about CTF tactics, penetration testing methodology, and what I am learning
			as a cybersecurity student. Every post is written in mdsvex—drop a new <code>.svx</code>
			file into <code>src/posts</code> and it will show up here automatically.
		</p>
	</header>

	{#if posts.length === 0}
		<p class="empty">No posts yet. Check back soon!</p>
	{:else}
		<ul class="post-list">
			{#each posts as post}
				<li>
					<a href={`/blog/${post.slug}`}>
						<p class="date">{formatDate(post.metadata.date)}</p>
						<h2>{post.metadata.title}</h2>
						<p class="description">{post.metadata.description}</p>

						{#if post.metadata.tags?.length}
							<ul class="tags">
								{#each post.metadata.tags as tag}
									<li>{tag}</li>
								{/each}
							</ul>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.blog {
		padding: 3rem clamp(1rem, 5vw, 4rem);
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.eyebrow {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--accent, #5ae9ff);
		margin-bottom: 0.5rem;
	}

	header h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: 0.5rem;
	}

	header p {
		max-width: 65ch;
		line-height: 1.6;
	}

	.empty {
		font-style: italic;
		color: #888;
	}

	.post-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.5rem;
	}

	.post-list li {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
		transition: border-color 0.2s ease, transform 0.2s ease;
		background: rgba(8, 8, 8, 0.4);
	}

	.post-list li:hover {
		border-color: var(--accent, #5ae9ff);
		transform: translateY(-2px);
	}

	.post-list a {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.date {
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #a0a0a0;
	}

	.description {
		color: #ccc;
		line-height: 1.5;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0.5rem 0 0;
	}

	.tags li {
		font-size: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0.2rem 0.75rem;
		border-radius: 999px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>

