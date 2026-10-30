<script>
	/* The phone-sized twin of AtheraReel — same 10s timeline, so the two play
	   in step, but laid out the way the site reflows on mobile: a nav bar
	   (wordmark · Cart · Menu), the headline stacked on three lines, the sofa
	   along the bottom, and the product cards piled vertically. Sizes are in
	   cqw of the phone screen. */
	let reel;
	let idle = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(([entry]) => (idle = !entry.isIntersecting));
		observer.observe(reel);
		return () => observer.disconnect();
	});

	const products = [
		{ src: '/img/work/athera/living-in-oak.avif', name: 'Living in Oak', top: 24, x: -3, r: -4 },
		{ src: '/img/work/athera/slow-evenings.avif', name: 'Objects for Slow Evenings', top: 44, x: 3, r: 3 },
		{ src: '/img/work/athera/made-in-cane.avif', name: 'Made in Cane', top: 64, x: -2, r: -3 }
	];
</script>

<div class="reel" class:idle bind:this={reel}>
	<div class="glow"></div>

	<!-- site nav, present from the hero on -->
	<header class="nav">
		<span class="wordmark">Aethera</span>
		<span class="links"><span>♡</span><span>Cart</span><span>Menu</span></span>
	</header>

	<!-- 1 · brand -->
	<div class="brand">
		<span class="mark">Aethera</span>
		<i class="rule"></i>
		<span class="sub">Made to order · in small runs</span>
	</div>

	<!-- 2 · hero -->
	<p class="headline">
		<span class="line"><span>Design spaces</span></span>
		<span class="line line--2"><span>that feel</span></span>
		<span class="line line--3"><span>quieter.</span></span>
	</p>
	<span class="cta">Explore the collection</span>
	<img class="sofa" src="/img/work/athera/sofa.avif" alt="" loading="lazy" />

	<!-- 3 · collection -->
	<span class="label">Five small stories</span>
	{#each products as p, i (p.name)}
		<figure
			class="product"
			style:--top="{p.top}%"
			style:--x="{p.x}cqw"
			style:--r="{p.r}deg"
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

	.glow {
		position: absolute;
		left: 50%;
		top: 66%;
		width: 170cqw;
		height: 130cqw;
		translate: -50% -50%;
		background: radial-gradient(closest-side, rgb(206 176 146 / 55%), transparent);
		animation-name: glow;
	}

	/* ---- nav ------------------------------------------------------------- */
	.nav {
		position: absolute;
		top: 14cqw;
		left: 6cqw;
		right: 6cqw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		opacity: 0;
		animation-name: nav;
	}
	.wordmark {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 5cqw;
		text-transform: uppercase;
		letter-spacing: 0.34em;
	}
	.links {
		display: flex;
		gap: 3.2cqw;
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 3cqw;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	/* ---- 1 · brand ------------------------------------------------------- */
	.brand {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4.5cqw;
		opacity: 0;
		animation-name: brand;
	}
	.mark {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 11cqw;
		text-transform: uppercase;
		letter-spacing: 0.4em;
		margin-right: -0.4em;
		animation-name: mark;
	}
	.rule {
		width: 24cqw;
		height: 1px;
		background: rgb(244 239 232 / 55%);
		animation-name: rule;
	}
	.sub {
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 3.2cqw;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: rgb(244 239 232 / 75%);
		animation-name: sub;
	}

	/* ---- 2 · hero -------------------------------------------------------- */
	.headline {
		position: absolute;
		top: 22%;
		left: 0;
		right: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 9.4cqw;
		line-height: 1.1;
		text-transform: uppercase;
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
		animation-delay: 0.15s;
	}
	.line--3 > span {
		animation-delay: 0.3s;
	}
	.cta {
		position: absolute;
		top: 46%;
		left: 50%;
		translate: -50% 0;
		padding: 2.6cqw 5.4cqw;
		border: 1px solid rgb(244 239 232 / 35%);
		background: rgb(150 120 95 / 55%);
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 3.1cqw;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		white-space: nowrap;
		animation-name: cta;
	}
	.sofa {
		position: absolute;
		left: 50%;
		bottom: 6%;
		width: 94cqw;
		max-width: none;
		transform: translateX(-50%);
		filter: drop-shadow(0 5cqw 5cqw rgb(20 12 6 / 45%));
		animation-name: sofa;
	}

	/* ---- 3 · collection -------------------------------------------------- */
	.label {
		position: absolute;
		top: 15%;
		left: 0;
		right: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 6.6cqw;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0;
		animation-name: label;
	}
	.product {
		position: absolute;
		left: 50%;
		top: var(--top);
		width: 64cqw;
		margin: 0;
		padding: 2cqw 2cqw 2.8cqw;
		background: var(--bone);
		box-shadow: 0 4cqw 7cqw rgb(20 12 6 / 38%);
		transform: translateX(calc(-50% + var(--x))) rotate(var(--r));
		opacity: 0;
		animation-name: product;
	}
	.product img {
		width: 100%;
		aspect-ratio: 3 / 2;
		object-fit: cover;
	}
	.product figcaption {
		margin-top: 2.2cqw;
		font-family: Jost, 'Helvetica Neue', Arial, sans-serif;
		font-size: 2.9cqw;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #4a3b30;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ---- timeline (percent of the 10s loop — matches AtheraReel) ---------- */
	@keyframes glow {
		0% { opacity: 0.25; scale: 0.85; }
		10%, 88% { opacity: 1; scale: 1; }
		100% { opacity: 0.25; scale: 0.85; }
	}
	@keyframes nav {
		0%, 32% { opacity: 0; translate: 0 -40%; animation-timing-function: var(--out); }
		38%, 93% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		96%, 100% { opacity: 0; translate: 0 0; }
	}
	@keyframes brand {
		0%, 31% { opacity: 1; }
		32%, 100% { opacity: 0; }
	}
	@keyframes mark {
		0%, 3% { opacity: 0; letter-spacing: 0.7em; animation-timing-function: var(--out); }
		15% { opacity: 1; letter-spacing: 0.4em; }
		27% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		31%, 100% { opacity: 0; translate: 0 -40%; }
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

	/* reduced motion: hold the hero frame — nav, headline, button and sofa */
	@media (prefers-reduced-motion: reduce) {
		.reel * {
			animation: none;
		}
		.nav {
			opacity: 1;
		}
	}
</style>
