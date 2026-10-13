<script>
	import { onMount } from 'svelte';
	import { cursor, DEFAULT_LABEL } from '$motion/cursor.svelte.js';

	/**
	 * Custom cursor: a heart that follows the pointer and drops a falling path of
	 * mini hearts (they sway, spin and fade). It is the ONLY pointer — the native
	 * cursor is hidden site-wide (see app.css) — and a pill beside it says where
	 * the visitor is: "You" over empty space, or the label of the element tagged
	 * with `use:cursorLabel` (e.g. "Me" over the portrait).
	 * Mouse / trackpad only; the mini-heart trail is skipped for reduced motion.
	 */

	let visible = $state(false);
	let pressed = $state(false);
	let dotEl = $state(null);
	let canvasEl = $state(null);

	onMount(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return; // touch → native cursor
		document.documentElement.classList.add('has-custom-cursor');

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const styles = getComputedStyle(document.documentElement);
		const accentColor = styles.getPropertyValue('--c-accent').trim() || '#ff6a3d';

		/* ---- palette under the pointer ------------------------------------ */
		/* This element lives in the layout, outside every section, so it can't
		   inherit the palette of the band it happens to be floating over — a
		   light heart would vanish on the hero, a dark one on the black
		   sections. So sample --c-cursor / --c-cursor-ink from whatever is
		   actually under the pointer, and only when that element changes. */
		let inkColor = styles.getPropertyValue('--c-cursor').trim() || '#3a221d';
		let lastHit = null;

		const samplePalette = (x, y) => {
			// the cursor itself is pointer-events: none, so this is the page below
			const el = document.elementFromPoint(x, y);
			if (!el || el === lastHit) return;
			lastHit = el;
			const cs = getComputedStyle(el);
			const ink = cs.getPropertyValue('--c-cursor').trim();
			const paper = cs.getPropertyValue('--c-cursor-ink').trim();
			if (ink) {
				inkColor = ink;
				dotEl?.style.setProperty('--cur-ink', ink);
			}
			if (paper) dotEl?.style.setProperty('--cur-paper', paper);
		};

		const ctx = canvasEl.getContext('2d');
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		let w = 0,
			h = 0;
		const resize = () => {
			w = window.innerWidth;
			h = window.innerHeight;
			canvasEl.width = w * dpr;
			canvasEl.height = h * dpr;
			canvasEl.style.width = w + 'px';
			canvasEl.style.height = h + 'px';
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener('resize', resize);

		let tx = w / 2,
			ty = h / 2,
			rx = tx,
			ry = ty,
			lastX = rx,
			lastY = ry,
			prevT = performance.now(),
			distAccum = 0,
			raf;

		const hearts = []; // the falling mini-heart path
		const MAX_HEARTS = 70;
		const EMIT_EVERY = 34; // px travelled between drops (sparse + minimal)

		const onMove = (e) => {
			tx = e.clientX;
			ty = e.clientY;
			if (!visible) visible = true;
			samplePalette(e.clientX, e.clientY);
			wake();
		};
		const onDown = () => (pressed = true);
		const onUp = () => (pressed = false);
		const onEnter = () => (visible = true);
		const onOut = (e) => {
			if (!e.relatedTarget) visible = false; // pointer left the window
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('pointerdown', onDown, { passive: true });
		window.addEventListener('pointerup', onUp, { passive: true });
		document.addEventListener('pointerenter', onEnter);
		document.addEventListener('pointerout', onOut);

		/* A modal <dialog> opens in the browser's top layer, above any z-index —
		   so the heart would vanish behind it and the visitor would be left with
		   no pointer at all. Make the heart a manual popover (also top layer) and
		   re-show it whenever a dialog opens, which puts it back on top. */
		const promote = () => {
			if (!dotEl?.showPopover) return;
			try {
				if (dotEl.matches(':popover-open')) dotEl.hidePopover();
				dotEl.showPopover();
			} catch {
				/* older engines: the heart just stays in normal flow */
			}
		};
		promote();
		const dialogWatch = new MutationObserver(promote);
		dialogWatch.observe(document.body, {
			subtree: true,
			attributes: true,
			attributeFilter: ['open']
		});

		/** filled heart centred on (cx, cy), pointing down as it falls */
		const drawHeart = (cx, cy, size, rot, color, alpha) => {
			const s = size;
			const t = s * 0.3;
			ctx.save();
			ctx.translate(cx, cy);
			ctx.rotate(rot);
			ctx.translate(0, -s / 2);
			ctx.beginPath();
			ctx.moveTo(0, t);
			ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, t);
			ctx.bezierCurveTo(-s / 2, (s + t) / 2, 0, (s + t) / 2, 0, s);
			ctx.bezierCurveTo(0, (s + t) / 2, s / 2, (s + t) / 2, s / 2, t);
			ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, t);
			ctx.closePath();
			ctx.globalAlpha = alpha;
			ctx.fillStyle = color;
			ctx.fill();
			ctx.restore();
		};

		/* The loop only runs while there is something to animate (the heart is
		   still easing toward the pointer, or mini hearts are falling). Once
		   everything has settled it stops, so an idle page costs no frames. */
		const wake = () => {
			if (raf) return;
			prevT = performance.now();
			raf = requestAnimationFrame(tick);
		};

		const tick = (now) => {
			raf = 0;
			const dt = Math.min(48, now - prevT);
			prevT = now;
			const step = dt / 16; // ~1 at 60fps

			const k = reduce ? 1 : 0.2;
			rx += (tx - rx) * k;
			ry += (ty - ry) * k;
			if (dotEl) dotEl.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

			if (reduce) {
				if (Math.abs(tx - rx) > 0.1 || Math.abs(ty - ry) > 0.1) raf = requestAnimationFrame(tick);
				return;
			}

			const vx = rx - lastX;
			const vy = ry - lastY;
			const speed = Math.hypot(vx, vy);
			lastX = rx;
			lastY = ry;

			const labelled = cursor.label !== '';

			// drop a mini heart every EMIT_EVERY px of travel
			distAccum += speed;
			if (!labelled && visible && distAccum >= EMIT_EVERY && hearts.length < MAX_HEARTS) {
				distAccum = 0;
				hearts.push({
					x: rx + (Math.random() * 6 - 3),
					y: ry + (Math.random() * 6 - 3),
					vx: vx * 0.1 + (Math.random() * 0.5 - 0.25),
					vy: vy * 0.06 + Math.random() * 0.25,
					rot: Math.random() * Math.PI * 2,
					vr: Math.random() * 0.06 - 0.03,
					size: 3 + Math.random() * 3, // 3–6px, deliberately tiny
					sway: Math.random() * Math.PI * 2,
					life: 1,
					decay: 0.008 + Math.random() * 0.007,
					tint: Math.random() < 0.16 ? accentColor : inkColor
				});
			}

			ctx.clearRect(0, 0, w, h);

			for (let i = hearts.length - 1; i >= 0; i--) {
				const p = hearts[i];
				p.life -= p.decay * step;
				if (p.life <= 0) {
					hearts.splice(i, 1);
					continue;
				}
				p.vy += 0.02 * step; // gravity
				p.sway += 0.1 * step;
				p.x += (p.vx + Math.sin(p.sway) * 0.35) * step;
				p.y += p.vy * step;
				p.rot += p.vr * step;

				const alpha = Math.min(1, p.life * 1.5) * 0.55;
				const size = p.size * (0.5 + 0.5 * p.life);
				drawHeart(p.x, p.y, size, p.rot, p.tint, alpha);
			}
			ctx.globalAlpha = 1;

			const settled = Math.abs(tx - rx) < 0.1 && Math.abs(ty - ry) < 0.1;
			if (!settled || hearts.length > 0) raf = requestAnimationFrame(tick);
		};
		wake();

		return () => {
			if (raf) cancelAnimationFrame(raf);
			dialogWatch.disconnect();
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			document.removeEventListener('pointerenter', onEnter);
			document.removeEventListener('pointerout', onOut);
			document.documentElement.classList.remove('has-custom-cursor');
		};
	});
</script>

<canvas bind:this={canvasEl} class="trail" class:visible aria-hidden="true"></canvas>

<div
	bind:this={dotEl}
	popover="manual"
	class="cursor"
	class:visible
	class:pressed
	class:labelled={cursor.label !== ''}
	data-variant={cursor.variant || null}
	aria-hidden="true"
>
	<svg class="dot" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
		/>
	</svg>
	<!-- keyed so the pill pops again each time the place changes -->
	{#key cursor.label || DEFAULT_LABEL}
		<span class="label">{cursor.label || DEFAULT_LABEL}</span>
	{/key}
</div>

<style>
	.trail {
		position: fixed;
		inset: 0;
		z-index: 9998;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.trail.visible {
		opacity: 1;
	}

	.cursor {
		/* it is a popover (top layer, to clear dialogs) — undo the UA box */
		inset: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		overflow: visible;
		width: auto;
		height: auto;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.25s ease;
		will-change: transform;
	}
	.cursor.visible {
		opacity: 1;
	}

	.dot {
		flex: none;
		width: 34px;
		height: 34px;
		margin: -17px 0 0 -17px; /* centre the heart on the pointer */
		/* --cur-ink is set from the section under the pointer; the token is the
		   fallback for the first frame, before the first pointermove lands */
		color: var(--cur-ink, var(--c-cursor));
		/* a fixed dark shadow: the inherited --c-ink-rgb is the dark page's
		   near-white, which drew an invisible halo on the light sections */
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.28));
		transition: transform 0.28s var(--ease-back);
	}
	.cursor.labelled .dot {
		transform: scale(0.55);
	}
	.cursor.pressed .dot {
		transform: scale(1.28);
	}
	.cursor.pressed.labelled .dot {
		transform: scale(0.7);
	}

	.label {
		margin-top: -1.9em;
		padding: 0.32rem 0.66rem;
		border-radius: 999px;
		/* pill + text are a contrasting PAIR taken from the section under the
		   pointer. It used to be --c-ink on --c-bg, which resolved against the
		   layout root: a near-white pill with beige text, on every section. */
		background: var(--cur-ink, var(--c-cursor));
		color: var(--cur-paper, var(--c-cursor-ink));
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		font-family: var(--font-body);
		font-size: 0.78rem;
		font-weight: 600;
		line-height: 1;
		white-space: nowrap;
		transform-origin: 0 50%;
		animation: cursor-pop 0.28s var(--ease-back);
	}

	/* project cards: a light pill with dark text, so hovering a card never drops
	   a dark blob on it (the heart itself keeps the section's ink) */
	.cursor[data-variant='card'] .label {
		background: #ffffff;
		color: #1d1d1f;
		box-shadow:
			0 0 0 1px rgba(29, 29, 31, 0.1),
			0 4px 14px rgba(0, 0, 0, 0.12);
	}

	@keyframes cursor-pop {
		from {
			opacity: 0;
			transform: scale(0.55) translateX(-4px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.trail {
			display: none;
		}
		.dot,
		.label {
			transition: none;
			animation: none;
		}
	}
</style>
