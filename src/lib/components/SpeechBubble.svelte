<script>
	/** Taped note / speech card. Content comes from props so it stays reusable. */
	let { title, lines = [] } = $props();
</script>

<figure class="bubble">
	<span class="tape" aria-hidden="true"></span>
	{#if title}<h2>{title}</h2>{/if}
	{#each lines as line}
		<p>{line}</p>
	{/each}
</figure>

<style>
	.bubble {
		position: relative;
		padding: 1.1rem 1.25rem 1.25rem;
		background: var(--c-surface);
		border: 1.5px solid var(--c-ink);
		border-radius: var(--radius-card);
	}
	.bubble::after {
		/* little tail */
		content: '';
		position: absolute;
		left: 26px;
		bottom: -12px;
		width: 22px;
		height: 22px;
		background: var(--c-surface);
		border-right: 1.5px solid var(--c-ink);
		border-bottom: 1.5px solid var(--c-ink);
		transform: rotate(45deg);
	}
	.tape {
		position: absolute;
		top: -14px;
		left: 50%;
		width: 74px;
		height: 26px;
		translate: -50% 0;
		rotate: -4deg;
		background: rgba(122, 100, 92, 0.55);
		mix-blend-mode: multiply;
	}
	h2 {
		font-size: var(--fs-small);
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	p {
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
		max-width: 22ch;
	}
	p + p {
		margin-top: 0.35rem;
	}
</style>
