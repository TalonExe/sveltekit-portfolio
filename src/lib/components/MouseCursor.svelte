<script>
	import { Spring } from 'svelte/motion';

	let coords1 = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let coords2 = new Spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.35
		}
	);

	let size = new Spring(10);

</script>

<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
	}}
	on:mousedown={() => {
		size.set(30);
	}}
	on:mouseup={() => {
		size.set(10);
	}}
/>

<svg
	class ="w-full h-full"
>
	<circle cx={coords1.current.x} cy={coords1.current.y} r={size.current.valueOf()} stroke="lightgray" stroke-width="3" fill-opacity="0"/>
	<circle cx={coords2.current.x} cy={coords2.current.y} r={size.current.valueOf()/4} fill="darkgray"/>
</svg>

<style>
	:global(body) {
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