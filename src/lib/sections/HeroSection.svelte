<script>
	import { hero } from '$data/hero.js';
	import { pointer } from '$motion/pointer.svelte.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	import SiteNav from '$components/SiteNav.svelte';
	import ParallaxImage from '$components/ParallaxImage.svelte';
	import SkillsDeck from '$components/SkillsDeck.svelte';
	import ToolsDeck from '$components/ToolsDeck.svelte';
</script>

<section id="me" class="hero" use:pointer.track>
	<div class="frame">
		<SiteNav />

		<div class="headline">
			<span class="kicker">{hero.kicker}</span>
			<span class="name-mask">
				<h1 class="name">{hero.name}</h1>
			</span>
		</div>

		<!-- Keep the two interactive folders together, with one shared gap. -->
		<div class="deck-row">
			<div class="deck-slot skills-slot">
				<SkillsDeck />
			</div>
			<div class="deck-slot tools-slot">
				<ToolsDeck icons={hero.icons} />
			</div>
		</div>

		<div class="hero-photo" use:cursorLabel={hero.photo.label}>
			<ParallaxImage src={hero.photo.src} alt={hero.photo.alt} depth={-0.04} />
		</div>
	</div>
</section>

<style>
	.hero {
		padding: clamp(0.75rem, 2vw, 1.5rem) var(--pad-x);
		background: var(--c-bg);
		color: var(--c-ink);
		/* re-assert the light palette — the rest of the page is dark */
		--c-ink: var(--c-coffee);
		--c-ink-soft: #6e6e73;
		--c-line: #d2d2d7;
		--c-surface: #ffffff;
		--c-ink-rgb: 29, 29, 31;
		/* dark heart / pill on the light hero — see tokens.css */
		--c-cursor: #1d1d1f;
		--c-cursor-ink: #ffffff;
	}
	/* ---- intro reveal ------------------------------------------------------
	   Plain CSS in place of a GSAP timeline: same choreography (frame, nav,
	   kicker, name, decks, photo, in that order) without a JS scheduler that
	   can stall partway and leave elements stuck invisible. */
	@keyframes hero-in {
		from {
			opacity: 0;
			transform: translateY(var(--hero-in-y, 12px));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.frame {
		animation: hero-in 0.5s ease-out both;
	}
	.frame :global(.nav) {
		--hero-in-y: -12px;
		animation: hero-in 0.45s ease-out 0.1s both;
	}
	.kicker {
		animation: hero-in 0.45s ease-out 0.2s both;
	}
	.name {
		animation: hero-in 0.6s ease-out 0.3s both;
	}
	.deck-slot {
		opacity: 0;
		animation: hero-in 0.4s ease-out both;
	}
	.skills-slot {
		animation-delay: 0.45s;
	}
	.tools-slot {
		animation-delay: 0.51s;
	}
	.hero-photo {
		animation: hero-in 0.7s ease-out 0.5s both;
	}
	@media (prefers-reduced-motion: reduce) {
		.frame,
		.frame :global(.nav),
		.kicker,
		.name,
		.deck-slot,
		.hero-photo {
			animation: none;
			opacity: 1;
		}
	}

	.frame {
		position: relative;
		max-width: var(--maxw);
		margin-inline: auto;
		min-height: min(84svh, 860px);
		padding: var(--frame-pad);
		border-radius: clamp(1.5rem, 3vw, 2.5rem);
		background: linear-gradient(145deg, #ffffff, #f2f2f5);
		box-shadow: 0 20px 60px rgb(29 29 31 / 8%);
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
		/* lifted 24px clear of the portrait; --photo-top still reads the
		   unshifted --headline-mt, so the photo itself doesn't move */
		margin-top: calc(var(--headline-mt) - 24px);
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
		font-weight: 700;
		font-size: var(--name-fs);
		line-height: 0.86;
		letter-spacing: -0.075em;
	}

	.deck-row {
		position: absolute;
		left: max(1rem, calc(clamp(1rem, 6vw, 5rem) - 32px));
		bottom: clamp(3rem, 14vw, 8rem);
		z-index: 7;
		display: flex;
		align-items: flex-end;
		gap: 20px;
	}
	.deck-slot {
		flex: none;
		pointer-events: auto;
	}
	.skills-slot {
		width: min(220px, 78vw);
		/* 219px drawn height, stretched ×1.092 below. */
		height: 239px;
		rotate: -3deg;
	}
	.skills-slot :global(.deck) {
		height: auto;
		aspect-ratio: 300 / 298;
		transform: scaleY(1.092);
		transform-origin: top center;
	}
	.tools-slot {
		width: min(220px, 48vw);
		/* 183px drawn height, stretched ×1.26 below. The offset keeps its visible top lower. */
		height: 230px;
		translate: 0 104px;
	}
	.tools-slot :global(.deck) {
		/* ToolsDeck reads this to keep its icons square inside the stretch */
		--deck-stretch: 1.26;
		height: auto;
		aspect-ratio: 300 / 249;
		transform: scaleY(var(--deck-stretch));
		transform-origin: top center;
	}

	.hero-photo {
		position: absolute;
		right: 0;
		/* top edge anchored to the name: she rises into "evi" and no further */
		top: var(--photo-top);
		/* Stop at the frame edge so the portrait stays inside the rectangle. */
		bottom: 0;
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
		/* 8px shorter than the box would give it: trim the width by the
		   photo's 1100:1319 ratio so height drops by exactly 8px, undistorted */
		width: calc(100% - 8px * 1100 / 1319);
		margin-left: auto; /* keep her right edge where it was */
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
		.deck-row {
			bottom: 2rem;
			flex-direction: column;
			align-items: flex-start;
		}
		.skills-slot {
			height: auto;
		}
		.skills-slot :global(.deck) {
			transform: none;
		}
		.tools-slot {
			width: min(220px, 52vw);
			height: auto;
			translate: none;
		}
		.tools-slot :global(.deck) {
			--deck-stretch: 1;
			height: auto;
			aspect-ratio: 300 / 249;
			transform: none;
		}
	}

	/* Below ~600px the nav pill itself wraps onto two lines (not enough room
	   for brand + 5 links + the assistant launcher on one row), which makes
	   the nav taller than the collage's fixed overlap math assumes — the
	   photo would ride up over the wrapped nav. Simplest fix: stop
	   absolutely-positioning the photo and the deck cards here and just
	   stack everything in normal document flow instead. */
	@media (max-width: 600px) {
		.frame {
			display: flex;
			flex-direction: column;
			min-height: 0;
		}
		.headline {
			margin-top: 1.25rem;
		}
		.hero-photo {
			order: 2;
			position: static;
			width: min(62%, 280px);
			max-width: none;
			height: auto;
			margin: 1rem auto 0;
			overflow: visible;
		}
		.hero-photo :global(img) {
			width: 100%;
		}
		.deck-row {
			order: 3;
			position: static;
			margin-top: 1.75rem;
			left: auto;
			bottom: auto;
		}
	}
</style>
