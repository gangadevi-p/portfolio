<script>
	/**
	 * Initial findings: two coordination tracks banded across one card, each
	 * column a hand-off stage. Highlighted stages are the ones CueUp owns, and
	 * the callout hangs off the first of them.
	 */
	import { revealScale } from '$motion/reveal.js';

	let { tracks = [], callout = '' } = $props();

	/** every stage is one column; each track's band spans its own stages */
	const total = $derived(tracks.reduce((n, t) => n + t.stages.length, 0));
	/** the callout sits under the first highlighted stage, as in the deck */
	const anchor = $derived(tracks.flatMap((t) => t.stages).find((s) => s.highlight)?.title);
</script>

<div class="findings cu-card" use:revealScale>
	<div class="bands" style="--n:{total}">
		{#each tracks as t (t.title)}
			<span class="band t-{t.tone}" style="grid-column: span {t.stages.length}">{t.title}</span>
		{/each}
	</div>

	<div class="stages" style="--n:{total}">
		{#each tracks as t (t.title)}
			{#each t.stages as s (s.title)}
				<div class="col t-{t.tone}">
					<div class="stage" class:on={s.highlight}>
						<h3>{s.title}</h3>
						<p class="today">{s.today}</p>
						<p class="gap">{s.gap}</p>
					</div>

					{#if s.highlight}
						<p class="callout" class:bare={s.title !== anchor}>
							<svg class="hook" viewBox="0 0 44 40" aria-hidden="true">
								<path
									d="M4 38 C 16 36, 30 28, 32 6"
									fill="none"
									stroke="currentColor"
									stroke-width="2.2"
									stroke-linecap="round"
								/>
								<path
									d="M25 14 L32 4 L39 15"
									fill="none"
									stroke="currentColor"
									stroke-width="2.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							{#if callout && s.title === anchor}{callout}{/if}
						</p>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.findings {
		width: 1020px;
		padding: 30px 32px 34px;

		--green-band: #eaf7ef;
		--green-ink: #17864b;
		--green-fill: #f0f9f3;
		--orange-band: #fff0e6;
		--orange-ink: #e97822;
		--orange-fill: #fff0e6;
	}

	/* same column track as .stages, so each band lines up over its own stages */
	.bands {
		display: grid;
		grid-template-columns: repeat(var(--n), 1fr);
		gap: 8px;
		margin-bottom: 26px;
	}
	.band {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		border-radius: 999px;
		font-size: 16px;
		font-weight: 500;
		background: var(--band);
		color: var(--ink);
	}

	.stages {
		display: grid;
		grid-template-columns: repeat(var(--n), 1fr);
		gap: 8px;
		/* start-aligned so each column is only as tall as its own content and
		   the callout can hang directly off the highlighted card */
		align-items: start;
		/* a little room for the callout, which overflows the grid */
		padding-bottom: 12px;
	}
	.col {
		position: relative;
	}

	/* plain stages run to the column edge; the rule just stops short of it */
	.stage {
		border-radius: var(--cu-radius-sm);
		padding: 8px 26px 12px 0;
	}
	/* highlighted stages read as raised cards: taller, filled, drop-shadowed */
	.stage.on {
		background: var(--fill);
		box-shadow:
			0 2px 6px rgba(31, 41, 55, 0.06),
			0 24px 44px -24px rgba(31, 41, 55, 0.34);
		padding: 20px 24px 36px;
		min-height: 252px;
	}

	h3 {
		font-size: 16px;
		font-weight: 700;
		color: #2b3440;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--cu-rule);
	}
	p {
		font-size: 14px;
		line-height: 1.5;
		color: var(--cu-ink-soft);
		padding-block: 20px;
	}
	.today {
		border-bottom: 1px solid var(--cu-rule);
	}
	.gap {
		padding-bottom: 0;
	}

	/* highlighted stages recolour their whole column */
	.stage.on h3,
	.stage.on p {
		color: var(--ink);
	}
	.stage.on h3,
	.stage.on .today {
		border-bottom-color: color-mix(in srgb, var(--ink) 22%, transparent);
	}

	/* the hook curves up off the caption into the card above it */
	.callout {
		position: absolute;
		top: calc(100% + 32px);
		left: -60px;
		width: 340px;
		padding: 0;
		font-size: 16px;
		font-weight: 700;
		line-height: 1.35;
		color: #2b3440;
	}
	.hook {
		position: absolute;
		left: 116px;
		top: -34px;
		width: 40px;
		height: 36px;
		max-width: none;
		color: var(--ink);
	}
	/* arrow-only marker under any other highlighted stage — no caption text */
	.callout.bare {
		width: 0;
		min-height: 0;
	}

	.t-green {
		--band: var(--green-band);
		--ink: var(--green-ink);
		--fill: var(--green-fill);
	}
	.t-orange {
		--band: var(--orange-band);
		--ink: var(--orange-ink);
		--fill: var(--orange-fill);
	}
</style>
