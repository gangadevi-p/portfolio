<script>
	/**
	 * ChartBlock — a small, colorful bar/donut chart the portfolio assistant
	 * drops into its replies when a question is genuinely better answered with
	 * numbers side by side (e.g. KIET's acquisitions vs DAU vs MAU).
	 * Categorical palette + ordering: validated for CVD-safe adjacent contrast
	 * (see the dataviz skill's reference palette).
	 */
	let { spec } = $props();

	const PALETTE = [
		'#2a78d6', // blue
		'#eb6834', // orange
		'#1baf7a', // aqua
		'#eda100', // yellow
		'#e87ba4', // magenta
		'#008300', // green
		'#4a3aa7', // violet
		'#e34948'  // red
	];

	let total = $derived(spec.values.reduce((sum, v) => sum + v, 0));
	let max = $derived(Math.max(...spec.values, 1));

	function formatValue(v) {
		const rounded = Number.isInteger(v) ? v : Math.round(v * 10) / 10;
		return spec.unit ? `${rounded}${spec.unit}` : String(rounded);
	}

	/** conic-gradient stops for the donut, in fixed palette order */
	let donutGradient = $derived.by(() => {
		if (spec.type !== 'donut') return '';
		let angle = 0;
		const stops = spec.values.map((v, i) => {
			const start = angle;
			angle += (v / total) * 360;
			return `${PALETTE[i % PALETTE.length]} ${start}deg ${angle}deg`;
		});
		return `conic-gradient(${stops.join(', ')})`;
	});
</script>

<figure class="chart-block" class:donut={spec.type === 'donut'}>
	{#if spec.title}<figcaption>{spec.title}</figcaption>{/if}

	{#if spec.type === 'bar'}
		<div class="bars">
			{#each spec.labels as label, i}
				<div class="bar-row">
					<span class="bar-label">{label}</span>
					<div class="track">
						<div
							class="fill"
							style="width: {(spec.values[i] / max) * 100}%; background: {PALETTE[i % PALETTE.length]};"
						></div>
					</div>
					<span class="bar-value">{formatValue(spec.values[i])}</span>
				</div>
			{/each}
		</div>
	{:else if spec.type === 'donut'}
		<div class="donut-row">
			<div class="ring" style="background: {donutGradient};" aria-hidden="true">
				<div class="hole"></div>
			</div>
			<ul class="legend">
				{#each spec.labels as label, i}
					<li>
						<span class="swatch" style="background: {PALETTE[i % PALETTE.length]};"></span>
						<span class="legend-label">{label}</span>
						<span class="legend-value">{formatValue(spec.values[i])}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</figure>

<style>
	.chart-block {
		--chart-surface: #fcfcfb;
		--chart-ink: #0b0b0b;
		--chart-ink-soft: #52514e;
		--chart-muted: #898781;
		--chart-track: #e1e0d9;
		margin: 0.4rem 0;
		padding: 0.7rem 0.75rem;
		border-radius: 0.7rem;
		background: var(--chart-surface);
		border: 1px solid rgb(11 11 11 / 8%);
	}
	:global(html:is(.dark, [data-theme='dark'])) .chart-block {
		--chart-surface: #1a1a19;
		--chart-ink: #ffffff;
		--chart-ink-soft: #c3c2b7;
		--chart-muted: #898781;
		--chart-track: #2c2c2a;
		border-color: rgb(255 255 255 / 10%);
	}
	figcaption {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--chart-ink);
		margin-bottom: 0.55rem;
	}
	.bars {
		display: grid;
		gap: 0.42rem;
	}
	.bar-row {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.4fr) auto;
		align-items: center;
		gap: 0.4rem;
	}
	.bar-label {
		font-size: 0.64rem;
		line-height: 1.25;
		color: var(--chart-ink-soft);
		overflow-wrap: break-word;
	}
	.track {
		height: 0.5rem;
		border-radius: 999px;
		background: var(--chart-track);
		overflow: hidden;
	}
	.fill {
		height: 100%;
		border-radius: 999px;
		min-width: 3px;
	}
	.bar-value {
		font-size: 0.66rem;
		font-weight: 700;
		color: var(--chart-ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.donut-row {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}
	.ring {
		position: relative;
		width: 4.4rem;
		height: 4.4rem;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.hole {
		position: absolute;
		inset: 0.72rem;
		border-radius: 50%;
		background: var(--chart-surface);
	}
	.legend {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.3rem;
		min-width: 0;
	}
	.legend li {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.66rem;
	}
	.swatch {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.legend-label {
		color: var(--chart-ink-soft);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.legend-value {
		margin-left: auto;
		font-weight: 700;
		color: var(--chart-ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
</style>
