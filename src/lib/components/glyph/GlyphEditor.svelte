<script>
	import { frame, STILL } from './model.js';

	/* A custom capital G — a logo mark — alive in Figma's vector editor:
	   one path, its vertices in white with blue edges, handles shown for the
	   selected point only. A cursor picks one point at a time — a vertex or a
	   single handle — and drags it, so only that point changes. Off screen it
	   pauses; with reduced motion it rests on the first selected point. */
	let root;
	let scene = $state.raw(frame(STILL));

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			scene = frame(STILL);
			return;
		}
		let raf = 0;
		let last = 0;
		let clock = 0;
		let visible = true;
		const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		observer.observe(root);

		const loop = (now) => {
			if (visible) {
				if (last) clock += Math.min(0.1, (now - last) / 1000);
				scene = frame(clock);
			}
			last = now;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
		};
	});
</script>

<div
	class="glyph"
	bind:this={root}
	role="img"
	aria-label="A custom capital G logo being edited in Figma's vector editor: a cursor selects and drags one point at a time"
>
	<svg viewBox="0 0 1155 1362" aria-hidden="true">
		<rect width="1155" height="1362" fill="#1e1e1e" />

		<path d={scene.fill} fill="#fff" fill-rule="evenodd" />

		<!-- the path's edge in Figma blue -->
		{#each scene.outlines as d, i (i)}
			<path {d} class="edge" />
		{/each}

		<!-- handles: only the selected vertex shows them -->
		{#each scene.handles as h, i (i)}
			<line class="stem" x1={h.x1} y1={h.y1} x2={h.x2} y2={h.y2} />
			<circle class="knob" class:active={h.active} cx={h.x2} cy={h.y2} r="10" />
		{/each}

		{#each scene.vertices as v, i (i)}
			<circle class="vertex" class:selected={v.selected} cx={v.x} cy={v.y} r={v.selected ? 15 : 12} />
		{/each}

		<g class="cursor" transform="translate({scene.cursor.x} {scene.cursor.y}) scale(3.2)">
			<path d="M0 0v20.5l5.2-4.9 3.6 8.2 3.2-1.4-3.6-8h7.3z" />
		</g>

		<rect width="1155" height="1362" fill="#1e1e1e" opacity={scene.fade} />
	</svg>

	<!-- Figma's vector-edit toolbar -->
	<div class="bar" aria-hidden="true">
		<span class="tool on">
			<svg viewBox="0 0 16 16"><path d="M3.5 2.2v10.4l2.7-2.5 1.8 4 1.7-.8-1.8-3.9h3.7z" /></svg>
		</span>
		<span class="tool">
			<svg viewBox="0 0 16 16"><path d="M8 1.8 11.6 6 9.4 12.2H6.6L4.4 6zM8 6.8v3.2" /><circle cx="8" cy="6.9" r="0.9" /><path d="M5.2 14.3h5.6" /></svg>
		</span>
		<span class="tool">
			<svg viewBox="0 0 16 16"><path d="M2.5 12.5C4 6 9 4 13.5 4.5" /><circle cx="2.6" cy="12.4" r="1.3" /><circle cx="13.4" cy="4.6" r="1.3" /></svg>
		</span>
		<i></i>
		<span class="done">Done</span>
	</div>
</div>

<style>
	.glyph {
		position: relative;
		height: var(--shot-h);
		aspect-ratio: 1155 / 1362;
		border-radius: 10px;
		overflow: hidden;
		background: #1e1e1e;
		/* the site's heart cursor reads these off the element under it */
		--c-cursor: #fff;
		--c-cursor-ink: #111;
		--figma: #0d99ff;
	}
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* every stroke keeps a hairline weight however big the card is drawn */
	.edge,
	.stem,
	.knob,
	.vertex {
		vector-effect: non-scaling-stroke;
		stroke: var(--figma);
		stroke-width: 1.5px;
	}
	.edge {
		fill: none;
	}
	.knob {
		fill: #fff;
	}
	.knob.active {
		fill: var(--figma);
	}
	.vertex {
		fill: #fff;
	}
	.vertex.selected {
		fill: var(--figma);
		stroke: #fff;
	}

	.cursor path {
		fill: #000;
		stroke: #fff;
		stroke-width: 1.4;
		stroke-linejoin: round;
		filter: drop-shadow(0 1.2px 1.4px rgb(0 0 0 / 55%));
	}

	.bar {
		position: absolute;
		left: 50%;
		bottom: 9px;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 3px;
		border-radius: 8px;
		background: #2c2c2c;
		box-shadow:
			0 0 0 1px rgb(255 255 255 / 8%),
			0 6px 16px rgb(0 0 0 / 40%);
		transform: translateX(-50%);
	}
	.tool {
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border-radius: 5px;
		color: #fff;
	}
	.tool.on {
		background: var(--figma);
	}
	.tool svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.tool.on svg {
		fill: currentColor;
	}
	.bar i {
		width: 1px;
		height: 16px;
		margin-inline: 3px;
		background: rgb(255 255 255 / 18%);
	}
	.done {
		padding: 0 7px 0 4px;
		color: #fff;
		font-size: 11px;
		font-weight: 500;
		line-height: 24px;
	}

	@media (max-width: 720px) {
		.glyph {
			width: 100%;
			height: auto;
		}
	}
</style>
