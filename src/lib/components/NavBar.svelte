<script>
	import routes from '$lib/NavRoutes';
	import Hamburger from './Hamburger.svelte';

	let open = $state(false);
</script>

<div class="navbar fixed top-0 left-0 z-50 w-full bg-transparent">
	<div class="flex-1">
		<!-- eslint-disable-next-line -->
		<a class="btn font-[Ka1] text-xl btn-ghost" href="/">HL.dev</a>
	</div>
	<div class="hidden flex-none md:flex">
		<ul class="menu menu-horizontal px-1">
			{#each routes as route (route.href)}
				<li>
					<a href={route.href}>{route.name}</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="md:hidden">
		<Hamburger
			onclick={() => {
				open = !open;
			}}
		/>
	</div>
</div>

{#if open}
	<div class="fixed top-16 left-0 z-40 w-full bg-base-100 md:hidden">
		<ul class="menu p-4">
			{#each routes as route (route.href)}
				<li>
					<a href={route.href} onclick={() => (open = false)}>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
