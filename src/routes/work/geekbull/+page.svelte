<script>
	import { geekbullMeta, geekbullShots } from '$data/geekbull.js';
	import Container from '$components/Container.svelte';
	import ShotGallery from '$components/ShotGallery.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<svelte:head>
	<title>{geekbullMeta.company} — Gangadevi</title>
	<meta name="description" content={geekbullMeta.summary} />
</svelte:head>

<div class="page">
	<Container>
		<a class="back" href="/#work">← All work</a>

		<header class="head" use:reveal>
			<h1>{geekbullMeta.company}</h1>
			<div class="role-row">
				<p class="role">{geekbullMeta.role}</p>
				<p class="period">{geekbullMeta.period}</p>
			</div>
			<div class="what-i-did">
				<p class="summary">{geekbullMeta.summary}</p>
			</div>
		</header>

		<!-- wide product screenshots: one per row, so the UI stays legible -->
		<ShotGallery items={geekbullShots} cell={900} cols={1} ratio="2048 / 1349" />
	</Container>
</div>

<style>
	.page {
		padding: clamp(2rem, 6vw, 4.5rem) 0 0;
	}

	.back {
		display: inline-block;
		font-weight: 600;
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
		margin-bottom: clamp(1.25rem, 3vw, 2rem);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.back:hover,
	.back:focus-visible {
		color: var(--c-ink);
		outline: none;
	}

	.head {
		margin-bottom: clamp(2.5rem, 7vw, 4rem);
	}
	.head h1 {
		font-size: clamp(1.9rem, 5vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		/* Case studies stay on the light palette; use the ink token so the
		   heading is always dark and readable. */
		color: var(--c-ink);
	}
	.role {
		font-size: calc(1rem + 4px);
		font-weight: 700;
		color: var(--c-ink);
	}
	.role-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1rem;
	}
	.period {
		margin: 0;
		color: #48484d;
		font-size: var(--fs-small);
		font-weight: 600;
		white-space: nowrap;
	}
	.what-i-did {
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
	}
	.summary {
		margin-top: 1rem;
		font-size: var(--fs-lead);
		color: #48484d;
		max-width: none;
	}
	@media (max-width: 480px) {
		.role-row {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.35rem;
		}
	}
</style>
