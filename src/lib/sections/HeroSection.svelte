<script>
	import { onMount } from 'svelte';
	import { hero } from '$data/hero.js';
	import { pointer } from '$motion/pointer.svelte.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { loadGsap, prefersReducedMotion } from '$motion/gsap.js';

	import SiteNav from '$components/SiteNav.svelte';
	import ParallaxImage from '$components/ParallaxImage.svelte';
	import SkillsDeck from '$components/SkillsDeck.svelte';
	import ToolsDeck from '$components/ToolsDeck.svelte';

	let root;

	onMount(() => {
		if (prefersReducedMotion()) return;

		let ctx;
		loadGsap().then(({ gsap }) => {
			ctx = gsap.context((self) => {
				const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

				tl.from('.nav', { y: -18, autoAlpha: 0, duration: 0.6 })
					.from('.kicker', { yPercent: 120, autoAlpha: 0, duration: 0.6 }, '-=0.2')
					.from('.name', { yPercent: 115, autoAlpha: 0, duration: 0.9 }, '-=0.3')
					// icons: only opacity + a hair of blur, so the parallax / bob
					// transforms on child layers are never touched.
					.from(
						'.tools-slot',
						{ autoAlpha: 0, filter: 'blur(6px)', duration: 0.5, stagger: 0.08 },
						'-=0.55'
					)
					.from(
						'.hero-photo',
						{ clipPath: 'inset(100% 0 0 0)', autoAlpha: 0, duration: 1 },
						'-=0.7'
					)
					.from(
						'.hero-speech',
						{ scale: 0.6, rotate: -9, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.6)' },
						'-=0.6'
					);
			}, root);
		});

		return () => ctx?.revert();
	});
</script>

<section id="me" class="hero" bind:this={root} use:pointer.track>
	<div class="frame">
		<SiteNav />

		<div class="headline">
			<span class="kicker">{hero.kicker}</span>
			<span class="name-mask">
				<h1 class="name">{hero.name}</h1>
			</span>
		</div>

		<!-- Tool icons live in a folder and rise out of it on hover, like the skills sheets. -->
		<div class="stage">
			<div class="tools-slot">
				<ToolsDeck icons={hero.icons} />
			</div>
		</div>

		<div class="hero-speech">
			<SkillsDeck />
		</div>

		<div class="hero-photo" use:cursorLabel={hero.photo.label}>
			<ParallaxImage src={hero.photo.src} alt={hero.photo.alt} depth={-0.04} />
		</div>
	</div>
</section>

<style>
	.hero {
		padding: var(--pad-y) var(--pad-x) var(--pad-y);
		background: var(--c-bg);
		color: var(--c-ink);
		/* re-assert the light palette — the rest of the page is dark */
		--c-ink: var(--c-coffee);
		--c-ink-soft: #6b5750;
		--c-line: rgba(58, 34, 29, 0.22);
		--c-surface: #ede7dd;
		--c-ink-rgb: 58, 34, 29;
		/* dark heart / pill on the light hero — see tokens.css */
		--c-cursor: #3a221d;
		--c-cursor-ink: #f7f5f0;
	}
	.frame {
		position: relative;
		max-width: var(--maxw);
		margin-inline: auto;
		min-height: min(92svh, 900px);
		padding: var(--frame-pad);
		border-radius: var(--radius);
		/* visible so the oversized display name is never cropped at the frame edge —
		   it now runs on into the portrait, which is a transparent cut-out */
		overflow: visible;

		--frame-pad: clamp(1.25rem, 3vw, 2.5rem);

		/* ---- vertical rhythm of the headline, as tokens ------------------- */
		/* the same values the elements below use, so the portrait can be
		   anchored to the name without measuring anything at runtime */
		--headline-mt: clamp(1rem, 6vw, 3.5rem);
		--name-fs: var(--fs-display);
		--kicker-h: calc(var(--fs-lead) * 1.2);
		--name-h: calc(var(--name-fs) * 0.9);

		/* How far the portrait's top edge rises into the name, measured up from
		   the bottom of the name's line box, in units of the display size.
		   Anton sits its baseline ~0.1em above that bottom and has a 0.54em
		   x-height, so 0.36em is exactly mid-"evi" — the deepest the letters
		   can be crossed and still read. Don't go past it. */
		--photo-overlap: calc(var(--name-fs) * 0.36);

		--photo-top: calc(
			var(--headline-mt) + var(--kicker-h) + var(--name-h) - var(--photo-overlap)
		);
	}

	.headline {
		position: relative;
		z-index: 3;
		margin-top: var(--headline-mt);
		pointer-events: none;
	}
	.kicker {
		/* block, with a pinned line-height, so its height is exactly
		   --kicker-h and the portrait anchor stays true */
		display: block;
		line-height: 1.2;
		margin-left: 0.35em;
		font-size: var(--fs-lead);
		font-weight: 700;
		letter-spacing: 0.01em;
	}
	.name-mask {
		display: block;
		/* the headroom below is written in `em`, so the mask has to carry the
		   display size itself — inheriting 1rem made 0.22em ≈ 3px and sheared
		   the descenders off the two g's */
		font-size: var(--name-fs);
		/* only as wide as the word, so `overflow: hidden` still masks the
		   vertical slide-up reveal but never truncates it horizontally */
		width: max-content;
		max-width: none;
		overflow: hidden;
		/* headroom so the mask-reveal doesn't crop the caps or the 'g' descender,
		   pulled back with negative margins so layout is unchanged.
		   Anton drops its 'g' ~0.17em below the 0.9 line box; 0.3em is margin. */
		padding: 0.1em 0.04em 0.3em;
		margin: -0.1em -0.04em -0.3em;
	}
	.name {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: var(--name-fs);
		line-height: 0.9;
		letter-spacing: -0.005em;
	}

	.stage {
		position: absolute;
		inset: 0;
		/* above the portrait, so the open tool deck reads in front */
		z-index: 6;
		pointer-events: none;
	}
	.tools-slot {
		position: absolute;
		left: 37%;
		bottom: clamp(2rem, 7vw, 4.5rem);
		width: min(260px, 48vw);
		pointer-events: auto;
	}

	.hero-speech {
		position: absolute;
		left: clamp(1rem, 6vw, 5rem);
		bottom: clamp(3rem, 14vw, 8rem);
		z-index: 7;
		/* the skill cards' 16px lists need the full 290px; on phones let it take
		   more of the width rather than shrink */
		width: min(290px, 78vw);
		rotate: -3deg;
	}

	.hero-photo {
		position: absolute;
		right: 0;
		/* top edge anchored to the name: she rises into "evi" and no further */
		top: var(--photo-top);
		/* down to the very bottom of the frame, past its padding */
		bottom: calc(var(--frame-pad) * -1);
		/* in FRONT of the headline — she overlaps the bottom of the letters */
		z-index: 5;
		/* fluid: a share of the frame, capped so it never gets huge on wide screens.
		   no px floor — it keeps shrinking with the viewport. */
		width: 48%;
		max-width: 600px;
		/* whatever of her doesn't fit is cropped at the bottom of the frame */
		overflow: hidden;
	}
	.hero-photo :global(img) {
		display: block;
		width: 100%;
		height: auto; /* preserve aspect ratio, never a fixed height */

	}

	@media (max-width: 760px) {
		.frame {
			min-height: 82svh;
			/* the anchor maths follow the smaller display size automatically */
			--name-fs: clamp(3.5rem, 23vw, 6.5rem);
		}
		.hero-photo {
			width: 66%;
			max-width: 360px;
		}
		.hero-speech {
			bottom: 9rem;
		}
		.tools-slot {
			left: 24%;
			bottom: 2rem;
			width: min(220px, 52vw);
		}
	}
</style>
