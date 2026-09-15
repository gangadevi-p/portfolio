<script>
	import { admMeta, admPosters } from '$data/adm.js';
	import Container from '$components/Container.svelte';
	import ShotGallery from '$components/ShotGallery.svelte';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
</script>

<svelte:head>
	<title>{admMeta.company} — Gangadevi</title>
	<meta name="description" content={admMeta.summary} />
</svelte:head>

<div class="page">
	<Container>
		<a class="back" href="/#work" use:cursorLabel={'All work'}>← All work</a>

		<header class="head" use:reveal>
			<h1>{admMeta.company}</h1>
			<div class="role-row">
				<p class="role">{admMeta.role}</p>
				<p class="period">{admMeta.period}</p>
			</div>
		</header>

		<!-- regular grid: every poster is a 500px square -->
		<ShotGallery items={admPosters} cell={500} cols={2} ratio="1" />
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
		margin-bottom: clamp(2rem, 6vw, 3.5rem);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.back:hover,
	.back:focus-visible {
		color: #f7f5f0;
		outline: none;
	}

	.head {
		margin-bottom: clamp(2.5rem, 7vw, 4rem);
	}
	.head h1 {
		font-size: clamp(1.9rem, 5vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		/* These pages retain a dark canvas in either site theme. Keep the
		   company name explicit so it cannot inherit the home page's dark ink. */
		color: #f4f1ea;
	}
	:global(html:is(.dark, [data-theme='dark'])) .head h1 {
		color: #f5f5f7;
	}
	.role {
		font-size: calc(1rem + 4px);
		font-weight: 700;
		color: #f7f5f0;
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
		color: var(--c-ink-soft);
		font-size: var(--fs-small);
		font-weight: 600;
		white-space: nowrap;
	}
	@media (max-width: 480px) {
		.role-row {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.35rem;
		}
	}

</style>
