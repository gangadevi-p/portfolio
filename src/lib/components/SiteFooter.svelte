<script>
	import { site } from '$data/site.js';
	import Container from './Container.svelte';

	let { compact = false } = $props();
</script>

<footer id="contact" class="footer" class:compact>
	<Container>
		<div class="inner">
			<div>
				<p class="lead">Let's make something calm and useful.</p>
				<a class="email" href={`mailto:${site.email}`}>{site.email}</a>
			</div>
			<ul class="socials">
				{#each site.socials as s}
					<li><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>
				{/each}
			</ul>
		</div>
		<p class="fine">© {new Date().getFullYear()} {site.name} — {site.location}</p>
	</Container>
</footer>

<style>
	.footer {
		padding-block: clamp(3rem, 8vw, 6rem) 2rem;
		border-top: 1px solid var(--c-line);
		margin-top: clamp(4rem, 12vw, 9rem);
	}
	.footer.compact {
		margin-top: 0;
		padding-top: 60px;
	}
	.inner {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 2rem;
	}
	.lead {
		font-family: var(--font-display);
		font-size: var(--fs-h2);
		line-height: 1.05;
		max-width: 12ch;
	}
	.email {
		display: inline-block;
		margin-top: 1rem;
		font-weight: 600;
		border-bottom: 2px solid var(--c-accent);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.email:hover {
		color: var(--c-accent);
	}
	.socials {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		font-weight: 600;
	}
	/* these had no hover state at all — nothing told you they were links */
	.socials a {
		position: relative;
		transition: color var(--dur-fast) var(--ease-out);
	}
	.socials a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 2px;
		background: var(--c-accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.socials a:hover::after {
		transform: scaleX(1);
	}
	.fine {
		margin-top: 3rem;
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
	}
</style>
