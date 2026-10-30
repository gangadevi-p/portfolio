<script>
	import { onMount, untrack } from 'svelte';

	let { home, chapters, compact = false } = $props();

	// timings (ms): pointer glides, presses, destination opens, holds
	const TAP_AT = 650;
	const OPEN_AT = 900;
	const HOLD = 2300;
	const TOTAL = OPEN_AT + HOLD;

	let active = $state(0);
	let opened = $state(false);
	let pressed = $state(false);
	let aimed = $state(false);
	let banner = $state(false);
	let inView = $state(false);
	let hovering = $state(false);
	let reduced = $state(false);
	let stage;
	let timers = [];

	const clear = () => {
		timers.forEach(clearTimeout);
		timers = [];
	};

	function play(index) {
		clear();
		active = index;
		opened = false;
		pressed = false;
		aimed = false;
		banner = false;
		if (reduced) {
			opened = true;
			return;
		}
		// every chapter runs the same beat so the loop keeps an even rhythm
		if (chapters[index].banner) timers.push(setTimeout(() => (banner = true), 80));
		timers.push(setTimeout(() => (aimed = true), 120));
		timers.push(setTimeout(() => (pressed = true), TAP_AT));
		timers.push(
			setTimeout(() => {
				opened = true;
				banner = false;
			}, OPEN_AT)
		);
		timers.push(setTimeout(() => (pressed = false), OPEN_AT + 250));
		timers.push(setTimeout(() => play((index + 1) % chapters.length), TOTAL));
	}

	// run only while visible and not hovered; resume from the current chapter
	$effect(() => {
		if (inView && !hovering) untrack(() => play(active));
		else clear();
		return clear;
	});

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.35 });
		io.observe(stage);
		return () => {
			io.disconnect();
			clear();
		};
	});

	const chapter = $derived(chapters[active]);
</script>

{#snippet notice(it)}
	<svg class="nic" viewBox="0 0 24 24" fill="none"><rect x="5" y="3.5" width="14" height="17" rx="2.5" stroke="currentColor" stroke-width="1.5" /><path d="M8.5 9h7M8.5 12.5h7M8.5 16h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
	<b>{it.title}</b>
	<svg class="nchev" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
	<span class="nbodytext">{it.text}</span>
	<span class="nfoot"><i>{it.ago}</i><em><u></u>{it.from}</em></span>
{/snippet}

<div class="journey" class:compact>
	{#if !compact}
	<ol class="steps" aria-label="User journey chapters">
		{#each chapters as c, i (c.title)}
			<li>
				<button
					type="button"
					class="step"
					class:on={i === active}
					aria-current={i === active ? 'step' : undefined}
					onclick={() => play(i)}
				>
					<span class="num">{i + 1}</span>
					<span class="copy">
						<b>{c.title}</b>
						<span class="desc">{c.text}</span>
					</span>
				</button>
			</li>
		{/each}
	</ol>
	{/if}

	<div
		class="stage"
		bind:this={stage}
		role="group"
		aria-label="Animated walkthrough: {chapter.title}"
		onmouseenter={() => (hovering = true)}
		onmouseleave={() => (hovering = false)}
	>
		<div class="phone">
			<img class="screen" src={home.src} alt={opened ? '' : home.alt} width="388" height="800" />
			{#each chapters as c, i (c.title)}
				{#if c.screen.src}
					<img
						class="screen dest"
						class:show={opened && i === active}
						src={c.screen.src}
						alt={opened && i === active ? c.screen.alt : ''}
						width="388"
						height="800"
						loading="lazy"
						decoding="async"
					/>
				{:else}
					<!-- drawn in HTML (no Figma export): header, tabs and cards, with a tab bar cut from the Home export -->
					<div class="screen dest html" class:show={opened && i === active} role="img" aria-label={c.screen.alt}>
						<div class="nbody" aria-hidden="true">
							<p class="ntitle">{c.screen.title}</p>
							<div class="ntabs">
								{#each c.screen.tabs as t, ti (t)}
									<span class="ntab t{ti}" class:sel={ti === c.screen.selected}>{t}</span>
								{/each}
								<svg class="nfilter" viewBox="0 0 24 24" fill="none"><path d="M4 5h16l-6.2 7.4V19l-3.6-2v-4.6L4 5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></svg>
							</div>
							<ul class="ncards">
								{#each c.screen.items as it, n (it.title)}
									<li class="ncard" style="--n:{n}">{@render notice(it)}</li>
								{/each}
							</ul>
						</div>
						<img class="nbar" src={c.screen.tabbar} alt="" width="713" height="150" />
					</div>
				{/if}
			{/each}
			{#each chapters as c, i (c.title)}
				{#if c.banner}
					<div class="banner ncard" class:on={banner && i === active} aria-hidden="true">{@render notice(c.screen.items[0])}</div>
				{/if}
			{/each}
			<span
				class="tap"
				class:aimed
				class:pressed
				class:gone={opened}
				style="--x:{chapter.tap.x}%;--y:{chapter.tap.y}%"
				aria-hidden="true"
			></span>
		</div>
		<p class="cap" aria-live="polite"><span>{active + 1}/{chapters.length}</span> {chapter.title}</p>
	</div>
</div>

<style>
	.journey {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 340px);
		gap: clamp(1.5rem, 5vw, 3.5rem);
		align-items: center;
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
	}
	.step {
		position: relative;
		display: flex;
		gap: 0.9rem;
		width: 100%;
		text-align: left;
		font: inherit;
		color: var(--k-ink);
		background: transparent;
		border: 1px solid transparent;
		border-radius: 16px;
		padding: 0.85rem 1rem;
		cursor: pointer;
		overflow: hidden;
		transition:
			background var(--dur-fast, 0.2s) var(--ease-out, ease),
			box-shadow var(--dur-fast, 0.2s) var(--ease-out, ease);
	}
	.step:hover {
		background: rgb(255 255 255 / 55%);
	}
	.step.on {
		background: #fff;
		box-shadow: var(--k-shadow);
	}
	.step:focus-visible {
		outline: 2px solid var(--k-orange);
		outline-offset: 2px;
	}
	.num {
		flex: none;
		display: grid;
		place-items: center;
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 50%;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--k-ink-soft);
		background: var(--t-dark-bg);
		transition: background 0.25s, color 0.25s;
	}
	.step.on .num {
		color: #fff;
		background: var(--k-orange);
	}
	.copy {
		display: grid;
		gap: 0.2rem;
	}
	.copy b {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--k-ink-strong);
	}
	/* description only opens on the active chapter */
	.desc {
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--k-ink);
		opacity: 0;
		max-height: 0;
		overflow: hidden;
		transition:
			max-height 0.25s var(--ease-out, ease),
			opacity 0.2s;
	}
	.step.on .desc {
		opacity: 1;
		max-height: 6rem;
	}

	.stage {
		justify-self: center;
		width: min(100%, 320px);
	}
	.phone {
		position: relative;
		container-type: inline-size;
		aspect-ratio: 388 / 800;
		filter: drop-shadow(0 26px 24px rgb(43 31 54 / 26%));
	}
	.screen {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}
	/* opens with a quick fade, leaves instantly so two screens never ghost over each other */
	.dest {
		opacity: 0;
		transform: scale(0.985);
	}
	.dest.show {
		opacity: 1;
		transform: none;
		transition:
			opacity 0.18s var(--ease-out, ease),
			transform 0.3s var(--ease-out, ease);
	}

	/* the finger: glides from below the screen to the target, presses, fades */
	.tap {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: 2.6rem;
		height: 2.6rem;
		margin: -1.3rem 0 0 -1.3rem;
		border-radius: 50%;
		background: rgb(241 90 36 / 28%);
		border: 2px solid var(--k-orange);
		opacity: 0;
		transform: translate(18%, 140%) scale(0.9);
		transition:
			transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.3s;
		pointer-events: none;
	}
	.tap.aimed {
		opacity: 1;
		transform: none;
	}
	.tap.pressed {
		transform: scale(0.8);
		transition: transform 0.15s;
		box-shadow: 0 0 0 0.9rem rgb(241 90 36 / 14%);
	}
	.tap.gone {
		opacity: 0;
		transition: opacity 0.25s;
	}

	.cap {
		margin: 1rem 0 0;
		text-align: center;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--k-ink-strong);
	}
	.cap span {
		margin-right: 0.35rem;
		color: var(--k-orange);
	}

	/* ---------- notifications screen + push banner (sizes in cqw of the phone) ----------
	   one design px (393 wide) is about 0.234cqw inside the screen */
	.html {
		pointer-events: none;
	}
	.nbody {
		position: absolute;
		left: 4.9%;
		right: 4.8%;
		top: 7.6%;
		bottom: 10.6%;
		background: #f8f7ff;
		overflow: hidden;
		color: #3a3a3a;
		font-family: 'Poppins', system-ui, sans-serif;
	}
	.ntitle {
		margin: 0;
		padding-top: 1cqw;
		text-align: center;
		font-size: 3.6cqw;
		font-weight: 500;
		line-height: 4.4cqw;
	}
	.ntabs {
		position: relative;
		height: 8cqw;
		margin: 3.4cqw 3.6cqw 0;
		font-size: 3.1cqw;
		color: #5c5c66;
	}
	.ntab {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		white-space: nowrap;
	}
	.ntab.t0 {
		left: 13%;
	}
	.ntab.t1 {
		left: 43%;
	}
	.ntab.t2 {
		left: 73%;
	}
	.ntab.sel {
		padding: 1.5cqw 4.6cqw;
		border-radius: 1.6cqw;
		background: #e75706;
		color: #fff;
		font-weight: 500;
	}
	.nfilter {
		position: absolute;
		right: 0;
		top: 50%;
		width: 5.4cqw;
		height: 5.4cqw;
		transform: translateY(-50%);
		color: #2c2c2c;
	}
	.ncards {
		list-style: none;
		margin: 2.6cqw 3.2cqw 0;
		padding: 0;
		display: grid;
		gap: 3cqw;
	}
	/* the notice card, as drawn in Figma */
	.ncard {
		position: relative;
		display: grid;
		gap: 0.6cqw;
		padding: 3.4cqw 3.6cqw 2.6cqw 11.4cqw;
		background: #fff;
		border: 1px solid #fdf1ec;
		border-radius: 3.6cqw;
		box-shadow: 0 0.2cqw 1cqw rgb(231 87 6 / 6%);
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 2.8cqw;
		line-height: 1.45;
		color: #3d3d3d;
	}
	.nic {
		position: absolute;
		left: 3.4cqw;
		top: 3.6cqw;
		width: 5cqw;
		height: 5cqw;
		color: #444;
	}
	.nchev {
		position: absolute;
		right: 3.2cqw;
		top: 3.8cqw;
		width: 4.4cqw;
		height: 4.4cqw;
		color: #e75706;
	}
	.ncard b {
		font-size: 3.05cqw;
		font-weight: 500;
		color: #1f1f1f;
		padding-right: 6cqw;
	}
	.nbodytext {
		max-width: 54cqw;
		font-size: 2.75cqw;
		color: #444;
	}
	.nfoot {
		display: flex;
		justify-content: space-between;
		margin-top: 1cqw;
		padding-top: 1.6cqw;
		border-top: 1px solid #efefef;
		font-size: 2.7cqw;
	}
	.nfoot i {
		font-style: normal;
		color: #ed8144;
	}
	.nfoot em {
		display: inline-flex;
		align-items: center;
		gap: 1.2cqw;
		font-style: normal;
		color: #555;
	}
	.nfoot u {
		width: 1.4cqw;
		height: 1.4cqw;
		border-radius: 50%;
		background: #126c0a;
	}
	.nbar {
		position: absolute;
		left: 4.12%;
		top: 89.375%;
		width: 91.64%;
		height: auto;
	}
	.show .ncard {
		animation: rise 0.4s both cubic-bezier(0.22, 1, 0.36, 1);
		animation-delay: calc(var(--n) * 70ms + 80ms);
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(3cqw);
		}
	}

	/* "new notice" lands on Home using the same designed card */
	.banner {
		position: absolute;
		z-index: 2;
		left: 7.6%;
		right: 7.6%;
		top: 8.4%;
		box-shadow:
			0 1.6cqw 5cqw rgb(30 30 50 / 22%),
			0 0 0 1px rgb(231 87 6 / 10%);
		opacity: 0;
		transform: translateY(-16cqw);
		transition:
			transform 0.5s cubic-bezier(0.22, 1.15, 0.36, 1),
			opacity 0.25s;
		pointer-events: none;
	}
	.banner.on {
		opacity: 1;
		transform: none;
	}

	/* compact: just the phone, used beside the hero title */
	.journey.compact {
		display: block;
		width: 100%;
		height: 100%;
	}
	.compact .stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.compact .phone {
		width: min(100%, 300px);
	}
	@media (min-width: 901px) {
		.compact .stage {
			height: auto;
		}
		.compact .phone {
			width: auto;
			height: clamp(500px, 76vh, 660px);
		}
	}

	@media (max-width: 860px) {
		.journey {
			grid-template-columns: 1fr;
		}
		.stage {
			order: -1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.dest.show,
		.tap,
		.banner {
			transition: none;
		}
		.show .ncard {
			animation: none;
		}
	}
</style>
