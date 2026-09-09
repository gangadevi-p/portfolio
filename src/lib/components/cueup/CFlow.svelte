<script>
	/**
	 * User-flow diagram. Nodes and connectors are placed on the same 1020-wide
	 * canvas the page column uses, at the coordinates measured off the deck.
	 */
	import { revealScale } from '$motion/reveal.js';

	let { height = 300, nodes = [], links = [] } = $props();

	const W = 1020;

	/** rounded elbow polyline, so the corners match the deck's soft turns */
	function path(points, r = 10) {
		if (points.length < 2) return '';
		let d = `M ${points[0][0]} ${points[0][1]}`;
		for (let i = 1; i < points.length - 1; i++) {
			const [px, py] = points[i - 1];
			const [cx, cy] = points[i];
			const [nx, ny] = points[i + 1];
			const inLen = Math.hypot(cx - px, cy - py);
			const outLen = Math.hypot(nx - cx, ny - cy);
			const ri = Math.min(r, inLen / 2, outLen / 2);
			d += ` L ${cx + ((px - cx) / inLen) * ri} ${cy + ((py - cy) / inLen) * ri}`;
			d += ` Q ${cx} ${cy} ${cx + ((nx - cx) / outLen) * ri} ${cy + ((ny - cy) / outLen) * ri}`;
		}
		const last = points[points.length - 1];
		return `${d} L ${last[0]} ${last[1]}`;
	}
</script>

<div class="flow cu-card" style="--h:{height}px" use:revealScale>
	<svg class="wires" viewBox="0 0 {W} {height}" aria-hidden="true">
		<defs>
			{#each ['home', 'fuchsia', 'lime', 'violet', 'amber', 'orange', 'blue', 'pink'] as tone (tone)}
				<marker
					id="cu-arrow-{tone}"
					markerWidth="7"
					markerHeight="7"
					refX="5.6"
					refY="3"
					orient="auto"
				>
					<path d="M0 0 L6 3 L0 6 z" fill="var(--n-{tone}-line)" />
				</marker>
			{/each}
		</defs>

		{#each links as l, i (i)}
			<path
				class="wire"
				style="--line: var(--n-{l.tone}-line)"
				d={path(l.points)}
				marker-end={l.arrow ? `url(#cu-arrow-${l.tone})` : undefined}
			/>
		{/each}
	</svg>

	{#each nodes as n (n.label + n.box[0])}
		<span
			class="cu-node node t-{n.tone}"
			style="left:{n.box[0]}px; top:{n.box[1]}px; width:{n.box[2]}px; height:{n.box[3]}px"
		>
			{n.label}
		</span>
	{/each}
</div>

<style>
	.flow {
		position: relative;
		width: 1020px;
		height: var(--h);

		/* [fill, ink, connector] per tone — sampled from the deck */
		--n-home-bg: #eaf7ef;
		--n-home-ink: #0f766e;
		--n-home-line: #0f766e;
		--n-fuchsia-bg: #fdf4ff;
		--n-fuchsia-ink: #c026d3;
		--n-fuchsia-line: #c026d3;
		--n-lime-bg: #f7fee7;
		--n-lime-ink: #65a30d;
		--n-lime-line: #65a30d;
		--n-violet-bg: #ede9fe;
		--n-violet-ink: #8b5cf6;
		--n-violet-line: #8b5cf6;
		--n-amber-bg: #fffbeb;
		--n-amber-ink: #d97706;
		--n-amber-line: #d97706;
		--n-orange-bg: #ffedd5;
		--n-orange-ink: #fb923c;
		--n-orange-line: #fb923c;
		--n-blue-bg: #dbeafe;
		--n-blue-ink: #1d4ed8;
		--n-blue-line: #1d4ed8;
		--n-pink-bg: #fdf2f8;
		--n-pink-ink: #db2777;
		--n-pink-line: #db2777;
	}

	.wires {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.wire {
		fill: none;
		stroke: var(--line);
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.node {
		position: absolute;
		background: var(--n-bg);
		color: var(--n-ink);
	}
	/* "Home" is the one outlined node in both flows */
	.node.t-home {
		border: 2px solid var(--n-home-ink);
		font-size: 22px;
	}

	.t-home {
		--n-bg: var(--n-home-bg);
		--n-ink: var(--n-home-ink);
	}
	.t-fuchsia {
		--n-bg: var(--n-fuchsia-bg);
		--n-ink: var(--n-fuchsia-ink);
	}
	.t-lime {
		--n-bg: var(--n-lime-bg);
		--n-ink: var(--n-lime-ink);
	}
	.t-violet {
		--n-bg: var(--n-violet-bg);
		--n-ink: var(--n-violet-ink);
	}
	.t-amber {
		--n-bg: var(--n-amber-bg);
		--n-ink: var(--n-amber-ink);
	}
	.t-orange {
		--n-bg: var(--n-orange-bg);
		--n-ink: var(--n-orange-ink);
	}
	.t-blue {
		--n-bg: var(--n-blue-bg);
		--n-ink: var(--n-blue-ink);
	}
	.t-pink {
		--n-bg: var(--n-pink-bg);
		--n-ink: var(--n-pink-ink);
	}
</style>
