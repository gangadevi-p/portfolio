<script>
	import Container from '$components/Container.svelte';
	import ParallaxImage from '$components/ParallaxImage.svelte';
	import { pointer } from '$motion/pointer.svelte.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { reveal } from '$motion/reveal.js';

	let { data } = $props();
	const item = $derived(data.item);
</script>

<svelte:head>
	<title>{item.title} — Gangadevi</title>
</svelte:head>

<article class="case" use:pointer.track>
	<Container>
		<a class="back" href="/#work">← All work</a>

		<header class="head" use:reveal>
			<h1>{item.title}</h1>
			<p class="line"><span>{item.role}</span><span>{item.year}</span></p>
			<p class="summary">{item.summary}</p>
			<ul class="tags">
				{#each item.tags as tag}<li>{tag}</li>{/each}
			</ul>
		</header>
	</Container>

	<div class="hero-img" use:reveal use:cursorLabel={item.title}>
		<ParallaxImage src={item.cover} alt={item.title} grayscale={false} depth={-0.04} />
	</div>

	<Container>
		<div class="body" use:reveal>
			<p>
				This is placeholder case-study copy. Drop in the problem, your process, the
				explorations that didn't make it, and the outcome. Add more
				<code>&lt;ParallaxImage&gt;</code> blocks between paragraphs for the visuals.
			</p>
			<p>
				Everything on this page is driven by <code>src/lib/data/work.js</code> — add a
				matching entry and the route builds itself.
			</p>
		</div>
	</Container>
</article>

<style>
	.case {
		padding-top: clamp(2rem, 6vw, 4rem);
	}
	.back {
		display: inline-block;
		margin-bottom: 2rem;
		font-weight: 600;
	}
	.head h1 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2.5rem, 8vw, 6rem);
		line-height: 0.95;
	}
	.line {
		display: flex;
		gap: 1.5rem;
		margin-top: 1rem;
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
	}
	.summary {
		margin-top: 1rem;
		font-size: var(--fs-lead);
		max-width: 34ch;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin-top: 1.5rem;
	}
	.tags li {
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.25rem 0.6rem;
		border: 1px solid var(--c-line);
		border-radius: 999px;
	}
	.hero-img {
		max-width: var(--maxw);
		margin: clamp(2rem, 6vw, 4rem) auto;
		padding-inline: var(--pad-x);
	}
	.hero-img :global(.clip) {
		border-radius: var(--radius-card);
		border: 1.5px solid var(--c-ink);
	}
	.body {
		max-width: 60ch;
		display: grid;
		gap: 1.25rem;
		font-size: 1.05rem;
	}
	.body code {
		font-size: 0.9em;
		background: var(--c-surface);
		padding: 0.1em 0.35em;
		border-radius: 4px;
	}
</style>
