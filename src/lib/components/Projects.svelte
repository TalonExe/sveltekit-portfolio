<script lang="ts">
	import ProjectCard from '$lib/components/project/Card.svelte';
	import cwesCert from '$lib/assets/certificate/HTB Certified Web Exploitation Specialist - certificate.pdf';

	type Project = {
		title: string;
		description: string;
		href?: string;
		tags: string[];
	};

	type Certification = {
		name: string;
		issuer: string;
		date: string;
		badgeUrl: string;
		certUrl?: string;
		color: string;
	};

	export let projects: Project[] = [
		{
			title: 'IoT health check Dashboard for proactive device diagnosis',
			description:
				'Producing report of device health for over 10,000 deployed devices and automating proactive anomaly detection to prevent device failure.',
			tags: ['Python', 'Google Cloud API', 'SQLite3']
		},
		{
			title: 'Automated Penetration test Report generator',
			description:
				'An app designed to streamline Penetration test reporting processes in the most seamless and hands-off way possible.',
			tags: ['Python']
		}
	];

	const certifications: Certification[] = [
		{
			name: 'Certified Web Exploitation Specialist',
			issuer: 'Hack The Box',
			date: '2025',
			badgeUrl:
				'https://academy.hackthebox.com/storage/badges/ae46a491c837f0765dc1972f7d61e9ca/logo.png', // replace with your actual badge image path
			certUrl: cwesCert, // replace with your actual cert image path or URL
			color: '#9fef00' // HTB green
		}
	];
</script>

<section id="projects" class="reef scroll-mt-24 px-6 py-24 text-white" aria-label="Projects">
	<div class="mx-auto max-w-6xl">
		<!-- Projects -->
		<div class="mb-10 flex flex-col gap-3">
			<p class="eyebrow">// built things</p>
			<h2 class="font-[pixelmix] text-4xl font-bold tracking-wide">Projects</h2>
			<p class="max-w-2xl text-sm leading-relaxed opacity-70">
				Some of the things I have built — mostly hackathon and internship projects, so source code
				won't be released.
			</p>
		</div>

		<div class="grid gap-6">
			{#each projects as p (p.title)}
				<ProjectCard {...p} />
			{/each}
		</div>

		<!-- Certifications -->
		<div id="certifications" class="cert-section">
			<div class="mb-8 flex flex-col gap-3 text-left">
				<p class="eyebrow justify-start">//certified</p>
				<h2 class="font-[pixelmix] text-4xl font-bold tracking-wide">Certifications</h2>
			</div>

			<div class="cert-grid">
				{#each certifications as cert}
					<div class="cert-card" style="--cert-color: {cert.color}">
						<!-- Badge -->
						<div class="badge-wrap">
							<img src={cert.badgeUrl} alt="{cert.name} badge" class="badge-img" />
						</div>

						<!-- Info -->
						<div class="cert-info">
							<p class="cert-issuer">{cert.issuer}</p>
							<h3 class="cert-name">{cert.name}</h3>
							<p class="cert-date">{cert.date}</p>

							{#if cert.certUrl}
								<a href={cert.certUrl} target="_blank" rel="noopener noreferrer" class="cert-link">
									View certificate
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M15 3h6v6" /><path d="M10 14L21 3" />
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
									</svg>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.eyebrow {
		display: flex;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.25em;
		color: rgb(220, 38, 38);
		opacity: 0.8;
	}

	/* ── Certifications ── */
	.cert-section {
		margin-top: 5rem;
		padding-top: 3rem;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
	}

	.cert-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.cert-card {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1.4rem 1.5rem;
		background: rgba(8, 8, 8, 0.45);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		position: relative;
		overflow: hidden;
		transition:
			border-color 0.2s,
			transform 0.2s;
	}

	.cert-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--cert-color) 8%, transparent) 0%,
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.cert-card:hover {
		border-color: color-mix(in srgb, var(--cert-color) 60%, transparent);
		transform: translateY(-3px);
	}

	.cert-card:hover::before {
		opacity: 1;
	}

	.badge-wrap {
		flex-shrink: 0;
		width: 72px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.badge-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 0 8px color-mix(in srgb, var(--cert-color) 40%, transparent));
		transition: filter 0.3s;
	}

	.cert-card:hover .badge-img {
		filter: drop-shadow(0 0 14px color-mix(in srgb, var(--cert-color) 70%, transparent));
	}

	.cert-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}

	.cert-issuer {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: color-mix(in srgb, var(--cert-color) 80%, white);
		opacity: 0.8;
		margin: 0;
	}

	.cert-name {
		font-size: 0.95rem;
		font-weight: 700;
		color: white;
		line-height: 1.3;
		margin: 0;
	}

	.cert-date {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin: 0;
	}

	.cert-link {
		margin-top: 0.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--cert-color) 85%, white);
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--cert-color) 30%, transparent);
		text-underline-offset: 3px;
		transition:
			color 0.2s,
			text-decoration-color 0.2s;
	}

	.cert-link:hover {
		color: var(--cert-color);
		text-decoration-color: color-mix(in srgb, var(--cert-color) 70%, transparent);
	}

	.cert-link svg {
		transition: transform 0.2s;
	}

	.cert-link:hover svg {
		transform: translate(2px, -2px);
	}
</style>
