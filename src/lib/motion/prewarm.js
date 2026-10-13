/**
 * Quietly fetch what a case-study page needs for its first screen while the
 * visitor is still on the home page, so opening it doesn't wait on the network.
 *
 * For each internal /projects/* link it pulls the (prerendered) page HTML and warms
 * the browser cache with the images that load straight away (not the lazy ones).
 * Runs when the browser is idle, one page at a time, and backs off on slow or
 * data-saver connections.
 */
const done = new Set();

function idle(fn) {
	if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 4000 });
	else setTimeout(fn, 1500);
}

async function warmPage(href) {
	if (done.has(href)) return;
	done.add(href);
	try {
		const res = await fetch(href, { priority: 'low' });
		if (!res.ok) return;
		const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
		const urls = [...doc.querySelectorAll('img:not([loading="lazy"])')]
			.map((img) => img.getAttribute('src'))
			.filter(Boolean)
			.slice(0, 8);
		for (const src of urls) {
			const img = new Image();
			img.decoding = 'async';
			img.fetchPriority = 'low';
			img.src = new URL(src, location.origin + href).href;
		}
	} catch {
		/* best effort only */
	}
}

export function prewarmWorkPages() {
	const conn = navigator.connection;
	if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? ''))) return;

	const hrefs = [
		...new Set(
			[...document.querySelectorAll('a[href^="/projects/"]')].map((a) => a.getAttribute('href'))
		)
	];
	const next = () => {
		const href = hrefs.shift();
		if (!href) return;
		warmPage(href).finally(() => idle(next));
	};
	idle(next);
}
