<script lang="ts">
	import { onMount } from 'svelte';

	export let backgroundUrl: string = '';
	onMount(async () => {
    const { animate, stagger } = await import('animejs');

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length) {
        animate('.reef-card', {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(90),
          easing: 'easeOutBack',
          duration: 500,
        });
        observer.disconnect(); // fire once
      }
    }, { threshold: 0.15 });

    document.querySelectorAll('.reef-card').forEach(el => observer.observe(el));
  });
</script>

<div
	class="hero-bg min-h-screen w-full"
	style={backgroundUrl ? `background-image: url("${backgroundUrl}")` : ''}
>
	<div class="content-panel hero-overlay min-h-screen w-full">
		<div class="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 pt-20 text-center">
			<div class=" w-full space-y-4 rounded-2xl px-6 py-8">
				<h1 class="text-5xl font-[pixelmix] font-bold">Apa the heck</h1>
				<p class="opacity-70">Based in Malaysia, I am a Web Application Penetration Tester that has worked in the IOT field and a Cybersecurity firm. With my experiences in development and security I am able to provide complete and professional solutions that can solve problems and save costs.</p>
				<div class="mt-10 flex flex-wrap justify-center gap-4">
					<a href="#projects" class="bg-black p-2">Read my blog</a>
					<a href="/blog" class="bg-red-600 p-2">Contact Me</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-bg {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.hero-overlay {
		background: rgba(0, 0, 0, 0.35);
	}

	.content-panel {
		color: white;
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
</style>