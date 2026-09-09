<script>
	import { geekbullMeta, geekbullShots } from '$data/geekbull.js';
	import Container from '$components/Container.svelte';
	import ShotGallery from '$components/ShotGallery.svelte';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
</script>

<svelte:head>
	<title>{geekbullMeta.company} — Gangadevi</title>
	<meta name="description" content={geekbullMeta.summary} />
</svelte:head>

<div class="page">
	<Container>
		<a class="back" href="/#work" use:cursorLabel={'All work'}>← All work</a>

		<header class="head" use:reveal>
			<h1>{geekbullMeta.company}</h1>
			<p class="role">{geekbullMeta.role} · {geekbullMeta.period}</p>
			<p class="summary">{geekbullMeta.summary}</p>
		</header>

		<!-- wide product screenshots: one per row, so the UI stays legible -->
		<ShotGallery items={geekbullShots} cell={900} cols={1} ratio="2048 / 1349" />
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
