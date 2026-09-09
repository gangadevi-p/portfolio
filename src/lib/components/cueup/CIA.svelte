<script>
	/**
	 * Information-architecture tree: an outlined root pill per group, with a
	 * spine dropping into elbow arrows that point at each child.
	 */
	import { revealScale } from '$motion/reveal.js';

	let { groups = [] } = $props();

	const ROOT_W = 132; // root pill width
	const INDENT = 86; // children sit this far right of the group's left edge
	const SPINE = ROOT_W / 2; // branches leave from the root's centre
	const CHILD_COMPACT = 33; // preserves the 1020px artboard after moving the spine
	const PITCH = 47; // vertical distance between children

	const rowsMax = $derived(Math.max(1, ...groups.map((g) => g.children.length)));
</script>

<div class="ia cu-card" style="--pitch:{PITCH}px; --rows-max:{rowsMax}" use:revealScale>
	{#each groups as g (g.root + g.x)}
		<div
			class="group t-{g.tone}"
			style="left:{g.x}px; --spine:{SPINE}px; --indent:{INDENT}px; --root-w:{ROOT_W}px; --child-w:{g.width - CHILD_COMPACT}px; --rows:{g.children.length}"
		>
			<span class="cu-node root">{g.root}</span>
			<span class="spine" aria-hidden="true"></span>

			<ul>
				{#each g.children as c (c)}
					<li><span class="cu-node child">{c}</span></li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.ia {
		position: relative;
		width: 1020px;
		/* top pad + root + gap + rows + bottom pad */
		height: calc(28px + 33px + 32px + (var(--rows-max) - 1) * var(--pitch) + 31px + 28px);

		--t-violet: #9333ea;
		--t-violet-bg: #faf5ff;
		--t-sky: #0284c7;
		--t-sky-bg: #f0f9ff;
		--t-pink: #db2777;
		--t-pink-bg: #fdf2f8;
		--t-amber: #92400e;
		--t-amber-bg: #fef7ed;
		--t-emerald: #059669;
		--t-emerald-bg: #ecfdf5;
		--t-skyDeep: #0369a1;
		--t-skyDeep-bg: #e0f2fe;
		--line-stroke: 2px;
	}

	.group {
		position: absolute;
		top: 28px;
	}
	.root {
		display: inline-flex;
		width: var(--root-w);
		height: 33px;
		border: 2px solid var(--c);
		color: var(--c);
		background: #fff;
	}

	/* The spine runs from the root down to the centre of the final child, so
	   every branch is the same solid stroke leaving a single continuous line. */
	.spine {
		position: absolute;
		left: var(--spine);
		top: 33px;
		width: var(--line-stroke);
		background: var(--c);
		height: calc(49px + (var(--rows) - 1) * var(--pitch));
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 32px 0 0 var(--indent);
		display: flex;
		flex-direction: column;
		gap: calc(var(--pitch) - 31px);
	}
	li {
		position: relative;
	}
	/* elbow arm + arrowhead running from the spine into each child */
	li::before {
		content: '';
		position: absolute;
		right: 100%;
		top: 50%;
		width: calc(var(--indent) - var(--spine));
		height: var(--line-stroke);
		background: var(--c);
		translate: 0 -50%;
	}
	li::after {
		content: '';
		position: absolute;
		right: 100%;
		top: 50%;
		border: 4px solid transparent;
		border-left-color: var(--c);
		border-right-width: 0;
		translate: 0 -50%;
	}
	.child {
		display: inline-flex;
		width: var(--child-w);
		height: 31px;
		background: var(--c-bg);
		color: var(--c);
	}

	.t-violet {
		--c: var(--t-violet);
		--c-bg: var(--t-violet-bg);
	}
	.t-sky {
		--c: var(--t-sky);
		--c-bg: var(--t-sky-bg);
	}
	.t-pink {
		--c: var(--t-pink);
		--c-bg: var(--t-pink-bg);
	}
	.t-amber {
		--c: var(--t-amber);
		--c-bg: var(--t-amber-bg);
	}
	.t-emerald {
		--c: var(--t-emerald);
		--c-bg: var(--t-emerald-bg);
	}
	.t-skyDeep {
		--c: var(--t-skyDeep);
		--c-bg: var(--t-skyDeep-bg);
	}
</style>
