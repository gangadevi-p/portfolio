<script>
	let { name, date, stars = 5, text, helpful } = $props();
	const initials = $derived(
		name
			.split(' ')
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase()
	);
</script>

<article class="review k-card">
	<header>
		<span class="avatar">{initials}</span>
		<b>{name}</b>
	</header>
	<div class="rating">
		<span class="stars" aria-label={`${stars} out of 5`}>{'★'.repeat(stars)}</span>
		<span class="date">{date}</span>
	</div>
	<p class="body">{text}</p>
	<p class="helpful">{helpful} people found this helpful</p>
</article>

<style>
	.review {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	header {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}
	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: var(--k-orange);
		color: #fff;
		font-size: 0.72rem;
		font-weight: 700;
		display: grid;
		place-items: center;
		flex: none;
	}
	header b {
		font-size: 1.02rem;
		font-weight: 700;
		color: var(--k-ink-strong);
	}
	.rating {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.stars {
		color: #1f5fd0;
		letter-spacing: 2px;
		font-size: 0.95rem;
	}
	.date {
		font-size: 0.85rem;
		color: var(--k-ink-soft);
	}
	.body {
		color: #565656;
		font-size: 0.95rem;
	}
	.helpful {
		font-size: 0.82rem;
		color: var(--k-ink-soft);
	}
</style>
