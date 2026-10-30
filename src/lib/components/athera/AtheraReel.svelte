<script>
	/* A 10s brand loop for the Athera project card, built from the site's own
	   type (Georgia + Jost), palette and photography:
	     0–3s   brand  — the wordmark tracks in under the spotlight
	     3–6.5s hero   — the headline reveals, the sofa glides up into the light
	     6.5–10s collection — three product cards spring in as a fan
	   Everything sizes in cqw, so the loop scales with the card. Off screen it
	   pauses; with reduced motion it rests on the hero frame. */
	let reel;
	let idle = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(([entry]) => (idle = !entry.isIntersecting));
		observer.observe(reel);
		return () => observer.disconnect();
	});

	const products = [
		{ src: '/img/work/athera/living-in-oak.avif', name: 'Living in Oak', x: -28, r: -6, y: 2 },
		{ src: '/img/work/athera/slow-evenings.avif', name: 'Objects for Slow Evenings', x: 0, r: 0, y: 0 },
		{ src: '/img/work/athera/made-in-cane.avif', name: 'Made in Cane', x: 28, r: 6, y: 2 }
	];
</script>

<div class="reel" class:idle bind:this={reel}>
	<div class="glow"></div>

	<!-- 1 · brand -->
	<div class="brand">
		<span class="mark">Aethera</span>
		<i class="rule"></i>
		<span class="sub">Made to order · in small runs</span>
	</div>

	<!-- 2 · hero -->
	<p class="headline">
		<span class="line"><span>Design spaces</span></span>
		<span class="line line--2"><span>that feel quieter.</span></span>
	</p>
	<span class="cta">Explore the collection</span>
	<img class="sofa" src="/img/work/athera/sofa.avif" alt="" loading="lazy" />

	<!-- 3 · collection -->
	<span class="label">Five small stories</span>
	{#each products as p, i (p.name)}
		<figure
			class="product"
			style:--x="{p.x}cqw"
			style:--r="{p.r}deg"
			style:--y="{p.y}cqw"
			style:animation-delay="{i * 0.12}s"
		>
			<img src={p.src} alt="" loading="lazy" />
			<figcaption>{p.name}</figcaption>
		</figure>
	{/each}
</div>

<style>
	.reel {
		--loop: 10s;
		--bone: #f4efe8;
		--out: cubic-bezier(0.22, 1, 0.36, 1);
		--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
		position: absolute;
		inset: 0;
		container-type: inline-size;
		overflow: hidden;
		color: var(--bone);
		text-align: center;
	}
	.reel * {
		animation-duration: var(--loop);
		animation-iteration-count: infinite;
		animation-fill-mode: both;
	}
	.reel.idle * {
		animation-play-state: paused;
	}

	/* the hero's warm spotlight, breathing across the loop */
	.glow {
		position: absolute;
		left: 50%;
		top: 62%;
		width: 110cqw;
		height: 70cqw;
		translate: -50% -50%;
		background: radial-gradient(closest-side, rgb(206 176 146 / 55%), transparent);
		animation-name: glow;
	}

	/* ---- 1 · brand ------------------------------------------------------- */
	.brand {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.2cqw;
		opacity: 0;
		animation-name: brand;
	}
	.mark {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 7cqw;
		text-transform: uppercase;
		letter-spacing: 0.45em;
		margin-right: -0.45em;
		animation-name: mark;
	}
	.rule {
		width: 14cqw;
		height: 1px;
		background: rgb(244 239 232 / 55%);
		animation-name: rule;
	}
	.sub {
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 1.5cqw;
		text-transform: uppercase;
		letter-spacing: 0.24em;
		color: rgb(244 239 232 / 75%);
		animation-name: sub;
	}

	/* ---- 2 · hero -------------------------------------------------------- */
	.headline {
		position: absolute;
		top: 9%;
		left: 0;
		right: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 5cqw;
		line-height: 1.08;
		text-transform: uppercase;
		letter-spacing: 0.01em;
	}
	.line {
		display: block;
		overflow: hidden;
	}
	.line > span {
		display: block;
		animation-name: line;
	}
	.line--2 > span {
		animation-delay: 0.18s;
	}
	.cta {
		position: absolute;
		top: 30%;
		left: 50%;
		translate: -50% 0;
		padding: 1.1cqw 2.4cqw;
		border: 1px solid rgb(244 239 232 / 35%);
		background: rgb(150 120 95 / 55%);
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 1.4cqw;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		white-space: nowrap;
		animation-name: cta;
	}
	.sofa {
		position: absolute;
		left: 50%;
		bottom: 3%;
		width: 80cqw;
		max-width: none;
		transform: translateX(-50%);
		filter: drop-shadow(0 3cqw 3cqw rgb(20 12 6 / 45%));
		animation-name: sofa;
	}

	/* ---- 3 · collection -------------------------------------------------- */
	.label {
		position: absolute;
		top: 11%;
		left: 0;
		right: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 3.4cqw;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0;
		animation-name: label;
	}
	.product {
		position: absolute;
		left: 50%;
		top: 30%;
		width: 26cqw;
		margin: 0;
		padding: 0.9cqw 0.9cqw 1.2cqw;
		background: var(--bone);
		box-shadow: 0 2.4cqw 4cqw rgb(20 12 6 / 38%);
		transform: translateX(calc(-50% + var(--x))) translateY(var(--y)) rotate(var(--r));
		opacity: 0;
		animation-name: product;
	}
	.product img {
		width: 100%;
		aspect-ratio: 3 / 2;
		object-fit: cover;
	}
	.product figcaption {
		margin-top: 1cqw;
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 1.2cqw;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #4a3b30;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ---- timeline (percent of the 10s loop) ------------------------------ */
	@keyframes glow {
		0% { opacity: 0.25; scale: 0.85; }
		10%, 88% { opacity: 1; scale: 1; }
		100% { opacity: 0.25; scale: 0.85; }
	}
	@keyframes mark {
		0%, 3% { opacity: 0; letter-spacing: 0.9em; animation-timing-function: var(--out); }
		15% { opacity: 1; letter-spacing: 0.45em; }
		27% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		31%, 100% { opacity: 0; translate: 0 -40%; }
	}
	@keyframes brand {
		0%, 31% { opacity: 1; }
		32%, 100% { opacity: 0; }
	}
	@keyframes rule {
		0%, 8% { scale: 0 1; opacity: 1; animation-timing-function: var(--out); }
		17%, 27% { scale: 1 1; opacity: 1; }
		30%, 100% { scale: 1 1; opacity: 0; }
	}
	@keyframes sub {
		0%, 12% { opacity: 0; translate: 0 40%; animation-timing-function: var(--out); }
		19%, 27% { opacity: 1; translate: 0 0; }
		30%, 100% { opacity: 0; translate: 0 0; }
	}
	@keyframes line {
		0%, 31% { translate: 0 110%; opacity: 1; animation-timing-function: var(--out); }
		39%, 60% { translate: 0 0; opacity: 1; }
		64% { translate: 0 0; opacity: 0; }
		65%, 100% { translate: 0 110%; opacity: 0; }
	}
	@keyframes cta {
		0%, 39% { opacity: 0; translate: -50% 30%; animation-timing-function: var(--out); }
		45%, 60% { opacity: 1; translate: -50% 0; }
		63%, 100% { opacity: 0; translate: -50% 0; }
	}
	@keyframes sofa {
		0%, 33% { opacity: 0; translate: 0 22%; scale: 0.96; animation-timing-function: var(--out); }
		44% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: linear; }
		60% { opacity: 1; translate: 0 0; scale: 1.03; }
		64% { opacity: 0; translate: 0 0; scale: 1.05; }
		65%, 100% { opacity: 0; translate: 0 22%; scale: 0.96; }
	}
	@keyframes label {
		0%, 64% { opacity: 0; translate: 0 30%; animation-timing-function: var(--out); }
		70%, 91% { opacity: 1; translate: 0 0; }
		95%, 100% { opacity: 0; translate: 0 0; }
	}
	@keyframes product {
		0%, 64% { opacity: 0; translate: 0 45%; animation-timing-function: var(--spring); }
		73% { opacity: 1; translate: 0 0; }
		90% { opacity: 1; translate: 0 -1.5%; animation-timing-function: ease-in; }
		95%, 100% { opacity: 0; translate: 0 14%; }
	}

	/* reduced motion: hold the hero frame — headline, button and sofa */
	@media (prefers-reduced-motion: reduce) {
		.reel * {
			animation: none;
		}
	}
</style>
