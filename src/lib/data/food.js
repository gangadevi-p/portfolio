/**
 * One biryani, two apps — a self-directed feature concept: compare the same
 * dish on Swiggy and Zomato, Google Flights-style, before ordering.
 *
 * Everything on /work/food-compare reads from here. The restaurant and every
 * price below are made up for the mock; the two app screenshots are from their
 * Google Play listings (placeholders until real checkout screenshots arrive).
 */

export const foodMeta = {
	title: 'One biryani, two apps',
	summary:
		'Compare the same dish on Swiggy and Zomato in one place, by final price after coupons, delivery time and rating.'
};

export const hero = {
	eyebrow: 'Feature concept · Google',
	title: 'One biryani,',
	accent: 'two apps',
	lead: 'Before every order I open Swiggy and Zomato, add the same dish in both, apply coupons and compare the final bill. I designed a Google Flights-style comparison that does this in one step: final price, delivery time and rating, side by side.',
	facts: [
		{ label: 'Role', value: 'Product designer' },
		{ label: 'Type', value: 'Self-directed concept' },
		{ label: 'Platform', value: 'Google Search + Assistant' },
		{ label: 'Year', value: '2026' }
	]
};

/** The order in the mock — a made-up restaurant, made-up prices. */
export const order = {
	query: 'Hey Google, chicken biryani from Biryani House',
	restaurant: 'Biryani House',
	area: 'Koramangala',
	dish: 'Chicken Dum Biryani (Full)'
};

/**
 * One row per app. `bill` lines add up to `total`; a negative amount is a
 * discount. `menu` is the price you see before checkout.
 */
export const apps = [
	{
		id: 'swiggy',
		name: 'Swiggy',
		color: '#fc8019',
		dishName: 'Chicken Dum Biryani (Full)',
		menu: 349,
		total: 360,
		minutes: 35,
		rating: 4.5,
		ratings: '12k',
		bill: [
			{ label: 'Item total', amount: 349 },
			{ label: 'Delivery fee', amount: 39 },
			{ label: 'Platform fee', amount: 10 },
			{ label: 'GST & restaurant charges', amount: 37 },
			{ label: 'Best coupon for you', amount: -75 }
		]
	},
	{
		id: 'zomato',
		name: 'Zomato',
		color: '#e23744',
		dishName: 'Chicken Biryani – Dum Style (Full)',
		menu: 339,
		total: 376,
		minutes: 28,
		rating: 4.4,
		ratings: '9.8k',
		bill: [
			{ label: 'Item total', amount: 339 },
			{ label: 'Delivery fee', amount: 30 },
			{ label: 'Platform fee', amount: 12 },
			{ label: 'GST & restaurant charges', amount: 35 },
			{ label: 'Best coupon for you', amount: -40 }
		]
	}
];

export const problem = {
	quote: 'I usually go to Swiggy and Zomato, search the prices, check wherever I’m getting the lower price with coupons, and continue there.',
	screens: [
		{ src: '/food/zomato-deals.avif', alt: 'Zomato Play Store screenshot: “Find the best deals on every meal”', app: 'Zomato' },
		{ src: '/food/swiggy-deals.avif', alt: 'Swiggy Play Store screenshot: “Unlock ₹350 savings”', app: 'Swiggy' }
	],
	screensNote: 'Both apps promise the best deal. The only way to know which one is actually cheaper is to check both.',
	/** today's routine, one lane per app */
	routine: ['Search the dish', 'Add it to the cart', 'Try the coupons', 'Note the final bill'],
	pains: [
		{
			title: 'The real price only shows at checkout',
			text: 'The menu price leaves out delivery, platform fee, taxes and the coupon. To compare, you nearly place two orders.'
		},
		{
			title: 'The same dish has different names',
			text: '“Chicken Dum Biryani (Full)” on one app is “Chicken Biryani – Dum Style” on the other. You have to check it’s really the same dish.'
		},
		{
			title: 'Coupons are personal',
			text: 'New-user offers, bank cards and memberships change the price for every person. A friend’s cheaper app might not be yours.'
		},
		{
			title: 'Price isn’t everything',
			text: 'The cheaper app might take 15 minutes longer, or the restaurant might be rated lower there. You weigh all of it in your head.'
		}
	]
};

/** the insight: menu price and final bill disagree */
export const bill = {
	title: 'The menu price says Zomato. The final bill says Swiggy.',
	text: 'In this example, Zomato lists the biryani ₹10 cheaper, but after fees and the best coupon, Swiggy ends up ₹16 cheaper. That’s why people go all the way to checkout on both apps.'
};

export const flights = {
	title: 'Flights solved this years ago',
	text: 'Nobody opens five airline apps to find the cheapest flight. Google Flights puts every airline on one screen with the price, the time and the stops, and you book with the airline you pick. Airlines take part because it brings them customers who are ready to pay. Food delivery is the same kind of choice, with two big players.',
	compare: [
		{ title: 'Final price', text: 'What you’ll actually pay after delivery, fees, taxes and your best coupon. Not the menu price.' },
		{ title: 'Delivery time', text: 'How long each app says it will take right now.' },
		{ title: 'Rating', text: 'The restaurant’s average rating on each app, with how many people rated it.' }
	]
};

export const steps = [
	{ title: 'Ask', text: 'Say “Hey Google, chicken biryani from Biryani House”, or search for it.' },
	{ title: 'Compare', text: 'One row per app: final price, delivery time and rating, with Cheapest and Fastest tags.' },
	{ title: 'Check the bill', text: 'Tap a row to see the full bill, so you can see where the difference comes from.' },
	{ title: 'Order', text: 'Tap “Order on Swiggy” and Swiggy opens with the dish in your cart and the coupon applied. You just pay.' }
];

export const decisions = [
	{
		title: 'Final price, not menu price',
		text: 'The menu price is what misleads people today. The big number in every row is the amount you’ll actually pay.'
	},
	{
		title: 'Sort it your way',
		text: 'Like Flights, you can sort by cheapest, fastest or best rated, because on some days ₹16 matters and on others 7 minutes does.'
	},
	{
		title: 'Hand off, don’t check out',
		text: 'Payment and addresses stay in each app. Google compares and the app completes the order, which is easier to trust and to build.'
	},
	{
		title: 'Show when dishes are matched',
		text: 'When the names differ, both names are shown, so you can see they’re the same dish before you trust the comparison.'
	}
];

export const constraints = {
	note: 'Swiggy and Zomato are direct rivals, and neither wants to send you to the other. So this can’t live inside either app.',
	items: [
		{ title: 'Why Google', text: 'A neutral place people already search for restaurants. Like airlines on Flights, the apps would join because Google sends them customers who are ready to pay.' },
		{ title: 'Your accounts, your prices', text: 'To show your coupons, you link your Swiggy and Zomato accounts once, and you can unlink them any time.' },
		{ title: 'Same restaurant only, at first', text: 'Version one compares the same dish from the same restaurant. Suggesting a cheaper biryani elsewhere can come later.' }
	]
};

export const measure = {
	note: 'This is a concept, so nothing here has been tested yet. Here is what I’d measure.',
	metrics: [
		{ title: 'Time to order', text: 'From asking for the dish to paying, compared with checking both apps by hand.' },
		{ title: 'Money saved', text: 'The difference between the app people chose and the other one, per order.' },
		{ title: 'Still checking both?', text: 'How often people still open both apps after using the comparison. If they do, they don’t trust it yet.' },
		{ title: 'What people pick', text: 'Do they go for the cheapest, the fastest or the best rated? That shows what matters most.' }
	]
};

export const openQuestions = [
	'What if the price changes between comparing and paying, because a coupon expires or a surge fee starts?',
	'Delivery times are estimates. Should the comparison show how accurate each app usually is?',
	'Should it include other apps too, like magicpin or apps on ONDC?',
	'How does it work for someone who hasn’t linked one of the accounts?'
];

export const credits =
	'App screenshots are from the Zomato and Swiggy listings on Google Play. The restaurant and all prices are made up for this concept.';
