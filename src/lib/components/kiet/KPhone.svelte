<script>
	/** Native device frame wrapped around an app screenshot. */
	let { src, alt = '', label = '', accent = false, width = 250, tilt = 0 } = $props();
</script>

<figure class="phone" style="--w:{width}px; --tilt:{tilt}deg;">
	<div class="frame">
		<span class="island" aria-hidden="true"></span>
		{#if src}
			<img {src} {alt} loading="lazy" draggable="false" />
		{:else}
			<div class="ph" aria-hidden="true">screen</div>
		{/if}
	</div>
	{#if label}
		<figcaption class:accent>{label}</figcaption>
	{/if}
</figure>

<style>
	.phone {
		margin: 0;
		width: var(--w);
		flex: none;
	}
	.frame {
		position: relative;
		aspect-ratio: 9 / 19.3;
		border-radius: calc(var(--w) * 0.14);
		background: #0d0d0f;
		padding: calc(var(--w) * 0.032);
		box-shadow:
			0 0 0 1.5px rgba(255, 255, 255, 0.06) inset,
			var(--k-shadow-lift);
		overflow: hidden;
		rotate: var(--tilt);
	}
	.island {
		position: absolute;
		top: calc(var(--w) * 0.05);
		left: 50%;
		translate: -50% 0;
		width: 34%;
		height: calc(var(--w) * 0.07);
		background: #000;
		border-radius: 999px;
		z-index: 2;
	}
	img,
	.ph {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: calc(var(--w) * 0.1);
		display: block;
	}
	.ph {
		display: grid;
		place-items: center;
		background: repeating-linear-gradient(45deg, #f0f0f4 0 12px, #e9e9ef 12px 24px);
		color: var(--k-ink-soft);
		font-size: 0.8rem;
	}
	figcaption {
		margin-top: 0.9rem;
		text-align: center;
		font-weight: 700;
		font-size: 1.05rem;
		color: var(--k-ink-strong);
	}
	figcaption.accent {
		color: var(--k-orange);
	}
</style>
