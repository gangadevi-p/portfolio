<script>
	import { cursorLabel } from '$motion/cursor.svelte.js';

	let { icons = [] } = $props();

	/* Hover drives this on a mouse; touch has no hover, so a tap toggles it too. */
	let open = $state(false);
	const fan = [
		{ x: -2, y: 0.8, rotate: -14 },
		{ x: -1.1, y: 0.3, rotate: -8 },
		{ x: -0.2, y: 0, rotate: -3 },
		{ x: 0.85, y: 0.25, rotate: 6 },
		{ x: 1.85, y: 0.7, rotate: 13 },
		{ x: -1.45, y: 1.8, rotate: -12 },
		{ x: -0.45, y: 1.35, rotate: -5 },
		{ x: 0.55, y: 1.4, rotate: 7 },
		{ x: 1.5, y: 1.8, rotate: 14 }
	];

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
	<svg class="shell shell--back" viewBox="0 0 300 210" aria-hidden="true">
		<path
			class="back"
			d="M30 22h80c13 0 18 9 24 17 6 8 11 12 24 12h112c13 0 24 11 24 24v105c0 14-10 24-24 24H30c-14 0-24-10-24-24V46c0-13 10-24 24-24Z"
		/>
	</svg>

	<div class="icons" aria-hidden="true">
		{#each icons as icon, index (icon.name)}
			{@const position = fan[index] ?? fan[fan.length - 1]}
			<span
				class="icon"
				style={`--i: ${index}; --x: ${position.x}; --y: ${position.y}; --rotate: ${position.rotate}deg;`}
			>
				<img src={icon.src} alt="" loading="lazy" draggable="false" />
			</span>
		{/each}
	</div>

	<div class="cover">
		<svg class="shell" viewBox="0 0 300 210" aria-hidden="true">
			<defs>
				<linearGradient id="tools-folder-face" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#3a221d" />
					<stop offset="100%" stop-color="#ff6a3d" />
				</linearGradient>
			</defs>
			<path
				class="front"
				d="M30 60h80c13 0 18 9 24 17 6 8 11 12 24 12h112c13 0 24 11 24 24v67c0 14-10 24-24 24H30c-14 0-24-10-24-24V84c0-13 10-24 24-24Z"
			/>
		</svg>

		<div class="label">
			<strong>Tools</strong>
			<span>{icons.length} Files</span>
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
		aspect-ratio: 300 / 210;
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
		top: 44%;
		width: clamp(2.3rem, 15cqw, 3.6rem);
		aspect-ratio: 1;
		/* resting: tucked in the folder, the front row's tops just peeking over
		   the flap (it rises to the right, so they sit lower there) and the back
		   row hidden behind the cover */
		transform: translate(
				calc(-50% + (var(--x) * 1.1rem)),
				calc(-50% + (var(--x) * 0.4rem) + (var(--y) * 0.9rem) - 0.4rem)
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
	}
	/* open: up out of the folder once the cover has swung, one after another.
	   Still behind the cover, so it hides the bottom row's lower edges. */
	.deck:is(:hover, :focus-visible, .is-open) .icon {
		transform: translate(
				calc(-50% + (var(--x) * 3.15rem)),
				calc(-50% + (var(--y) * 2.15rem) - 4.3rem)
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
		/* the hinge: the bottom fold (y = 204 of 210 in the drawing) */
		transform-origin: 50% 97.14%;
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
	.label span {
		font-size: clamp(0.75rem, 4cqw, 1rem);
		font-weight: 600;
		color: rgba(255, 255, 255, 0.82);
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
