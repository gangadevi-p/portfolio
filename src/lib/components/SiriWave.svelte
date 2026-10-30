<script>
	/* The classic iPhone Siri waveform (the iOS 9 look): a white centre line
	   and ribbons of blue, red and green, each a sine wave under a bell-shaped
	   envelope, mirrored above and below, blended additively on black so the
	   crossings glow. It "listens" (loud, speech-like) and then settles.
	   `paused` freezes it with the card's CSS loop; the 9s timeline matches
	   the preview's. Reduced motion draws nothing. */
	let { paused = false } = $props();

	const LOOP = 9;

	/* one ribbon each: colour, spatial frequency, speed, height, width, phase,
	   and how fast its own height breathes */
	const RIBBONS = [
		['38, 120, 235', 2.2, 2.2, 1.0, 0.95, 0.0, 1.7],
		['38, 120, 235', 3.4, -2.9, 0.65, 0.7, 1.3, 2.3],
		['38, 120, 235', 1.5, 1.6, 0.8, 1.2, 0.6, 1.3],
		['235, 70, 100', 2.8, 2.6, 0.9, 0.85, 2.1, 2.0],
		['235, 70, 100', 1.9, -2.1, 0.7, 1.1, 3.0, 1.5],
		['235, 70, 100', 3.8, 3.2, 0.5, 0.6, 0.2, 2.7],
		['48, 220, 155', 2.0, -2.4, 0.95, 1.0, 4.0, 1.8],
		['48, 220, 155', 3.1, 2.8, 0.6, 0.75, 5.2, 2.2],
		['48, 220, 155', 1.3, -1.7, 0.75, 1.25, 1.1, 1.2]
	];

	/* the tapering that makes the wave bulge in the middle and vanish at the ends */
	const bell = (x) => Math.pow(4 / (4 + Math.pow(x, 4)), 4);
	const smooth = (a, b, t) => {
		const u = Math.min(1, Math.max(0, (t - a) / (b - a)));
		return u * u * (3 - 2 * u);
	};

	/** how loud it is `t` seconds into the loop: silent, speaking, then settled */
	function loudness(t) {
		const speaking = smooth(0.6, 1.1, t) * (1 - smooth(2.9, 3.7, t));
		const speech = 0.72 + 0.28 * Math.sin(t * 7.3) * Math.sin(t * 2.9 + 1);
		const settled = smooth(0.6, 1.1, t) * (0.1 + 0.03 * Math.sin(t * 3));
		return speaking * speech + settled * (1 - speaking);
	}

	let canvas;
	let clock = 0;

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const ctx = canvas.getContext('2d');
		let raf = 0;
		let last = 0;
		let width = 0;
		let height = 0;

		const fit = () => {
			const ratio = window.devicePixelRatio || 1;
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			canvas.width = Math.round(width * ratio);
			canvas.height = Math.round(height * ratio);
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		};
		fit();
		const resize = new ResizeObserver(fit);
		resize.observe(canvas);

		const draw = () => {
			const t = clock % LOOP;
			const level = loudness(t);
			const mid = height / 2;
			ctx.clearRect(0, 0, width, height);
			ctx.globalCompositeOperation = 'lighter';
			ctx.lineWidth = 1.4;
			ctx.lineJoin = 'round';

			for (const [rgb, k, speed, amp, spread, phase, breathe] of RIBBONS) {
				const own = 0.68 + 0.32 * Math.sin(clock * breathe + phase * 2);
				const reach = mid * 1.12 * level * amp * own;
				for (const sign of [1, -1]) {
					ctx.beginPath();
					for (let px = 0; px <= width; px += 2) {
						const x = (px / width) * 3.7 - 1.85;
						const y = Math.sin(k * x * 2.3 - speed * clock + phase) * bell(x / spread) * reach * sign;
						if (px === 0) ctx.moveTo(px, mid + y);
						else ctx.lineTo(px, mid + y);
					}
					ctx.strokeStyle = `rgba(${rgb}, 0.85)`;
					ctx.stroke();
				}
			}

			// the white support line down the middle, brightest at the centre
			const line = ctx.createLinearGradient(0, 0, width, 0);
			line.addColorStop(0, 'rgba(255, 255, 255, 0)');
			line.addColorStop(0.3, 'rgba(255, 255, 255, 0.55)');
			line.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
			line.addColorStop(0.7, 'rgba(255, 255, 255, 0.55)');
			line.addColorStop(1, 'rgba(255, 255, 255, 0)');
			ctx.strokeStyle = line;
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.moveTo(0, mid);
			ctx.lineTo(width, mid);
			ctx.stroke();
		};

		const loop = (now) => {
			if (!paused && last) clock += Math.min(0.1, (now - last) / 1000);
			last = now;
			draw();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			resize.disconnect();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
