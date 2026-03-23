<script lang="ts">
	import { onMount } from 'svelte';
	export let backgroundUrl: string = '';

	const techStack = [
		{ category: 'Languages', items: ['TypeScript/Javascript', 'Python', 'Bash', 'Java', 'Zig'] },
		{ category: 'Web', items: ['SvelteKit', 'Node.js', 'Tailwindcss', 'FastAPI'] },
		{ category: 'Security', items: ['Burp Suite', 'Nmap'] },
		{ category: 'Infra', items: ['Docker', 'Linux', 'Nginx', 'Git'] }
	];

	onMount(async () => {
		const { animate, stagger } = await import('animejs');
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length) {
					animate('.reef-card', {
						opacity: [0, 1],
						translateY: [20, 0],
						delay: stagger(90),
						easing: 'easeOutBack',
						duration: 500
					});
					observer.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		document.querySelectorAll('.reef-card').forEach((el) => observer.observe(el));
	});
</script>

<div
	class="hero-bg min-h-screen w-full"
	style={backgroundUrl ? `background-image: url("${backgroundUrl}")` : ''}
>
	<div class="content-panel hero-overlay min-h-screen w-full">
		<div class="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pt-20">
			<div class="hero-grid w-full rounded-2xl px-6 py-10">
				<!-- LEFT: Description -->
				<div class="flex flex-col justify-center space-y-5">
					<h1 class="font-[pixelmix] text-5xl leading-tight font-bold">
						Apa the heck<br />is this
					</h1>
					<p class="text-xl leading-relaxed opacity-70">
						Based in Malaysia, I am a
						<span class="font-bold text-red-400">Web Application Penetration Tester</span>
						that has worked in the
						<span class="underline underline-offset-2">IoT field</span>
						and a
						<span class="underline underline-offset-2">Cybersecurity firm</span>. With my
						experiences in
						<span>development and security</span>
						I am able to provide
						<span class="text-red-400">complete and professional solutions</span>
						that can solve problems and save costs.
						<a
							href="/resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="resume-link inline-flex items-center gap-1.5 self-start"
						>
							Here's my resume
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M15 3h6v6" />
								<path d="M10 14L21 3" />
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
							</svg>
						</a>
					</p>
					<div class="flex flex-wrap gap-3 pt-2">
						<a
							href="/blog"
							class="bg-blue-400 px-4 py-2 text-sm text-black transition-colors hover:bg-blue-600"
						>
							Read my blog
						</a>
						<a
							href="https://www.linkedin.com/in/havyn-liew"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							class="social-icon"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						</a>

						<a
							href="https://github.com/TalonExe"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							class="social-icon"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								/>
							</svg>
						</a>
						<a href="mailto:havyn@gmail.com" aria-label="Email" class="social-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="20" height="16" x="2" y="4" rx="2" />
								<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
							</svg>
						</a>
					</div>
				</div>

				<!-- RIGHT: Tech Stack -->
				<div class="tech-panel flex flex-col justify-center gap-4">
					<p class="tech-label text-xl tracking-widest uppercase opacity-50">// tech stack</p>
					{#each techStack as group}
						<div class="tech-group">
							<span class="text-lg tracking-wider text-red-400 uppercase opacity-80">
								{group.category}
							</span>
							<div class="mt-1.5 flex flex-wrap gap-2">
								{#each group.items as item}
									<span class="tech-tag text-lg">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
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
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	@media (max-width: 640px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
	}

	.tech-panel {
		border-left: 1px solid rgba(255, 255, 255, 0.12);
		padding-left: 2rem;
	}

	.tech-tag {
		padding: 0.2rem 0.6rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(4px);
		transition:
			border-color 0.2s,
			background 0.2s;
	}

	.tech-tag:hover {
		border-color: rgba(220, 38, 38, 0.6);
		background: rgba(220, 38, 38, 0.1);
	}

	.social-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		transition:
			border-color 0.2s,
			background 0.2s,
			color 0.2s;
	}

	.social-icon:hover {
		border-color: rgba(220, 38, 38, 0.6);
		background: rgba(220, 38, 38, 0.1);
		color: rgb(220, 38, 38);
	}

	.resume-link {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.5);
		text-decoration: underline;
		text-decoration-color: rgba(255, 255, 255, 0.2);
		text-underline-offset: 4px;
		transition:
			color 0.2s,
			text-decoration-color 0.2s;
	}

	.resume-link:hover {
		color: rgba(255, 255, 255, 0.9);
		text-decoration-color: rgba(220, 38, 38, 0.7);
	}

	.resume-link svg {
		flex-shrink: 0;
		transition: transform 0.2s;
	}

	.resume-link:hover svg {
		transform: translate(2px, -2px);
	}
</style>
