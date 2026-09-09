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
			<p class="role">{admMeta.role} · {admMeta.period}</p>
			<p class="summary">{admMeta.summary}</p>
		</header>

		<!-- regular grid: every poster is a 500px square -->
		<ShotGallery items={admPosters} cell={500} cols={2} ratio="1" />
	</Container>
</div>

<style>
	.page {
		padding-block: clamp(2rem, 6vw, 4.5rem) clamp(4rem, 10vw, 8rem);
	}

	.back {
		display: inline-block;
		font-weight: 600;
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
		margin-bottom: clamp(2rem, 6vw, 3.5rem);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.back:hover {
		color: var(--c-ink);
	}

	.head {
		margin-bottom: clamp(2.5rem, 7vw, 4rem);
	}
	.head h1 {
		font-size: clamp(1.9rem, 5vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.02em;
	}
	.role {
		margin-top: 0.5rem;
		font-weight: 600;
		color: var(--c-accent);
	}
	.summary {
		margin-top: 1rem;
		font-size: var(--fs-lead);
		color: var(--c-ink-soft);
		max-width: 46ch;
	}

</style>
