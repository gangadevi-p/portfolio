<script>
	/** Competitive analysis: competitor logos as column heads, two labelled rows. */
	import { revealScale } from '$motion/reveal.js';

	let { columns = [] } = $props();
</script>

<div class="compare cu-card" style="--n:{columns.length}" use:revealScale>
	<div class="row logos">
		<span class="lead"></span>
		{#each columns as c (c.logo.alt)}
			<span class="logo" class:wide={c.logo.wide}>
				<img src={c.logo.src} alt={c.logo.alt} loading="lazy" />
			</span>
		{/each}
	</div>

	<div class="row">
		<span class="lead"><span class="tag">Focus</span></span>
		{#each columns as c (c.logo.alt)}
			<p>{c.focus}</p>
		{/each}
	</div>

	<div class="row">
		<span class="lead"><span class="tag on">Cueup</span></span>
		{#each columns as c (c.logo.alt)}
			<p>{c.cueup}</p>
		{/each}
	</div>
</div>

<style>
	.compare {
		width: 1020px;
		padding: 34px 30px 40px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.row {
		display: grid;
		grid-template-columns: 148px repeat(var(--n), 1fr);
		gap: 24px;
		align-items: start;
	}
	.logos {
		align-items: center;
		margin-bottom: 8px;
	}
	.logo {
		display: flex;
		align-items: center;
		height: 44px;
	}
	.logo img {
		max-height: 44px;
		max-width: 120px;
		width: auto;
		object-fit: contain;
	}
	/* the RentOk mark is a wide lock-up, the other two are compact glyphs */
	.logo.wide img {
		max-height: 34px;
	}

	.lead {
		display: flex;
		align-items: center;
	}
	.tag {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 122px;
		height: 38px;
		border-radius: 999px;
		background: #f1f2f4;
		color: #2b3440;
		font-size: 16px;
		font-weight: 600;
	}
	.tag.on {
		background: #eaf7ef;
		color: var(--cu-emerald);
	}

	p {
		font-size: 17px;
		line-height: 1.45;
		color: #2b3440;
	}
	@media (max-width: 999px) {
		.compare { width: 100%; padding: 20px; gap: 18px; }
		.row { grid-template-columns: 1fr; gap: 12px; }
		.logos { display: none; }
		.row .lead { margin-bottom: 2px; }
		.row p { padding: 14px; border-radius: 12px; background: #f8f9fb; font-size: 16px; }
	}
</style>
