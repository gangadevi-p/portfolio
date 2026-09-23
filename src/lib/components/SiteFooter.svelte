<script>
	import { site } from '$data/site.js';
	import Container from './Container.svelte';

	let { compact = false, home = false } = $props();
	const contactCtas = [
		{ label: 'Gmail', href: `mailto:${site.email}`, external: false },
		...site.socials.map((social) => ({ ...social, external: true }))
	];
</script>

<footer id="contact" class="footer" class:compact class:home>
	<Container>
		<div class="footer-shell">
			<div class="intro">
				<p class="eyebrow">LET’S BUILD WHAT’S NEXT</p>
				<h2>If you came this far, we’re already talking. Let’s work together.</h2>
			</div>
			<nav class="contact-nav" aria-label="Contact Gangadevi">
				{#each contactCtas as cta}
					<a
						href={cta.href}
						target={cta.external ? '_blank' : undefined}
						rel={cta.external ? 'noreferrer' : undefined}
					>
						{cta.label}
						<span aria-hidden="true">↗</span>
					</a>
				{/each}
			</nav>

			<p class="fine">All rights reserved. © {site.name} 2026</p>
		</div>
	</Container>
</footer>

<style>
	.footer {
		margin-top: 0;
		padding-block: clamp(2.5rem, 6vw, 4.5rem) 1.5rem;
		background: var(--c-bg);
		color: var(--c-ink);
	}
	.footer.compact { padding-top: 4rem; }
	.footer.home {
		--pad-x: clamp(1.25rem, 3vw, 2.5rem);
		padding-block: 40px;
	}
	.footer-shell {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2rem);
	}
	.intro { max-width: none; }
	.eyebrow {
		margin-bottom: 1rem;
		color: var(--c-accent);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
	}
	h2 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, calc(6.1vw - 1.5rem), 4.25rem);
		font-weight: 500;
		letter-spacing: -0.055em;
		line-height: 0.96;
	}
	.contact-nav {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		overflow: hidden;
		border: 1px solid var(--c-line);
		border-radius: 999px;
		background: var(--c-surface);
		box-shadow: none;
	}
	.contact-nav a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.92rem 1.2rem;
		border-right: 1px solid var(--c-line);
		color: var(--c-ink);
		font-size: 0.95rem;
		font-weight: 600;
		text-decoration: none;
		transition: background 180ms ease, color 180ms ease;
	}
	.contact-nav a:last-child { border-right: 0; }
	.contact-nav a:hover,
	.contact-nav a:focus-visible {
		background: var(--c-surface-strong);
		color: var(--c-ink-inverse);
		outline: none;
	}
	.contact-nav span {
		font-size: 1rem;
		transition: transform 180ms var(--ease-out);
	}
	.contact-nav a:hover span,
	.contact-nav a:focus-visible span { transform: translate3d(0.35rem, 0, 0); }
	.fine {
		margin: 0;
		color: var(--c-ink-soft);
		font-size: var(--fs-small);
		text-align: center;
	}
	@media (max-width: 620px) {
		.footer { padding-block: 2.5rem 1.25rem; }
		.footer-shell { gap: 2rem; }
		h2 { font-size: clamp(2rem, calc(12vw - 1.5rem), 2.5rem); }
		.contact-nav { grid-template-columns: repeat(2, 1fr); border-radius: 1.2rem; }
		.contact-nav a { padding: 0.85rem 1rem; }
		.contact-nav a:nth-child(2) { border-right: 0; }
		.contact-nav a:nth-child(-n + 2) { border-bottom: 1px solid var(--c-line); }
	}
	@media (prefers-reduced-motion: reduce) {
		.contact-nav span { transition: none; }
		.contact-nav a:hover span,
		.contact-nav a:focus-visible span { transform: none; }
	}
</style>
