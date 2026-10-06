<script>
	import { onDestroy } from 'svelte';

	/** A small working Pomodoro timer for the "I Play" section. Durations are in minutes. */
	const modes = [
		{ id: 'focus', label: 'Focus', minutes: 25 },
		{ id: 'short', label: 'Short break', minutes: 5 },
		{ id: 'long', label: 'Long break', minutes: 15 }
	];

	const RADIUS = 88;
	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	let modeId = $state('focus');
	let remaining = $state(modes[0].minutes * 60 * 1000); // ms left
	let running = $state(false);
	let done = $state(0); // focus sessions finished
	let finished = $state(false);

	/** @type {ReturnType<typeof setInterval> | undefined} */
	let tick;
	let endsAt = 0;

	const mode = $derived(modes.find((m) => m.id === modeId) ?? modes[0]);
	const total = $derived(mode.minutes * 60 * 1000);
	const progress = $derived(1 - remaining / total);
	const clock = $derived.by(() => {
		const secs = Math.ceil(remaining / 1000);
		const mm = String(Math.floor(secs / 60)).padStart(2, '0');
		const ss = String(secs % 60).padStart(2, '0');
		return `${mm}:${ss}`;
	});

	function stop() {
		clearInterval(tick);
		tick = undefined;
		running = false;
	}

	function select(id) {
		stop();
		finished = false;
		modeId = id;
		remaining = (modes.find((m) => m.id === id)?.minutes ?? 25) * 60 * 1000;
	}

	function complete() {
		if (modeId === 'focus') {
			done += 1;
			// every fourth focus session earns the long break
			select(done % 4 === 0 ? 'long' : 'short');
		} else {
			select('focus');
		}
		finished = true; // select() clears it, so set it after
	}

	function toggle() {
		if (running) return stop();
		finished = false;
		endsAt = Date.now() + remaining;
		running = true;
		// wall-clock based, so a throttled background tab doesn't drift
		tick = setInterval(() => {
			remaining = Math.max(0, endsAt - Date.now());
			if (remaining === 0) complete();
		}, 250);
	}

	function reset() {
		select(modeId);
	}

	onDestroy(() => clearInterval(tick));
</script>

<div class="pomo" data-mode={modeId}>
	<div class="tabs" role="tablist" aria-label="Timer mode">
		{#each modes as m (m.id)}
			<button
				type="button"
				role="tab"
				class="tab"
				aria-selected={modeId === m.id}
				onclick={() => select(m.id)}>{m.label}</button
			>
		{/each}
	</div>

	<div class="dial">
		<svg viewBox="0 0 200 200" aria-hidden="true">
			<circle class="track" cx="100" cy="100" r={RADIUS} />
			<circle
				class="bar"
				cx="100"
				cy="100"
				r={RADIUS}
				stroke-dasharray={CIRCUMFERENCE}
				stroke-dashoffset={CIRCUMFERENCE * (1 - progress)}
			/>
		</svg>
		<div class="readout">
			<span class="clock" role="timer" aria-label="{mode.label}, {clock} remaining">{clock}</span>
			<span class="state" aria-live="polite">
				{#if finished}Done — next up: {mode.label.toLowerCase()}{:else if running}{mode.label}…{:else}{mode.label}{/if}
			</span>
		</div>
	</div>

	<div class="controls">
		<button type="button" class="btn btn--primary" onclick={toggle}>
			{running ? 'Pause' : remaining < total ? 'Resume' : 'Start'}
		</button>
		<button type="button" class="btn" onclick={reset} disabled={!running && remaining === total}>
			Reset
		</button>
	</div>

	<p class="sessions" aria-label="{done} focus sessions completed">
		{#each { length: 4 } as _, i}
			<span class="pip" class:on={i < done % 4 || (done > 0 && done % 4 === 0)}></span>
		{/each}
		<span class="count">{done} {done === 1 ? 'session' : 'sessions'}</span>
	</p>
</div>

<style>
	.pomo {
		/* always-dark palette, independent of the page theme */
		--p-bg: #0b0b0c;
		--p-panel: #1d1d20;
		--p-ink: #ffffff;
		--p-soft: #a1a1a6;
		--p-line: #3a3a3e;
		--p-accent: #5ac8fa;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		width: min(100%, 340px);
		padding: 16px 16px 14px;
		background: var(--p-bg);
		border-radius: 20px;
		color: var(--p-ink);
	}
	.tabs {
		display: flex;
		gap: 4px;
		padding: 4px;
		background: var(--p-panel);
		border-radius: 999px;
		
	}
	.tab {
		padding: 0.45rem 0.8rem;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--p-soft);
		font: inherit;
		font-size: var(--fs-label);
		font-weight: 600;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	.tab[aria-selected='true'] {
		background: var(--p-ink);
		color: var(--p-bg);
	}
	.tab:not([aria-selected='true']):hover {
		color: var(--p-ink);
	}

	.dial {
		position: relative;
		width: 180px;
		aspect-ratio: 1;
	}
	.dial svg {
		display: block;
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}
	.track,
	.bar {
		fill: none;
		stroke-width: 10;
	}
	.track {
		stroke: var(--p-line);
	}
	.bar {
		stroke: var(--p-ink);
		stroke-linecap: round;
		transition: stroke-dashoffset 0.25s linear;
	}
	[data-mode='short'] .bar,
	[data-mode='long'] .bar {
		stroke: var(--p-accent);
	}
	.readout {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		text-align: center;
	}
	.clock {
		font-family: var(--font-display);
		font-size: 2.75rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
	.state {
		max-width: 12ch;
		color: var(--p-soft);
		font-size: var(--fs-label);
		font-weight: 600;
		line-height: 1.25;
	}

	.controls {
		display: flex;
		gap: 8px;
	}
	.btn {
		min-width: 5.5rem;
		padding: 0.7rem 1.25rem;
		border: 0;
		border-radius: 999px;
		background: var(--p-panel);
		color: var(--p-ink);
		font: inherit;
		font-size: var(--fs-small);
		font-weight: 600;
		cursor: pointer;
		
		transition:
			transform var(--dur-fast) var(--ease-out),
			opacity var(--dur-fast) var(--ease-out);
	}
	.btn--primary {
		background: var(--p-ink);
		color: var(--p-bg);
	}
	.btn:hover:not(:disabled) {
		transform: translateY(-2px);
	}
	.btn:disabled {
		opacity: 0.6;
		cursor: default;
	}
	.tab:focus-visible,
	.btn:focus-visible {
		outline: 2px solid var(--p-accent);
		outline-offset: 2px;
	}

	.sessions {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 0;
		color: var(--p-soft);
		font-size: var(--fs-label);
		font-weight: 600;
	}
	.pip {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--p-line);
	}
	.pip.on {
		background: var(--p-ink);
	}
	.count {
		margin-left: 6px;
	}

	@media (prefers-reduced-motion: reduce) {
		.bar,
		.tab,
		.btn {
			transition: none;
		}
		.btn:hover:not(:disabled) {
			transform: none;
		}
	}
</style>
