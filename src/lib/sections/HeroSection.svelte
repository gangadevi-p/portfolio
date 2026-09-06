<script>
	import { onMount } from 'svelte';
	import { hero } from '$data/hero.js';
	import { pointer } from '$motion/pointer.svelte.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { loadGsap, prefersReducedMotion } from '$motion/gsap.js';

	import SiteNav from '$components/SiteNav.svelte';
	import FloatingIcon from '$components/FloatingIcon.svelte';
	import ParallaxImage from '$components/ParallaxImage.svelte';
	import SpeechBubble from '$components/SpeechBubble.svelte';

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
						'.icon-slot',
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
		<SiteNav active="ME" />

		<div class="headline">
			<span class="kicker">{hero.kicker}</span>
			<span class="name-mask">
				<h1 class="name">{hero.name}</h1>
			</span>
		</div>

		<!-- floating app badges -->
		<div class="stage" aria-hidden="true">
			{#each hero.icons as icon, i (icon.name)}
				<div
					class="icon-slot"
					style="left: {icon.x}%; top: {icon.y}%;"
					use:cursorLabel={icon.name}
				>
					<FloatingIcon {...icon} index={i} />
				</div>
			{/each}
		</div>

		<div class="hero-speech">
			<SpeechBubble title={hero.speech.title} lines={hero.speech.lines} />
		</div>

		<div class="hero-photo" use:cursorLabel={hero.photo.label}>
			<ParallaxImage src={hero.photo.src} alt={hero.photo.alt} depth={-0.06} />
		</div>
	</div>
</section>

<style>
	.hero {
		padding: var(--pad-y) var(--pad-x) var(--pad-y);
		background: var(--c-bg);
		color: var(--c-ink);
		/* re-assert the light palette — the rest of the page is dark */
		--c-ink: #3a221d;
		--c-ink-soft: #6b5750;
		--c-line: rgba(58, 34, 29, 0.22);
		--c-surface: #ede7dd;
		--c-ink-rgb: 58, 34, 29;
	}
	.frame {
		position: relative;
		max-width: var(--maxw);
		margin-inline: auto;
		min-height: min(92svh, 900px);
		padding: clamp(1.25rem, 3vw, 2.5rem);
		border-radius: var(--radius);
		/* visible so the oversized display name is never cropped at the frame edge —
		   it now runs on into the portrait, which is a transparent cut-out */
		overflow: visible;
	}

	.headline {
		position: relative;
		z-index: 3;
		margin-top: clamp(1rem, 6vw, 3.5rem);
		pointer-events: none;
	}
	.kicker {
		display: inline-block;
		margin-left: 0.35em;
		font-size: var(--fs-lead);
		font-weight: 700;
		letter-spacing: 0.01em;
	}
	.name-mask {
		display: block;
		/* only as wide as the word, so `overflow: hidden` still masks the
		   vertical slide-up reveal but never truncates it horizontally */
		width: max-content;
		max-width: none;
		overflow: hidden;
		/* headroom so the mask-reveal doesn't crop the caps or the 'g' descender,
		   pulled back with negative margins so layout is unchanged */
		padding: 0.1em 0.04em 0.22em;
		margin: -0.1em -0.04em -0.22em;
	}
	.name {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: var(--fs-display);
		line-height: 0.9;
		letter-spacing: -0.005em;
	}

	.stage {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
	}
	.icon-slot {
		position: absolute;
		translate: -50% -50%;
		pointer-events: auto; /* hoverable for the custom cursor label */
	}

	.hero-speech {
		position: absolute;
		left: clamp(1rem, 6vw, 5rem);
		bottom: clamp(3rem, 14vw, 8rem);
		z-index: 4;
		width: min(290px, 62vw);
		rotate: -3deg;
	}

	.hero-photo {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 6; /* in front of the headline — photo overlaps the name */
		/* fluid: a share of the frame, capped so it never gets huge on wide screens.
		   no px floor — it keeps shrinking with the viewport. */
		width: 46%;
		max-width: 560px;
	}
	.hero-photo :global(img) {
		display: block;
		width: 100%;
		height: auto; /* preserve aspect ratio, never a fixed height */
	}

	@media (max-width: 760px) {
		.frame {
			min-height: 82svh;
		}
		.name {
			font-size: clamp(3.5rem, 23vw, 6.5rem);
		}
		.hero-photo {
			width: 60%;
			max-width: 340px;
			opacity: 0.92;
			z-index: 1; /* drop behind the copy on small screens */
		}
		.hero-speech {
			bottom: 9rem;
			z-index: 4;
		}
	}
</style>
