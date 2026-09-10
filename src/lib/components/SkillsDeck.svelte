<script>
	import { cursorLabel } from '$motion/cursor.svelte.js';

	/* Hover drives this on a mouse; touch has no hover, so a tap toggles it too. */
	let open = $state(false);

	function toggle() {
		open = !open;
	}

	function onKeydown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		}
	}

	/** The two sheets inside the folder. */
	const sheets = [
		{
			key: 'design',
			title: 'Design',
			items: [
				'Product design',
				'Info architecture',
				'Design systems',
				'Typo, layout & spacing',
				'Interaction design'
			]
		},
		{
			key: 'outside-figma',
			title: 'Outside Figma',
			items: ['Problem framing', 'User research', 'Product thinking', 'UX flows']
		}
	];
</script>

<!-- A folder that opens on hover. The stack is, back to front:
     folder back panel -> the sheets -> front cover. The cover tips forward on its
     bottom fold while the sheets rise up out of the folder behind it. -->
<div
	class="deck"
	class:is-open={open}
	role="button"
	tabindex="0"
	aria-expanded={open}
	aria-label="Skills"
	onclick={toggle}
	onkeydown={onKeydown}
	use:cursorLabel={{ label: 'Explore skills', variant: 'view' }}
>
	<svg class="shell shell--back" viewBox="0 0 300 298" aria-hidden="true">
		<path
			class="back"
			d="M 36,18 H 264 A 20,20 0 0 1 284,38 V 272 A 20,20 0 0 1 264,292 H 36 A 20,20 0 0 1 16,272 V 38 A 20,20 0 0 1 36,18 Z"
		/>
	</svg>

	{#each sheets as sheet (sheet.key)}
		<article class="sheet sheet--{sheet.key}">
			<h2>{sheet.title}</h2>
			<ul>
				{#each sheet.items as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</article>
	{/each}

	<div class="cover">
		<svg class="shell" viewBox="0 0 300 298" aria-hidden="true">
			<defs>
				<linearGradient id="folder-face" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="var(--folder-top)" />
					<stop offset="100%" stop-color="var(--folder-bottom)" />
				</linearGradient>
			</defs>
			<!-- the raised tab on the left, then an S-curve down to the body -->
			<path
				class="front"
				d="M 28,56 H 116 C 128,56 132,64 138,72 C 144,80 148,84 160,84 H 272 A 22,22 0 0 1 294,106 V 270 A 22,22 0 0 1 272,292 H 28 A 22,22 0 0 1 6,270 V 78 A 22,22 0 0 1 28,56 Z"
			/>
		</svg>

		<div class="label">
			<strong>Skills</strong>
		</div>
	</div>
</div>

<style>
	.deck {
		--folder-top: #3a221d;
		--folder-bottom: #ff6a3d;
		--sheet-bg: #4a352f;
		/* the skill cards' own face — headings and lists */
		--font-card: 'Montserrat', var(--font-body);
		/* open: the cover springs forward; once it has swung out, the sheets pop up */
		--flip: 560ms;
		/* damped spring (stiffness 170, damping 12): overshoots ~20% at 270ms,
		   settles by 700ms */
		--spring: linear(0, 0.03, 0.108, 0.222, 0.356, 0.499, 0.64, 0.773, 0.891, 0.991, 1.07, 1.129, 1.169, 1.19, 1.196, 1.19, 1.174, 1.152, 1.125, 1.097, 1.069, 1.043, 1.02, 1.001, 0.986, 0.974, 0.967, 0.963, 0.961, 0.963, 0.966, 0.97, 0.976, 0.981, 0.987, 0.992, 1);
		--spring-dur: 700ms;
		--rise: 460ms;
		/* just past the spring's peak */
		--rise-delay: 300ms;
		/* close: the sheets settle back in before the cover tips back up */
		--settle: 300ms;

		position: relative;
		width: 100%;
		aspect-ratio: 300 / 298;
		isolation: isolate;
		/* so the sheet type scales with the deck, not the viewport */
		container-type: inline-size;
		/* gives the cover's tip real depth */
		perspective: 900px;
		perspective-origin: 50% 40%;
	}

	/* ---- folder shells ---------------------------------------------------- */
	.shell {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.shell--back {
		z-index: 1;
	}
	.back {
		/* a shade off the flap so the folder's back edge reads as its own strip */
		fill: #5a3a30;
	}
	.front {
		fill: url(#folder-face);
		stroke: rgba(255, 245, 235, 0.55);
		stroke-width: 1.5;
	}

	/* ---- the cover -------------------------------------------------------- */
	.cover {
		position: absolute;
		z-index: 3;
		inset: 0;
		/* the hinge: the bottom fold (y = 292 of 298 in the drawing) */
		transform-origin: 50% 97.99%;
		/* closing: wait for the sheets to settle, then tip back up */
		transition: transform var(--flip) ease-in-out var(--settle);
	}
	.cover .shell {
		filter: drop-shadow(0 18px 28px rgba(58, 34, 29, 0.32));
	}
	/* open: springs forward over the fold — just a nudge, not falling all the way open */
	.deck:is(:hover, :focus-visible, .is-open) .cover {
		transform: rotateX(-20deg);
		transition: transform var(--spring-dur) var(--spring);
	}

	/* ---- the sheets ------------------------------------------------------- */
	.sheet {
		position: absolute;
		z-index: 2;
		/* centred over the folder by the -50% in each transform */
		left: 50%;
		/* just below the tab, so only the top padding peeks above the closed flap */
		top: 16.6%;
		/* as wide as the longest item, so the 16px list never wraps */
		width: max-content;
		box-sizing: border-box;
		padding: 16px;
		border-radius: 14px;
		/* resting scale-down shrinks toward the top edge, keeping the peek in place */
		transform-origin: 50% 0;
		background: var(--sheet-bg);
		color: rgba(255, 248, 240, 0.92);
		box-shadow: 0 18px 34px -18px rgba(28, 15, 11, 0.75);
		/* closing: back into the folder first, so the cover has something to
		   close over */
		transition: transform var(--settle) ease-in-out;
		will-change: transform;
	}
	.sheet h2 {
		font-family: var(--font-card);
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0;
		line-height: 1;
	}
	.sheet ul {
		margin-top: 0.7rem;
		padding-left: 0;
		list-style: none;
		color: rgba(255, 246, 236, 0.78);
		font-family: var(--font-card);
		/* fixed body size, not scaled with the deck */
		font-size: 1rem;
		/* a lighter squeeze than the headings, so the list stays readable */
		letter-spacing: -0.5px;
		line-height: 1.35;
	}

	/* resting: tucked in the folder, only the top edges peeking out. Scaled down
	   while tucked — at full size the five-item list is taller than the flap and
	   its bottom would poke out underneath. */
	.sheet--design {
		transform: translate(-50%, 0) rotate(-2deg) scale(0.8);
	}
	/* sits lower than Design: it's over on the right, where the flap dips into
	   its S-curve, and any higher its heading shows above the closed flap */
	.sheet--outside-figma {
		transform: translate(-44%, 12%) rotate(3deg) scale(0.8);
	}

	/* open: up out of the folder, still behind the cover, so the cover hides
	   their bottom edges — side by side, Design on the left and Outside Figma to
	   its right, so neither card covers the other's list. Outside Figma sits
	   lower, its bottom-left corner still tucked behind the flap so it reads as
	   coming out of the folder. Only a nudge left for Design: the deck sits close
	   to the page edge and its overflow clip. */
	.deck:is(:hover, :focus-visible, .is-open) .sheet {
		transition: transform var(--rise) var(--ease-back) var(--rise-delay);
	}
	.deck:is(:hover, :focus-visible, .is-open) .sheet--design {
		transform: translate(calc(-50% - 26px), -97%) rotate(-5deg);
	}
	.deck:is(:hover, :focus-visible, .is-open) .sheet--outside-figma {
		transform: translate(calc(-50% + 176px), -57%) rotate(4deg);
	}

	/* phones: both cards side by side are wider than the screen, so they come out
	   a touch smaller and closer together */
	@media (max-width: 480px) {
		.deck:is(:hover, :focus-visible, .is-open) .sheet--design {
			transform: translate(calc(-50% - 37px), -97%) rotate(-5deg) scale(0.88);
		}
		.deck:is(:hover, :focus-visible, .is-open) .sheet--outside-figma {
			transform: translate(calc(-50% + 150px), -57%) rotate(4deg) scale(0.88);
		}
	}

	.deck:focus-visible {
		outline: 2px solid var(--c-accent-deep);
		outline-offset: 8px;
		border-radius: 12px;
	}

	/* ---- label ------------------------------------------------------------ */
	.label {
		position: absolute;
		left: 11%;
		bottom: 9%;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		color: #fff;
		pointer-events: none;
	}
	.label strong {
		font-size: clamp(0.95rem, 5cqw, 1.35rem);
		line-height: 1.1;
	}

	@media (prefers-reduced-motion: reduce) {
		.sheet,
		.cover,
		.deck:is(:hover, :focus-visible, .is-open) :is(.sheet, .cover) {
			transition: none;
		}
	}
</style>
