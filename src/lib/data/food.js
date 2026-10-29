/**
 * One biryani, two apps — a self-directed feature concept: ask Siri for a dish
 * and compare it on Swiggy and Zomato, Google Flights-style, before ordering.
 *
 * Everything on /work/food-compare reads from here. The order is real: the
 * same bowl from the same restaurant, checked on both apps on 29 Oct 2026
 * (screenshots in /static/food, full resolution, with the address and card
 * digits painted out).
 * The ratings are placeholders until the real ones are checked.
 */

export const foodMeta = {
	title: 'One biryani, two apps',
	summary:
		'Compare the same dish on Swiggy and Zomato in one place, by final price after coupons, delivery time and rating.'
};

export const hero = {
	eyebrow: 'Feature concept · Siri',
	title: 'One biryani,',
	accent: 'two apps',
	lead: 'Before every order I open Swiggy and Zomato, add the same dish in both, apply coupons and compare the final bill. I designed a way to ask Siri instead: it compares the same dish on both apps, like Google Flights compares airlines, by final price, delivery time and rating.',
	facts: [
		{ label: 'Role', value: 'Product designer' },
		{ label: 'Type', value: 'Self-directed concept' },
		{ label: 'Platform', value: 'Siri on iPhone' },
		{ label: 'Year', value: '2026' }
	]
};

/** ₹199 stays whole; ₹199.5 shows its paise, as the apps do. Discounts get a minus. */
export const rupees = (n) =>
	(n < 0 ? '−₹' : '₹') + (Number.isInteger(n) ? Math.abs(n) : Math.abs(n).toFixed(2));

/** The real order behind the mock */
export const order = {
	query: 'Chicken biryani bowl from Paradise',
	restaurant: 'Paradise Biryani',
	dish: 'Single Chicken Biryani Bowl'
};

/**
 * One row per app, from the real bills. `bill` lines are copied as each app
 * labels them; a negative amount is a discount. `eta` is what the app showed;
 * `minutes` (its upper end) is only used to sort. `note` names what made a line free.
 */
export const apps = [
	{
		id: 'zomato',
		name: 'Zomato',
		color: '#e23744',
		menu: 199.5,
		total: 219.29,
		eta: '15–20 min',
		minutes: 20,
		rating: 4.3,
		bill: [
			{ label: 'Item total', amount: 199.5 },
			{ label: 'Restaurant packaging', amount: 15.36 },
			{ label: 'Delivery partner fee', amount: 0, note: 'Gold' },
			{ label: 'Platform fee', amount: 14.99 },
			{ label: '3 months Gold', amount: 1 },
			{ label: 'GST (govt. taxes)', amount: 13.44 },
			{ label: 'Limited time offer', amount: -25 }
		]
	},
	{
		id: 'swiggy',
		name: 'Swiggy',
		color: '#fc8019',
		menu: 199,
		total: 252,
		eta: '25–30 min',
		minutes: 30,
		rating: 4.2,
		bill: [
			{ label: 'Item total', amount: 199 },
			{ label: 'Delivery fee', amount: 0, note: 'Swiggy One' },
			{ label: 'GST & other charges', amount: 53.07 }
		]
	}
];

export const problem = {
	quote: 'I usually go to Swiggy and Zomato, search the prices, check wherever I’m getting the lower price with coupons, and continue there.',
	/** my own screenshots of one order, one minute apart */
	screens: [
		{ src: '/food/zomato-cart.webp', alt: 'Zomato cart: Single Chicken Biryani Bowl from Paradise Biryani, ₹199.50, total ₹219.29', caption: 'Zomato · cart' },
		{ src: '/food/zomato-bill.webp', alt: 'Zomato bill summary: to pay ₹219.29', caption: 'Zomato · bill' },
		{ src: '/food/swiggy-cart.webp', alt: 'Swiggy cart: Single Chicken Biryani Bowl from Paradise Biryani, ₹199, pay ₹252', caption: 'Swiggy · cart' },
		{ src: '/food/swiggy-bill.webp', alt: 'Swiggy bill: to pay ₹252', caption: 'Swiggy · bill' }
	],
	screensNote: 'My real order: the same bowl, from the same restaurant, checked on both apps a minute apart. Both say I “saved” over ₹240. Neither tells me the other is cheaper.',
	/** my real Siri result for the same request */
	siriToday: {
		src: '/food/siri-today.webp',
		alt: 'Siri answering a request for chicken biryani with a Maps card: three places called Chicken Biryani, distances, “Hours Unavailable” and Go buttons for directions',
		title: 'What Siri does today',
		text: 'I asked Siri for chicken biryani. It showed three places called “Chicken Biryani” on a map, with distances and a Go button for directions. Nothing about delivery, what it would cost, or which app to order from.'
	},
	/** today's routine, one lane per app */
	routine: ['Search the dish', 'Add it to the cart', 'Try the coupons', 'Note the final bill'],
	pains: [
		{
			title: 'The real price only shows at checkout',
			text: 'The menu price leaves out delivery, platform fee, taxes and the coupon. To compare, you nearly place two orders.'
		},
		{
			title: 'Every bill is built differently',
			text: 'Zomato lists packaging, a platform fee, taxes and an offer on separate lines. Swiggy folds them into one “GST & other charges” line. You can’t compare line by line, only the final number.'
		},
		{
			title: 'Coupons are personal',
			text: 'Both of my bills already include my memberships, Zomato Gold and Swiggy One. Someone without them, or with a different bank card, would see different totals.'
		},
		{
			title: 'Price isn’t everything',
			text: 'The cheaper app might take 15 minutes longer, or the restaurant might be rated lower there. You weigh all of it in your head.'
		}
	]
};

/** the insight: menu price and final bill disagree */
export const bill = {
	title: 'Same ₹199 bowl. ₹33 apart at checkout.',
	text: 'Both apps list the bowl at about ₹199, down from ₹399. But after packaging, fees, taxes and offers, Zomato asks ₹219.29 and Swiggy ₹252. Zomato is also about 10 minutes faster. The only way to find that out today is to go to checkout on both.'
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
	{ title: 'Ask', text: 'Say “Hey Siri, chicken biryani bowl from Paradise”.' },
	{ title: 'Compare', text: 'One row per app: final price, delivery time and rating, with Cheapest and Fastest tags.' },
	{ title: 'Check the bill', text: 'Tap a row to see the full bill, so you can see where the difference comes from.' },
	{ title: 'Order', text: 'Tap “Order on Zomato” and Zomato opens with the bowl in your cart and the offer applied. You just pay.' }
];

export const decisions = [
	{
		title: 'Final price, not menu price',
		text: 'The menu price is what misleads people today. The big number in every row is the amount you’ll actually pay.'
	},
	{
		title: 'Sort it your way',
		text: 'Like Flights, you can sort by cheapest, fastest or best rated, because on some days ₹33 matters and on others 10 minutes does.'
	},
	{
		title: 'Hand off, don’t check out',
		text: 'Payment and addresses stay in each app. Siri compares and the app completes the order, which is easier to trust and to build.'
	},
	{
		title: 'Show when dishes are matched',
		text: 'When the names differ, both names are shown, so you can see they’re the same dish before you trust the comparison.'
	}
];

export const constraints = {
	note: 'Swiggy and Zomato are direct rivals, and neither wants to send you to the other. So this can’t live inside either app.',
	items: [
		{ title: 'Why Siri', text: 'Apple has no food delivery app of its own, so it’s neutral. Apps already plug actions into Siri through App Intents, and like airlines on Flights, they’d join because Siri sends them customers who are ready to pay.' },
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
	'Should it point out when a membership changes the result, like “₹46 of this saving comes from Gold”?',
	'How does it work for someone who hasn’t linked one of the accounts?'
];

export const credits =
	'Screenshots are my own, from one order checked on both apps on 29 Oct 2026, with my address and card details removed.';
