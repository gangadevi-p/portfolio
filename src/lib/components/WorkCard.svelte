<script>
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	/** A compact project overview: logo, name, description, and date. */
	let { item, index = 0 } = $props();

	let broken = $state(false);
	const internal = $derived(item.href?.startsWith('/'));
</script>

<svelte:element
	this={item.href ? 'a' : 'article'}
	class="card"
	class:lg={item.size === 'lg'}
	class:linked={Boolean(item.href)}
	href={item.href || undefined}
	target={item.href && !internal ? '_blank' : undefined}
	rel={item.href && !internal ? 'noreferrer' : undefined}
	use:reveal={{ delay: (index % 2) * 0.08 }}
	use:cursorLabel={{ label: 'Read case study', variant: 'view' }}
>
	<div class="visual" class:framed={item.framed}>
		{#if item.logo && !broken}
			<img src={item.logo} alt={item.title} loading="lazy" onerror={() => (broken = true)} />
		{:else}
			<span class="mono" aria-hidden="true">{item.title.charAt(0)}</span>
		{/if}
	</div>

	<div class="body">
		<h3>{item.title}</h3>
		<p class="blurb">{item.blurb}</p>

		<span class="period">
			<span>{item.period}</span>
			<svg class="ic" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 17 17 7M9 7h8v8"
				/>
			</svg>
		</span>
	</div>
</svelte:element>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: clamp(1.25rem, 2.5vw, 1.75rem);
		min-height: 280px;
		background: #fff;
		color: #241a16;
		text-decoration: none;
		border-radius: 20px;
		padding: clamp(1.35rem, 2.25vw, 1.75rem);
		box-shadow:
			0 1px 2px rgba(24, 33, 58, 0.04),
			0 18px 48px -22px rgba(24, 33, 58, 0.22);
	}
	/* Project logo */
	.visual {
		flex: none;
		align-self: flex-start;
		width: clamp(68px, 24%, 88px);
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		border-radius: 18px;
	}
	.visual img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.visual.framed {
		background: #fff;
		border: 1px solid #f0ddd0;
		box-shadow: 0 14px 32px -16px rgba(255, 106, 61, 0.4);
		padding: clamp(0.75rem, 2vw, 1.25rem);
	}
	.mono {
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 7vw, 3.5rem);
		color: #c8c2bb;
	}

	/* Project details */
	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}
	h3 {
		font-size: clamp(1.2rem, 1.75vw, 1.45rem);
		font-weight: 800;
		letter-spacing: -0.01em;
	}
	.blurb {
		margin-top: 0.6rem;
		max-width: 26ch;
		color: #8a8480;
		font-size: clamp(0.92rem, 1.25vw, 1rem);
		line-height: 1.45;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	/* date pill — pushed to the bottom of the card */
	.period {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		background: #fff;
		color: #2a2a2a;
		font-size: var(--fs-small);
		padding: 0.62rem 1.15rem;
		border-radius: 999px;
		box-shadow: 0 2px 8px rgba(28, 28, 28, 0.08);
		white-space: nowrap;
	}
	.period > span:first-child {
		color: inherit;
	}
	.period .ic {
		flex: none;
		color: inherit;
	}
	.card.linked {
		transition:
			transform var(--dur-fast) var(--ease-out),
			background var(--dur-fast) var(--ease-out);
	}
	.card.linked:hover {
		transform: translateY(-2px);
	}

</style>
