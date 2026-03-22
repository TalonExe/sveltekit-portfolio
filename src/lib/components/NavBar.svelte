<script>
	import routes from '$lib/NavRoutes';
</script>

<div class="fixed top-0 left-0 z-50 navbar w-full bg-transparent">
	<div class="flex-1">
		<!-- eslint-disable-next-line -->
		<a class="btn font-[Ka1] text-xl btn-ghost" href="/">HL.dev</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#each routes as route (route.href)}
				<li>
					<a href={route.href}>{route.name}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
