<script>
	import { revealScale } from '$motion/reveal.js';
	let { rows = [] } = $props();
</script>

<div class="jobs" use:revealScale>
	{#each rows as r, i}
		<div class="row" style="--d:{i * 0.05}s">
			<div class="cell when"><span class="k">When</span>{r.when.replace(/^When\s*/i, '')}</div>
			<div class="cell want">{r.want}</div>
			<div class="cell outcome">
				<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2.4"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20 6 9 17l-5-5"
					/>
				</svg>
				{r.outcome}
			</div>
		</div>
	{/each}
</div>

<style>
	.jobs {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}
	.row {
		display: grid;
		grid-template-columns: 0.85fr 1.1fr 1fr;
		gap: 0.9rem;
	}
	.cell {
		background: #fff;
		border-radius: 14px;
		box-shadow: var(--k-shadow);
		padding: 1rem 1.15rem;
		font-size: 0.92rem;
		color: #565656;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.when .k {
		font-weight: 700;
		color: var(--k-ink-strong);
		margin-right: 0.15rem;
	}
	.outcome {
		background: var(--k-orange);
		color: #fff;
		font-weight: 600;
	}
	@media (max-width: 760px) {
		.row {
			grid-template-columns: 1fr;
		}
	}
</style>
