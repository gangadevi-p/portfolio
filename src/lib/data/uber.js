/**
 * Spot your ride — a self-directed feature concept for Uber (autos + cabs).
 *
 * Everything on /work/uber-pickup reads from here. Like WhatsApp Threads, this
 * is a concept: the "measure" block is a plan, not results. The photos come
 * from Wikimedia Commons (see `credits`) and were cropped / had faces blurred.
 */

export const uberMeta = {
	title: 'Spot your ride',
	summary:
		'Riders see a real photo of their auto, turned to the side they’ll actually see, and drivers see a photo of the pickup spot.'
};

export const hero = {
	eyebrow: 'Feature concept · Uber',
	title: 'Spot your ride',
	accent: 'in a crowd',
	lead: 'At a busy metro exit, every auto looks the same, and the driver can’t tell which of 200 people booked the ride. I designed two small additions: riders see a real photo of their vehicle, and drivers see a photo of the pickup spot.',
	facts: [
		{ label: 'Role', value: 'Product designer' },
		{ label: 'Type', value: 'Self-directed concept' },
		{ label: 'Platform', value: 'Uber rider + driver apps' },
		{ label: 'Year', value: '2026' }
	]
};

/** The ride in the phone mock. Plate matches the auto in the photos. */
export const ride = {
	driver: 'Manjunath',
	rating: '4.9',
	plate: 'KA 02 9275',
	pin: '4821',
	rider: 'Ananya',
	spot: 'Majestic Metro, main entrance',
	riderNote: 'By the purple metro sign, near the plants'
};

/**
 * Which photo the rider sees depends on where the auto is relative to them.
 * `cues` are the details worth looking for from that side.
 */
export const views = {
	front: {
		label: 'Coming toward you',
		look: 'Look for the front',
		src: '/uber/auto-front.avif',
		alt: 'Front of a black-and-yellow auto with a “LAVANYA” sign above the windshield and red tassels inside',
		cues: ['“LAVANYA” sign', 'Red tassels', 'Yellow plate'],
		status: 'Arriving · 1 min'
	},
	side: {
		label: 'Stopping beside you',
		look: 'Look for the side',
		src: '/uber/auto-side.avif',
		alt: 'Side of the same auto, with a film poster on the back seat and a yellow roof',
		cues: ['Film poster inside', 'Yellow roof', 'Plate on the side'],
		status: 'Your auto is here'
	}
};

export const problem = {
	image: {
		src: '/uber/autos-lineup.avif',
		alt: 'Three black-and-yellow autos parked side by side on a Bengaluru street',
		caption: 'Same shape, same colours, same yellow roof. Which one is yours?'
	},
	/** "Hard to find a cab" is really two problems; only one is a design problem */
	split: [
		{
			title: 'No driver accepts',
			text: 'A supply and pricing problem. Design can’t make more autos appear.',
			scope: 'Out of scope'
		},
		{
			title: 'The ride is here, but nobody can find each other',
			text: 'The auto has arrived, but the rider can’t spot it and the driver can’t spot the rider. This one is a design problem.',
			scope: 'This concept'
		}
	],
	pains: [
		{
			title: 'Everything looks the same',
			text: 'The app shows a generic icon, a colour and a plate number. From 20 metres away, in a row of yellow roofs, none of those help.'
		},
		{
			title: 'The driver can’t find you either',
			text: 'A pin in a crowd is just a dot among hundreds of people, and GPS drifts near big buildings.'
		},
		{
			title: 'So everyone calls',
			text: '“Where are you?” calls in a noisy street, sometimes without a shared language, end in waiting or cancelled rides.'
		}
	]
};

export const insight = {
	title: 'Autos look alike from far away. Up close, every one is different.',
	text: 'Drivers decorate their autos with hand-painted names, stickers, tassels and posters. A generic icon throws all of that away. A real photo keeps it.',
	photos: [
		{ src: '/uber/auto-back-sign.avif', alt: 'The back of an auto with a hand-painted name sign', caption: 'A hand-painted name on the back' },
		{ src: '/uber/auto-front.avif', alt: 'The front of an auto with a name sign and red tassels', caption: 'A name sign and tassels at the front' }
	]
};

export const solution = [
	{
		who: 'Rider',
		title: 'A real photo of your vehicle',
		text: 'Not an illustration, but the actual auto. The app picks the side you’ll see: the front when it’s coming toward you, the side when it pulls up next to you.'
	},
	{
		who: 'Driver',
		title: 'A photo of the pickup spot',
		text: 'The rider can add one photo of where they’re standing, like a gate, a sign or a shop. It shows the place, never the person.'
	},
	{
		who: 'Driver onboarding',
		title: 'Four sides, kept up to date',
		text: 'Drivers photograph the front, back and both sides once. The app checks the plate in the photos and asks for new ones every few months.'
	}
];

/** The onboarding mock: two sides done, two to go */
export const onboarding = {
	slots: [
		{ side: 'Front', src: '/uber/auto-front.avif', done: true },
		{ side: 'Left side', src: '/uber/auto-side.avif', done: true },
		{ side: 'Back', done: false },
		{ side: 'Right side', done: false }
	],
	rules: [
		'The plate must be readable in the front and back photos, and it’s checked against the registration.',
		'New photos every 6 months, or when the rider’s view no longer matches (“Vehicle looked different”).',
		'If a driver rents an auto for the day, they snap the four sides at the start of the shift.'
	]
};

export const privacy = [
	{ title: 'The place, not the person', text: 'The camera opens with a frame that says “Show the spot, not yourself”. Faces in the photo are blurred automatically.' },
	{ title: 'Optional and one tap', text: 'Nobody wants extra steps in a crowd. Skip it and the ride works exactly as it does today.' },
	{ title: 'Gone after the ride', text: 'The photo is only shared with this driver, and it’s deleted when the trip starts.' },
	{ title: 'Reuse popular spots', text: 'At busy places like metro exits, the app can suggest photos of the spot that Uber has already checked, so riders don’t have to take one.' }
];

export const explored = [
	{
		title: 'A 3D model built from the four photos',
		verdict: 'Dropped',
		text: 'Riders need something they can take in at a glance, not a model to rotate in a crowd. Four photos can’t make an accurate model either, and AI that fills in the gaps can invent details that aren’t really there. It’s also heavy on budget phones and patchy data.'
	},
	{
		title: 'A coloured light on the windshield',
		verdict: 'Prior art',
		text: 'Uber once tested “Beacon”, a light that glowed in a colour the rider picked. It needs a device in every vehicle, and in India most rides are autos and bikes. A photo needs nothing new in the vehicle.'
	}
];

export const measure = {
	note: 'This is a concept, so nothing here has been tested yet. Here is what I’d measure, at crowded spots like Majestic, metro exits, the airport and malls.',
	metrics: [
		{ title: 'Time to pickup', text: 'From “driver arrived” to “trip started”. This is the time people spend searching for each other.' },
		{ title: '“Where are you?” calls', text: 'Calls between rider and driver after the driver arrives.' },
		{ title: 'Cancellations at pickup', text: 'Rides cancelled after the driver has already arrived.' },
		{ title: 'Photo uptake', text: 'How many riders add a spot photo, and how often drivers open it.' }
	],
	/** the one-question sheet after the ride; a "no" asks why */
	feedback: {
		title: 'Ask after the ride',
		text: 'Numbers show what happened, not why. So after some rides I’d show a small sheet with one question: did the photo help? A “no” asks for the reason, and that tells me what to fix.',
		rules: [
			'Only after pickups where the photo was shown, and at most once every few rides, so it never feels like a survey.',
			'One tap to answer, and easy to dismiss.',
			'“Vehicle looked different” goes straight back to the driver as a reminder to retake their photos.'
		],
		rider: {
			question: 'Did the photo help you find your auto?',
			reasons: ['Vehicle looked different', 'Couldn’t see it in the crowd', 'Photo was too dark', 'Didn’t look at it']
		},
		driver: {
			question: 'Did the spot photo help you find Ananya?',
			reasons: ['Spot looked different', 'Rider wasn’t there', 'Photo was unclear', 'Didn’t look at it']
		}
	}
};

export const openQuestions = [
	'Night pickups: a daytime photo looks different under streetlights. Do drivers need a night photo too?',
	'Bike taxis look even more alike. Would a photo of the bike plus the helmet colour be enough?',
	'How does the app know which side the rider will see when GPS is drifting near tall buildings?',
	'Could the spot photo help the next rider at the same place, without ever showing who took it?'
];

/** Wikimedia Commons sources — the licences require credit. */
export const credits = [
	{ what: 'Three autos', by: 'Victorgrigas', license: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Bangalore_Autorickshaws_and_guy_on_phone_November_2011_-2-4.jpg' },
	{ what: 'Hand-painted sign', by: 'Subhashish Panigrahi', license: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Hand_painted_sign_behind_a_Bangalore_autorickshaw.jpg' },
	{ what: 'Auto front and side', by: 'Jay Bergesen', license: 'CC BY 2.0', href: 'https://commons.wikimedia.org/wiki/File:Nice_Auto,_Bangalore,_India_(1628818522).jpg' },
	{ what: 'Majestic metro station', by: 'Sunnya343', license: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Kempegowda_Stn_Majestic,_Jul_2017.jpg' }
];
