<script>
	/**
	 * A single Reddit post, rebuilt as text (no screenshots): a rust "Reddit
	 * User" heading with an out-link arrow, then one or more body paragraphs.
	 * Heading is 18px, body 16px.
	 */
	let { title = 'Reddit User', posts = [], href = null } = $props();
</script>

<article class="post">
	<div class="head">
		<h4>{title}</h4>
		{#if href}
			<svg class="arw" viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 17 17 7M9 7h8v8"
				/>
			</svg>
		{/if}
	</div>
	{#each posts as p (p)}
		<p>{p}</p>
	{/each}
</article>

<style>
	.post {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 18px;
	}
	h4 {
		margin: 0;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.3;
		color: #c2410c;
	}
	.arw {
		flex: none;
		width: 18px;
		height: 18px;
		color: #1f2937;
	}
	p {
		margin: 0;
		font-size: 16px;
		line-height: 1.55;
		color: var(--cu-ink-soft);
	}
</style>
