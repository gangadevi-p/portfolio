<script>
	/** Tilted sticky note with a tape tab — used in Design Process. */
	let { title, text, tone = 'sky', tilt = -2, tape = 'butter' } = $props();
</script>

<div class="note" style="--fill: var(--n-{tone}); --tape: var(--n-{tape}); --tilt:{tilt}deg;">
	<span class="tab" aria-hidden="true"></span>
	<h3>{title}</h3>
	<p>{text}</p>
</div>

<style>
	.note {
		position: relative;
		width: min(300px, 78vw);
		padding: 1.4rem 1.3rem 1.5rem;
		background: #fff;
		border-radius: 12px;
		box-shadow: var(--k-shadow-lift);
		rotate: var(--tilt);
	}
	.note::after {
		content: '';
		position: absolute;
		inset: 6px;
		border-radius: 8px;
		background: var(--fill);
		opacity: 0.55;
		z-index: 0;
	}
	.tab {
		position: absolute;
		top: -12px;
		left: 50%;
		translate: -50% 0;
		width: 62px;
		height: 24px;
		background: var(--tape);
		rotate: -3deg;
		z-index: 2;
		box-shadow: 0 2px 6px rgba(30, 30, 40, 0.12);
	}
	h3,
	p {
		position: relative;
		z-index: 1;
	}
	h3 {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--k-ink-strong);
		margin-bottom: 0.5rem;
		rotate: -1deg;
	}
	p {
		font-size: 0.92rem;
		color: #5a5a5a;
	}
</style>
