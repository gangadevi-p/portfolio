<script>
	import { cursorLabel } from '$motion/cursor.svelte.js';

	let { icons = [] } = $props();

	/* Hover drives this on a mouse; touch has no hover, so a tap toggles it too. */
	let open = $state(false);
	/* Three rows, top to bottom, taking `take` icons each. Each slot has a small
	   drop (in icon heights, so a row curves down at its ends) and a tilt. */
	const rows = [
		{ take: 3, drop: [0.05, 0, 0.05], rotate: [-8, -2, 8] },
		{ take: 3, drop: [0.05, 0, 0.05], rotate: [-6, 3, 9] },
		{ take: Infinity, drop: [0, 0], rotate: [-8, 6] }
	];
	/* space, in px, between neighbouring icons' artwork: 4px apart within a row,
	   while the rows overlap by 4px */
	const GAP_X = 4;
	const GAP_Y = -4;

	/* Packs each row by the artwork's visible edges rather than the image boxes,
	   using each icon's `trim` (its transparent margin). x / y come out in icon
	   sizes, gx / gy in px. The bottom row stays put — it's what dips behind the
	   folder's edge — and each row above sits one artwork height plus GAP_Y
	   over the next. */
	function pack(list) {
		const trim = (icon) => icon.trim ?? [0, 0, 0, 0];
		const average = (items, side) =>
			items.reduce((sum, icon) => sum + trim(icon)[side], 0) / (items.length || 1);

		let start = 0;
		const groups = rows.map((row) => {
			const items = list.slice(start, start + row.take);
			start += items.length;
			return items;
		});

		const lift = groups.map(() => 0);
		for (let r = groups.length - 2; r >= 0; r--) {
			lift[r] = lift[r + 1] + 1 - average(groups[r], 2) - average(groups[r + 1], 0);
		}

		return groups.flatMap((items, r) => {
			const widths = items.map((icon) => 1 - trim(icon)[1] - trim(icon)[3]);
			const total = widths.reduce((sum, width) => sum + width, 0);
			let run = 0;
			return items.map((icon, i) => {
				const x = run - total / 2 - trim(icon)[3] + 0.5;
				run += widths[i];
				return {
					icon,
					row: r,
					x: +x.toFixed(3),
					gx: (i - (items.length - 1) / 2) * GAP_X,
					y: +(-lift[r] + (rows[r].drop[i] ?? 0)).toFixed(3),
					gy: -(groups.length - 1 - r) * GAP_Y,
					rotate: rows[r].rotate[i] ?? 0
				};
			});
		});
	}

	const layout = $derived(pack(icons));

	function toggle() {
		open = !open;
	}

	function onKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggle();
		}
	}
</script>

<!-- Opens like SkillsDeck. The stack is, back to front:
     folder back panel -> the icons -> front cover. The cover tips forward on its
     bottom fold while the icons rise up out of the folder behind it. -->
<div
	class="deck"
	class:is-open={open}
	role="button"
	tabindex="0"
	aria-expanded={open}
	aria-label="Tools"
	onclick={toggle}
	onkeydown={onKeydown}
	use:cursorLabel={{ label: 'Explore tools', variant: 'view' }}
>
	<svg class="shell shell--back" viewBox="0 0 300 249" aria-hidden="true">
		<path
			class="back"
			d="M30 22h80c13 0 18 9 24 17 6 8 11 12 24 12h112c13 0 24 11 24 24v144c0 14-10 24-24 24H30c-14 0-24-10-24-24V46c0-13 10-24 24-24Z"
		/>
	</svg>

	<div class="icons" aria-hidden="true">
		{#each layout as slot, index (slot.icon.name)}
			<span
				class="icon"
				style={`--i: ${index}; --x: ${slot.x}; --gx: ${slot.gx}px; --y: ${slot.y}; --gy: ${slot.gy}px; --row: ${slot.row}; --rotate: ${slot.rotate}deg;`}
			>
				<img src={slot.icon.src} alt="" loading="lazy" draggable="false" />
			</span>
		{/each}
	</div>

	<div class="cover">
		<svg class="shell" viewBox="0 0 300 249" aria-hidden="true">
			<defs>
				<linearGradient id="tools-folder-face" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#3a221d" />
					<stop offset="100%" stop-color="#ff6a3d" />
				</linearGradient>
			</defs>
			<path
				class="front"
				d="M30 60h80c13 0 18 9 24 17 6 8 11 12 24 12h112c13 0 24 11 24 24v106c0 14-10 24-24 24H30c-14 0-24-10-24-24V84c0-13 10-24 24-24Z"
			/>
		</svg>

		<div class="label">
			<strong>Tools</strong>
		</div>
	</div>
</div>

<style>
	.deck {
		/* same timings as SkillsDeck, so the two folders open alike */
		--flip: 560ms;
		/* damped spring (stiffness 170, damping 12) */
		--spring: linear(0, 0.03, 0.108, 0.222, 0.356, 0.499, 0.64, 0.773, 0.891, 0.991, 1.07, 1.129, 1.169, 1.19, 1.196, 1.19, 1.174, 1.152, 1.125, 1.097, 1.069, 1.043, 1.02, 1.001, 0.986, 0.974, 0.967, 0.963, 0.961, 0.963, 0.966, 0.97, 0.976, 0.981, 0.987, 0.992, 1);
		--spring-dur: 700ms;
		--rise: 460ms;
		/* just past the spring's peak */
		--rise-delay: 300ms;
		/* close: the icons settle back in before the cover tips back up */
		--settle: 300ms;

		position: relative;
		width: 100%;
		aspect-ratio: 300 / 249;
		isolation: isolate;
		container-type: inline-size;
		perspective: 900px;
		perspective-origin: 50% 40%;
		cursor: pointer;
	}

	/* ---- folder shells ---------------------------------------------------- */
	.shell {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.shell--back {
		z-index: 1;
	}
	.back {
		fill: #5a3a30;
	}
	.front {
		fill: url(#tools-folder-face);
		stroke: rgba(255, 245, 235, 0.55);
		stroke-width: 1.5;
	}

	/* ---- the icons -------------------------------------------------------- */
	/* always between the back panel and the cover — never in front of it */
	.icons {
		position: absolute;
		inset: 0;
		z-index: 2;
	}
	.icon {
		position: absolute;
		left: 50%;
		/* same distance below the flap's tab as before the folder grew taller */
		top: 37.1%;
		--icon: clamp(calc(2.3rem + 16px), calc(15cqw + 16px), calc(3.6rem + 16px));
		width: var(--icon);
		aspect-ratio: 1;
		/* resting: tucked in the folder, the front row's tops just peeking over
		   the flap — the clamp follows its S-curve, high on the left and low on
		   the right — and the back row hidden behind the cover */
		transform: translate(
				calc(-50% + (var(--x) * 1.1rem)),
				calc(
					-50% + clamp(-1.5rem, var(--x) * 1rem - 0.5rem, -0.19rem) + 1rem + 3px +
						(var(--row) * 1.5rem)
				)
			)
			scale(0.8)
			rotate(calc(var(--rotate) * 0.4));
		/* closing: back into the folder first, so the cover has something to
		   close over */
		transition: transform var(--settle) ease-in-out;
		will-change: transform;
	}
	.icon img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 10px 14px rgba(58, 34, 29, 0.24));
		/* the parent may stretch the whole deck taller (--deck-stretch); undo it
		   here so the logos stay square */
		scale: 1 calc(1 / var(--deck-stretch, 1));
	}
	/* open: up out of the folder once the cover has swung, one after another.
	   Just high enough to stay connected to the folder: the bottom row's lower
	   edges stay tucked behind the tipped cover — dropping a little more on the
	   right, where the flap sits lower. Positions come from pack(); the vertical
	   step undoes the deck's stretch so the gap between rows stays true too. */
	.deck:is(:hover, :focus-visible, .is-open) .icon {
		transform: translate(
				calc(-50% + (var(--x) * var(--icon)) + var(--gx)),
				calc(
					-50% + ((var(--y) * var(--icon) + var(--gy)) / var(--deck-stretch, 1)) - 20px +
						(clamp(0, var(--x), 1.5) * 10px)
				)
			)
			scale(1)
			rotate(var(--rotate));
		transition: transform var(--rise) var(--ease-back)
			calc(var(--rise-delay) + var(--i) * 30ms);
	}

	/* ---- the cover -------------------------------------------------------- */
	.cover {
		position: absolute;
		z-index: 3;
		inset: 0;
		/* the hinge: the bottom fold (y = 243 of 249 in the drawing) */
		transform-origin: 50% 97.59%;
		/* closing: wait for the icons to settle, then tip back up */
		transition: transform var(--flip) ease-in-out var(--settle);
	}
	.cover .shell {
		filter: drop-shadow(0 18px 28px rgba(58, 34, 29, 0.3));
	}
	/* open: springs forward over the fold */
	.deck:is(:hover, :focus-visible, .is-open) .cover {
		transform: rotateX(-20deg);
		transition: transform var(--spring-dur) var(--spring);
	}

	/* ---- label ------------------------------------------------------------ */
	.label {
		position: absolute;
		left: 12%;
		bottom: 12%;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		color: #fff;
		pointer-events: none;
	}
	.label strong {
		font-size: clamp(1rem, 6cqw, 1.45rem);
		line-height: 1.1;
	}
	.deck:focus-visible {
		outline: 2px solid var(--c-accent-deep);
		outline-offset: 8px;
		border-radius: 12px;
	}
	@media (prefers-reduced-motion: reduce) {
		.icon,
		.cover,
		.deck:is(:hover, :focus-visible, .is-open) :is(.icon, .cover) {
			transition: none;
		}
	}
</style>
