<script>
	import { Spring } from 'svelte/motion';

	let hovering = $state(false);

	let coords1 = new Spring({ x: 0, y: 0 }, { stiffness: 0.05, damping: 0.25 });
	let coords2 = new Spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.35 });
	let size = new Spring(10);

	// Svelte action — attach hover listeners to any element
	function linkHover(node) {
		const enter = () => (hovering = true);
		const leave = () => (hovering = false);
		node.addEventListener('mouseenter', enter);
		node.addEventListener('mouseleave', leave);
		return {
			destroy() {
				node.removeEventListener('mouseenter', enter);
				node.removeEventListener('mouseleave', leave);
			}
		};
	}

	// Auto-attach to all links and buttons on mount
	import { onMount } from 'svelte';
	onMount(() => {
		const targets = document.querySelectorAll('a, button');
		const cleanups = [...targets].map((el) => linkHover(el));
		return () => cleanups.forEach((c) => c.destroy());
	});
</script>

<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY });
		coords2.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(30)}
	on:mouseup={() => size.set(10)}
/>

<svg class="h-full w-full">
	{#if hovering}
		<!-- Diamond / pointer shape when over links -->
		<polygon
			points={`
		  ${coords1.current.x},${coords1.current.y - size.current * 2}
		  ${coords1.current.x + size.current * 1.4},${coords1.current.y}
		  ${coords1.current.x},${coords1.current.y + size.current * 2}
		  ${coords1.current.x - size.current * 1.4},${coords1.current.y}
		`}
			stroke="lightgray"
			stroke-width="3"
			fill-opacity="0"
		/>
	{:else}
		<circle
			cx={coords1.current.x}
			cy={coords1.current.y}
			r={size.current}
			stroke="lightgray"
			stroke-width="3"
			fill-opacity="0"
		/>
	{/if}

	<circle cx={coords2.current.x} cy={coords2.current.y} r={size.current / 4} fill="darkgray" />
</svg>

<style>
	:global(body) {
		cursor: none;
	}

	:global(a),
	:global(button) {
		cursor: none;
	}
	.w-full {
		width: 100vw;
	}
	.h-full {
		height: 100vh;
	}
	svg {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 9999;
	}
</style>
