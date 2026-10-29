/**
 * WhatsApp Threads — a self-directed feature concept.
 *
 * Everything on /work/whatsapp-threads reads from here. The chat in the phone
 * mock is made up; nothing here is a research result — the "test" block is the
 * plan for validating the idea, not findings.
 */

export const whatsappMeta = {
	title: 'WhatsApp Threads',
	summary:
		'Optional, Reddit-style reply threads for big WhatsApp groups — so a trip plan doesn’t get buried under match talk.'
};

export const hero = {
	eyebrow: 'Feature concept · WhatsApp',
	title: 'Threads for',
	accent: 'busy group chats',
	lead: 'In a group of 50 friends, some are planning a trip while others are talking about something completely different. I designed optional reply threads, so each conversation stays in one place.',
	facts: [
		{ label: 'Role', value: 'Product designer' },
		{ label: 'Type', value: 'Self-directed concept' },
		{ label: 'Platform', value: 'WhatsApp mobile' },
		{ label: 'Year', value: '2026' }
	]
};

/** People in the mock group. `tone` picks the avatar colour. */
export const people = {
	arjun: { name: 'Arjun', tone: '#1f8a70' },
	priya: { name: 'Priya', tone: '#c2410c' },
	meera: { name: 'Meera', tone: '#7c3aed' },
	karthik: { name: 'Karthik', tone: '#0369a1' },
	sana: { name: 'Sana', tone: '#be185d' },
	dev: { name: 'Dev', tone: '#a16207' },
	neha: { name: 'Neha', tone: '#4d7c0f' },
	rohit: { name: 'Rohit', tone: '#0f766e' }
};

export const group = { name: 'College Gang 🎓', members: 50 };

/**
 * Topics colour the "today" chat so the mix-up is visible, and label threads.
 * They are only a teaching aid in the mock — WhatsApp wouldn't tag messages.
 */
export const topics = {
	trip: { label: 'Goa trip', color: '#0d9488' },
	match: { label: 'Last night’s match', color: '#7c3aed' },
	gift: { label: 'Rohit’s gift', color: '#db2777' },
	other: { label: 'Everything else', color: '#94a3b8' }
};

/** WhatsApp today: one flat stream where three conversations interleave. */
export const flatChat = [
	{ from: 'arjun', topic: 'trip', text: 'Goa trip — Dec 20 to 24? Who’s in?', time: '6:02 PM' },
	{ from: 'meera', topic: 'match', text: 'Did anyone watch the match last night??', time: '6:03 PM' },
	{ from: 'priya', topic: 'trip', text: 'I’m in!! 🌴', time: '6:03 PM' },
	{ from: 'karthik', topic: 'match', text: 'That last over was unreal 🔥', time: '6:04 PM' },
	{ from: 'sana', topic: 'gift', text: 'Who’s chipping in for Rohit’s birthday gift?', time: '6:05 PM' },
	{ from: 'neha', topic: 'trip', text: 'Wait, which dates?', quote: { from: 'arjun', text: 'Goa trip — Dec 20 to 24?' }, time: '6:06 PM' },
	{ from: 'dev', topic: 'match', text: 'Still can’t believe that catch', time: '6:06 PM' },
	{ from: 'meera', topic: 'gift', text: 'I can do ₹500', time: '6:07 PM' },
	{ from: 'arjun', topic: 'trip', text: 'Booking train tickets tonight, ₹1,850 each', time: '6:08 PM' },
	{ from: 'karthik', topic: 'match', text: 'Highlights link 👇', time: '6:08 PM' },
	{ from: 'priya', topic: 'gift', text: 'Headphones? He keeps losing his', time: '6:09 PM' },
	{ from: 'dev', topic: 'other', text: 'Good evening everyone ☀️', time: '6:10 PM' }
];

/**
 * The same hour with threads. A message with `thread` carries its replies;
 * `count` is the full reply total and `replies` is the preview shown inline.
 * Replies can hold one level of `children` — the Reddit-style indent.
 */
export const threadedChat = [
	{
		id: 'trip',
		from: 'arjun',
		topic: 'trip',
		text: 'Goa trip — Dec 20 to 24? Who’s in?',
		time: '6:02 PM',
		thread: {
			count: 14,
			unread: 3,
			last: '2m',
			people: ['priya', 'neha', 'sana', 'dev'],
			replies: [
				{ from: 'priya', text: 'I’m in!! 🌴', time: '6:03 PM' },
				{
					from: 'neha',
					text: 'Dec 20 works for me',
					time: '6:06 PM',
					children: [{ from: 'arjun', text: 'Booking train tickets tonight, ₹1,850 each', time: '6:08 PM' }]
				},
				{ from: 'sana', text: 'Add me too, I’ll sort the stay', time: '6:12 PM' }
			]
		}
	},
	{
		id: 'match',
		from: 'meera',
		topic: 'match',
		text: 'Did anyone watch the match last night??',
		time: '6:03 PM',
		thread: {
			count: 23,
			unread: 0,
			last: '5m',
			people: ['karthik', 'dev', 'rohit'],
			replies: [
				{ from: 'karthik', text: 'That last over was unreal 🔥', time: '6:04 PM' },
				{
					from: 'dev',
					text: 'Still can’t believe that catch',
					time: '6:06 PM',
					children: [{ from: 'karthik', text: 'Highlights link 👇', time: '6:08 PM' }]
				}
			]
		}
	},
	{
		id: 'gift',
		from: 'sana',
		topic: 'gift',
		text: 'Who’s chipping in for Rohit’s birthday gift? 🤫',
		time: '6:05 PM',
		thread: {
			count: 6,
			unread: 2,
			last: '1m',
			people: ['meera', 'priya'],
			replies: [
				{ from: 'meera', text: 'I can do ₹500', time: '6:07 PM' },
				{ from: 'priya', text: 'Headphones? He keeps losing his', time: '6:09 PM' }
			]
		}
	},
	{ id: 'hello', from: 'dev', topic: 'other', text: 'Good evening everyone ☀️', time: '6:10 PM' }
];

export const problem = {
	quote:
		'One thing that annoys me about WhatsApp is how conversations get mixed up in large groups. It gets hard to follow.',
	stripNote:
		'An illustrative hour in a 50-person group. Each dot is a message, coloured by the conversation it belongs to.',
	/** the order of topics in the strip — sketched, not measured */
	strip:
		'tmtgtmmgtomtgmtmtgotmmgtmtgmtomtgtmgtmmtgtomtgmt',
	pains: [
		{
			title: 'Topics collide',
			text: 'Three plans run at once in one stream. To follow the trip, you read every match message in between.'
		},
		{
			title: 'Replies lose their place',
			text: 'A quoted reply lands at the bottom of the chat, far from the message it answers. You scroll up to rebuild the context.'
		},
		{
			title: 'Catching up is all or nothing',
			text: '300 unread means reading everything or skipping everything, and the one message that mattered can get lost either way.'
		}
	]
};

export const compare = {
	today: {
		label: 'WhatsApp today',
		points: [
			'Every reply goes into one flat timeline',
			'Quoted replies scatter a conversation across the chat',
			'No way to see how many people are in a discussion',
			'Muting is per group: all of it, or none of it'
		]
	},
	redesign: {
		label: 'With threads',
		points: [
			'Replies collect under the message they answer',
			'Each thread collapses to one line with a reply count',
			'Avatars and “last reply” show what’s active right now',
			'Follow or mute a single thread, not the whole group'
		]
	}
};

export const steps = [
	{
		title: 'Start a thread',
		text: 'Long-press any message and pick “Reply in thread”, right next to the Reply you already know.'
	},
	{
		title: 'Replies stay together',
		text: 'Replies collect under the original message. The main chat shows one line: the count, who’s talking and when.'
	},
	{
		title: 'Expand or collapse',
		text: 'Tap the reply count to open the thread inline and tap again to fold it away. You can also open it full screen.'
	},
	{
		title: 'Follow what matters',
		text: 'Unread badges are per thread, so you can catch up on the trip plan and skip 23 messages about the match.'
	}
];

/** Callouts on the anatomy card, numbered in reading order. */
export const anatomy = [
	{ n: 1, title: 'Parent message', text: 'An ordinary message. It only becomes a thread when someone replies in one.' },
	{ n: 2, title: 'Reply count', text: 'The tap target. It expands and collapses the thread.' },
	{ n: 3, title: 'Who’s in it', text: 'Up to three avatars, so you can tell at a glance whether it’s your conversation.' },
	{ n: 4, title: 'Last activity', text: 'Shows whether a thread is still active or finished.' },
	{ n: 5, title: 'Unread badge', text: 'Counts new replies in this thread only, separate from the group total.' }
];

export const decisions = [
	{
		title: 'Optional, not a new mode',
		text: 'Normal chatting stays exactly as it is. A thread only exists when someone chooses to start one.'
	},
	{
		title: 'Small groups stay the same',
		text: 'A four-person family chat never has to see a thread. Nothing changes until someone uses the feature.'
	},
	{
		title: 'Collapsed by default',
		text: 'The main chat stays short, one line per conversation, and you expand only what you care about.'
	},
	{
		title: 'One level of nesting',
		text: 'Reddit nests replies without limit, but a phone screen can’t. Replies can have replies, one level deep, so threads stay readable.'
	}
];

export const testing = {
	note: 'This is a concept, so nothing here has been tested yet. Here is how I’d validate it before calling it a solution.',
	who: 'Active groups of 20+ members, such as friend groups, college batches and housing societies, using a clickable prototype.',
	tasks: [
		{ title: 'Follow a conversation', text: '“What dates did the group settle on for the trip?” Can people answer without scrolling through other topics?' },
		{ title: 'Find a message', text: 'Time to find a specific plan or link, compared with today’s flat chat.' },
		{ title: 'Catch up after a break', text: 'After 100+ unread, can people tell which conversations matter to them?' },
		{ title: 'Adopt it unprompted', text: 'Do people start threads on their own, or keep replying in the main chat?' }
	]
};

export const openQuestions = [
	'Should thread replies notify everyone, or only the people who joined that thread?',
	'What happens when someone answers in the main chat instead of the thread? Should WhatsApp suggest moving it?',
	'Should group admins be able to turn threads off for announcement-style groups?',
	'How does a thread look for someone on an older app version without the feature?'
];
