<script lang="ts">
	import { onMount } from 'svelte';

	const timeline = [
		{
			year: '2020',
			title: 'Shell Nxplorers — Sabah State Champion',
			org: 'Shell',
			description:
				'Built a multidirectional Arduino-based watering system with MIT App Inventor to boost water and time efficiency for local farmers.',
			type: 'award'
		},
		{
			year: '2021',
			title: 'Shell Nxplorers — National Champion',
			org: 'Shell',
			description:
				'Developed an affordable smart chicken feeder using Arduino, 3D-printed components and MIT App Inventor to minimise feed wastage.',
			type: 'award'
		},
		{
			year: '2022',
			title: 'Diploma in ICT — Data Informatics',
			org: 'Asia Pacific University (APU)',
			description: 'Started diploma studies, graduating with CGPA 3.84.',
			type: 'edu'
		},
		{
			year: '2024',
			title: 'Device Team Intern',
			org: 'Footfallcam',
			description:
				'Linux sysadmin, data pipeline automation with Python and Apps Script, UAT and networking under a Scrum environment.',
			type: 'work'
		},
		{
			year: '2024',
			title: 'rENTAS rawSEC CTF — Finalist',
			org: 'rawSEC',
			description: 'Reached the finals competing in web exploitation and security challenges.',
			type: 'ctf'
		},
		{
			year: '2025',
			title: 'Bachelor of CS (Cyber Security)',
			org: 'Asia Pacific University (APU)',
			description: 'Currently pursuing BSc (Hons), maintaining CGPA 3.84.',
			type: 'edu'
		},
		{
			year: '2025',
			title: 'Industrial Trainee — Penetration Tester',
			org: 'LE Global Services Sdn. Bhd.',
			description:
				'Reported critical findings from real pentests, built internal report automation tools, and conducted passive recon on live targets.',
			type: 'work'
		},
		{
			year: '2025',
			title: 'CyberNexus CTF — Top 5',
			org: 'CyberNexus',
			description:
				'Exploited RCE via Java sandbox escape, IDOR, and prompt injection. Cleared all Boot2Root challenges via SUID binary and writable cron escalation.',
			type: 'ctf'
		},
		{
			year: '2025',
			title: 'SunCTF — Top 20',
			org: 'SunCTF',
			description:
				'Web app exploitation and reverse engineering, including RCE via Terraform sandbox escape.',
			type: 'ctf'
		},
		{
			year: '2025',
			title: 'International Battle of Hackers — Top 11 (International)',
			org: 'IBOH',
			description:
				'Led team coordination across AI, Web, and Reverse Engineering categories in an international field.',
			type: 'ctf'
		}
	];

	const typeConfig: Record<string, { label: string; color: string }> = {
		award: { label: 'Award', color: '#f59e0b' },
		edu: { label: 'Education', color: '#60a5fa' },
		work: { label: 'Experience', color: '#34d399' },
		ctf: { label: 'CTF', color: '#dc2626' }
	};

	onMount(async () => {
		const { animate, stagger } = await import('animejs');
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					animate('.tl-item', {
						opacity: [0, 1],
						translateX: [-20, 0],
						delay: stagger(70),
						easing: 'easeOutQuart',
						duration: 450
					});
					observer.disconnect();
				}
			},
			{ threshold: 0.05 }
		);
		document.querySelectorAll('.tl-item').forEach((el) => observer.observe(el));
	});
</script>

<section
	id="achievements"
	class="achievements-section scroll-mt-24 bg-[#00040d] px-6 py-24 text-white"
>
	<div class="mx-auto max-w-6xl">
		<div class="section-header">
			<p class="eyebrow">// field record</p>
			<h2 class="font-[pixelmix] text-4xl font-bold tracking-wide">Achievements &amp; Timeline</h2>
			<p class="header-desc">
				A log of where I've been — competitions, roles, and milestones that shaped how I think about
				security.
			</p>
			<div class="header-rule"></div>
		</div>

		<!-- Legend -->
		<div class="legend">
			{#each Object.entries(typeConfig) as [key, cfg]}
				<span class="legend-item">
					<span class="legend-dot" style="background:{cfg.color}"></span>
					{cfg.label}
				</span>
			{/each}
		</div>

		<!-- Timeline -->
		<div class="timeline">
			<!-- Vertical spine -->
			<div class="spine"></div>

			{#each timeline as item, i}
				{@const cfg = typeConfig[item.type]}
				<div
					class="tl-item"
					style="opacity:0"
					class:tl-right={i % 2 === 0}
					class:tl-left={i % 2 !== 0}
				>
					<!-- Connector dot -->
					<div
						class="tl-dot"
						style="border-color:{cfg.color}; box-shadow: 0 0 10px {cfg.color}55"
					></div>

					<!-- Card -->
					<div class="tl-card" style="--card-color:{cfg.color}">
						<div class="tl-card-top">
							<span class="tl-year">{item.year}</span>
							<span class="tl-badge" style="color:{cfg.color}; border-color:{cfg.color}44"
								>{cfg.label}</span
							>
						</div>
						<p class="tl-org">{item.org}</p>
						<h3 class="tl-title">{item.title}</h3>
						<p class="tl-desc">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.achievements-section {
		border-top: 1px solid rgba(121, 119, 119, 0.06);
	}

	/* ── Header ── */
	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
	}

	.eyebrow {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.25em;
		color: rgb(220, 38, 38);
		opacity: 0.8;
	}

	.section-header h2 {
		margin: 0;
		color: white;
		line-height: 1.15;
	}

	.header-desc {
		max-width: 55ch;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.5);
		line-height: 1.65;
		margin: 0;
	}

	.header-rule {
		width: 3rem;
		height: 2px;
		background: rgb(220, 38, 38);
		margin-top: 0.25rem;
	}

	/* ── Legend ── */
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.45);
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	/* ── Timeline ── */
	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.spine {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		background: rgba(255, 255, 255, 0.08);
		transform: translateX(-50%);
	}

	.tl-item {
		display: grid;
		grid-template-columns: 1fr 28px 1fr;
		align-items: start;
		gap: 0;
		position: relative;
	}

	/* Dot sits in middle column */
	.tl-dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 2px solid;
		background: #0a0a0a;
		margin: 0 auto;
		margin-top: 1.1rem;
		position: relative;
		z-index: 1;
		flex-shrink: 0;
	}

	/* Right-side cards (even) */
	.tl-right .tl-card {
		grid-column: 3;
		grid-row: 1;
		margin-left: 1.25rem;
	}
	.tl-right .tl-dot {
		grid-column: 2;
		grid-row: 1;
	}
	.tl-right > :first-child:not(.tl-dot) {
		display: none;
	} /* hide left spacer */

	/* Left-side cards (odd) */
	.tl-left .tl-card {
		grid-column: 1;
		grid-row: 1;
		margin-right: 1.25rem;
		text-align: right;
	}
	.tl-left .tl-dot {
		grid-column: 2;
		grid-row: 1;
	}

	/* Card */
	.tl-card {
		padding: 1.1rem 1.25rem;
		background: rgba(8, 8, 8, 0.5);
		border: 1px solid rgba(187, 176, 176, 0.07);
		backdrop-filter: blur(6px);
		position: relative;
		overflow: hidden;
		transition:
			border-color 0.2s,
			transform 0.2s;
	}

	.tl-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--card-color) 8%, transparent),
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.tl-card:hover {
		border-color: color-mix(in srgb, var(--card-color) 50%, transparent);
		transform: translateY(-2px);
	}

	.tl-card:hover::before {
		opacity: 1;
	}

	.tl-card-top {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.3rem;
		flex-wrap: wrap;
	}

	.tl-left .tl-card-top {
		justify-content: flex-end;
	}

	.tl-year {
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.3);
	}

	.tl-badge {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		border: 1px solid;
		padding: 0.1rem 0.45rem;
	}

	.tl-org {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.35);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 0.25rem;
	}

	.tl-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: white;
		margin: 0 0 0.4rem;
		line-height: 1.3;
	}

	.tl-desc {
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.5);
		line-height: 1.55;
		margin: 0;
	}

	/* ── Mobile: single column ── */
	@media (max-width: 700px) {
		.spine {
			left: 12px;
			transform: none;
		}

		.tl-item {
			grid-template-columns: 28px 1fr;
			gap: 0;
		}

		.tl-dot {
			grid-column: 1;
			grid-row: 1;
			margin: 0;
			margin-top: 1rem;
		}

		.tl-right .tl-card,
		.tl-left .tl-card {
			grid-column: 2;
			grid-row: 1;
			margin-left: 1rem;
			margin-right: 0;
			text-align: left;
		}

		.tl-left .tl-card-top {
			justify-content: flex-start;
		}
	}
</style>
