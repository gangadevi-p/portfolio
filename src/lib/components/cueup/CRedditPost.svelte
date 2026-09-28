<script>
	/**
	 * A single Reddit post, rebuilt as text (no screenshots): a rust "Reddit
	 * User" heading, then one or more body paragraphs.
	 * Heading is 18px, body 16px.
	 */
	let { title = 'Reddit User', posts = [] } = $props();
</script>

<article class="post">
	<div class="head">
		<h4>{title}</h4>
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
	p {
		margin: 0;
		font-size: 16px;
		line-height: 1.55;
		color: var(--cu-ink-soft);
	}
</style>
