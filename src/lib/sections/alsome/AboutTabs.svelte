<script>
	/**
	 * Segmented tab control for the "Also me" copy: Story / TL;DR / Timeline.
	 *
	 * A white thumb slides behind the active tab. All three panels share one
	 * grid cell, so the block keeps the height of the tallest panel and the
	 * photos around it don't jump when you switch.
	 *
	 * Panels are passed in as snippets: `story`, `tldr`, `timeline`.
	 */
	let { title, story, tldr, timeline } = $props();

	const tabs = [
		{ id: 'story', label: 'Story' },
		{ id: 'tldr', label: 'TL;DR' },
		{ id: 'timeline', label: 'Timeline' }
	];

	let active = $state('story');
	const index = $derived(tabs.findIndex((t) => t.id === active));

	/** Arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern). */
	function onkeydown(event) {
		const keys = { ArrowRight: 1, ArrowLeft: -1 };
		let next = index;
		if (event.key in keys) next = (index + keys[event.key] + tabs.length) % tabs.length;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = tabs.length - 1;
		else return;
		event.preventDefault();
		active = tabs[next].id;
		document.getElementById(`about-tab-${active}`)?.focus();
	}
</script>

<div class="about-tabs">
	<header class="head">
		<h2>{title}</h2>
		<div class="tablist" role="tablist" aria-label={title} style="--i: {index}" {onkeydown}>
			<span class="thumb" aria-hidden="true"></span>
			{#each tabs as tab (tab.id)}
				<button
					type="button"
					role="tab"
					id="about-tab-{tab.id}"
					class="tab"
					class:active={active === tab.id}
					aria-selected={active === tab.id}
					aria-controls="about-panel-{tab.id}"
					tabindex={active === tab.id ? 0 : -1}
					onclick={() => (active = tab.id)}
				>
					{#if tab.id === 'story'}
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M4 6h16M4 12h10M4 18h16" />
						</svg>
					{:else if tab.id === 'tldr'}
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M9 6h11M9 12h11M9 18h11" />
							<circle cx="4.5" cy="6" r="0.9" />
							<circle cx="4.5" cy="12" r="0.9" />
							<circle cx="4.5" cy="18" r="0.9" />
						</svg>
					{:else}
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
							<path d="M3.5 10h17M8 3v4M16 3v4" />
						</svg>
					{/if}
					<span>{tab.label}</span>
				</button>
			{/each}
		</div>
	</header>

	<div class="panels">
		{#each [{ id: 'story', body: story }, { id: 'tldr', body: tldr }, { id: 'timeline', body: timeline }] as panel (panel.id)}
			<div
				class="panel"
				class:active={active === panel.id}
				role="tabpanel"
				id="about-panel-{panel.id}"
				aria-labelledby="about-tab-{panel.id}"
				inert={active !== panel.id}
			>
				{@render panel.body()}
			</div>
		{/each}
	</div>
</div>

<style>
	/* Heading on the left, tab switch on the right — same row, like Work Experience. */
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1.5rem;
		margin-bottom: 36px;
	}
	.head h2 {
		font-size: var(--fs-h2);
		font-weight: 700;
		letter-spacing: -0.045em;
	}
	.tablist {
		--pad: 6px;
		position: relative;
		display: inline-grid;
		grid-template-columns: repeat(3, 1fr);
		padding: var(--pad);
		background: var(--c-surface-subtle);
		border: 1px solid var(--c-line);
		border-radius: 999px;
	}
	/* The sliding white thumb — one tab-width wide, shifted by the active index. */
	.thumb {
		position: absolute;
		inset-block: var(--pad);
		left: var(--pad);
		width: calc((100% - var(--pad) * 2) / 3);
		translate: calc(var(--i) * 100%) 0;
		background: var(--c-surface);
		border-radius: 999px;
		box-shadow:
			0 1px 2px rgb(0 0 0 / 10%),
			0 4px 12px -4px rgb(0 0 0 / 14%);
		transition: translate var(--dur-fast) var(--ease-out);
	}
	.tab {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		padding: 0.8rem 1.6rem;
		background: none;
		border: 0;
		border-radius: 999px;
		color: var(--c-ink-soft);
		font: inherit;
		font-size: 1.05rem;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		transition: color var(--dur-fast) var(--ease-out);
	}
	.tab.active {
		color: var(--c-ink);
	}
	.tab:focus-visible {
		outline: 2px solid var(--c-accent);
		outline-offset: 2px;
	}
	.tab svg {
		width: 1.35em;
		height: 1.35em;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.tab svg circle {
		fill: currentColor;
		stroke: none;
	}

	.panels {
		display: grid;
	}
	.panel {
		grid-area: 1 / 1;
		opacity: 0;
		visibility: hidden;
		translate: 0 6px;
		transition:
			opacity var(--dur-fast) var(--ease-out),
			translate var(--dur-fast) var(--ease-out),
			visibility 0s linear var(--dur-fast);
	}
	.panel.active {
		opacity: 1;
		visibility: visible;
		translate: 0 0;
		transition-delay: 0s;
	}

	@media (max-width: 760px) {
		.tablist {
			display: grid;
			width: 100%;
		}
		.tab {
			padding: 0.7rem 0.4rem;
			gap: 0.4rem;
			font-size: 0.9rem;
		}
		.tab svg {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.thumb,
		.panel,
		.tab {
			transition: none;
		}
	}
</style>
