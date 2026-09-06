<script>
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	/** One white project card: logo on the left, text + date pill on the right. */
	let { item, index = 0 } = $props();

	let broken = $state(false);
	const internal = $derived(item.href?.startsWith('/'));
</script>

<article class="card" class:lg={item.size === 'lg'} use:reveal={{ delay: (index % 2) * 0.08 }}>
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

		{#if item.href}
			<a
				class="period"
				href={item.href}
				target={internal ? undefined : '_blank'}
				rel={internal ? undefined : 'noreferrer'}
				use:cursorLabel={{ label: item.title, variant: internal ? 'view' : 'link' }}
			>
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
			</a>
		{:else}
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
		{/if}
	</div>
</article>

<style>
	.card {
		display: flex;
		gap: clamp(1.25rem, 3.5vw, 2.5rem);
		min-height: clamp(200px, 25vw, 244px);
		background: #fff;
		color: #241a16;
		border-radius: 20px;
		padding: clamp(1.5rem, 3.5vw, 2.25rem);
		box-shadow:
			0 1px 2px rgba(24, 33, 58, 0.04),
			0 18px 48px -22px rgba(24, 33, 58, 0.22);
	}
	/* taller bento tile */
	.card.lg {
		min-height: clamp(280px, 35vw, 340px);
	}

	/* left visual */
	.visual {
		flex: none;
		align-self: flex-start;
		width: clamp(110px, 30%, 190px);
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

	/* right column */
	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}
	h3 {
		font-size: clamp(1.25rem, 2.8vw, 1.6rem);
		font-weight: 800;
		letter-spacing: -0.01em;
	}
	.blurb {
		margin-top: 0.5rem;
		max-width: 24ch;
		color: #8a8480;
		font-size: clamp(0.95rem, 1.7vw, 1.05rem);
		line-height: 1.45;
	}

	/* date pill — pushed to the bottom of the card */
	.period {
		margin-top: auto;
		padding-top: clamp(1.25rem, 3.5vw, 2.25rem);
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		font-size: var(--fs-small);
		white-space: nowrap;
	}
	.period > span:first-child {
		background: #eef0f4;
		color: #2a2a2a;
		padding: 0.62rem 1.15rem;
		border-radius: 999px;
	}
	.period .ic {
		flex: none;
		width: 26px;
		height: 26px;
		padding: 6px;
		border-radius: 999px;
		border: 1.5px solid rgba(42, 42, 42, 0.22);
		color: #2a2a2a;
	}
	a.period {
		transition: transform var(--dur-fast) var(--ease-out);
	}
	a.period:hover {
		transform: translateY(-2px);
	}
	a.period:hover .ic {
		border-color: var(--c-accent);
		color: var(--c-accent);
	}

	@media (max-width: 900px) {
		.card {
			gap: 1.25rem;
		}
	}
	@media (max-width: 480px) {
		.card {
			flex-direction: column;
		}
		.visual {
			width: clamp(110px, 42%, 170px);
		}
		.period {
			padding-top: 1.25rem;
		}
	}
</style>
