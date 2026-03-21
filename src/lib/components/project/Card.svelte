<script lang="ts">
	import ExternalIcon from './ExternalIcon.svelte';
	import LockIcon from './LockIcon.svelte';

	export let title: string;
	export let description: string;
	export let href: string | undefined = undefined;
	export let tags: string[] = [];
</script>

<article class="reef-card">
	<div class="reef-card__top">
		<div class="flex justify-between">
			<h3 class="font-[pixelmix] text-xl tracking-wide">{title}</h3>
			{#if href}
				<a
					{href}
					target="_blank"
					rel="noopener noreferrer"
					class="ml-2 shrink-0 opacity-60 transition-opacity hover:opacity-100"
					title="Open external link"
				>
					<ExternalIcon />
				</a>
			{:else}
				<span class="ml-2 shrink-0 opacity-40" title="Internal project">
					<LockIcon />
				</span>
			{/if}
		</div>
		<p class="mt-3 font-[Helvetica] text-sm leading-relaxed opacity-80">{description}</p>
	</div>

	<div class="mt-5 flex flex-wrap gap-2">
		{#each tags as tag (tag)}
			<span class="reef-tag">{tag}</span>
		{/each}
	</div>
</article>
