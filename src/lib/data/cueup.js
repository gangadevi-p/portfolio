/**
 * CueUp — case study content.
 *
 * This mirrors /static/files/cueup reference.png section for section. The
 * diagram coordinates below are measured off the source deck: both flows are
 * laid out on the same 1020px canvas the rest of the page uses, so the nodes
 * sit exactly where the reference puts them.
 */

export const cueupMeta = {
	slug: 'cueup',
	title: 'CueUp',
	role: 'Product Designer',
	year: '2026',
	summary: 'A shared view of rent and repairs for self-managing landlords and their tenants.',
	cover: '/cueup/landlord-home.png'
};

/** the deck's left-hand contents list — order matches the sections below */
export const contents = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'research', label: 'Research' },
	{ id: 'competitive-analysis', label: 'Competitive Analysis' },
	{ id: 'user-persona', label: 'User Persona' },
	{ id: 'constraints', label: 'Constraints' },
	{ id: 'ia-landlord', label: 'Information Architecture' },
	{ id: 'flow-landlord', label: 'User Flow' },
	{ id: 'design-landlord', label: 'Design' },
	{ id: 'design-system', label: 'Design System' },
	{ id: 'future-scope', label: 'Future Scope' },
	{ id: 'learnings', label: 'Learnings' }
];

export const hero = {
	phone: { src: '/cueup/landlord-home.png', alt: 'CueUp landlord home screen' },
	/** looping walkthrough shown inside the phone frame at the top of the page */
	video: { src: '/cueup/landlord-demo.mp4', alt: 'CueUp landlord app walkthrough' }
};

export const overview = {
	lead: [
		{
			text: 'Rent and repairs are the only two things a landlord and a tenant owe each other. Both live in WhatsApp, neither has a status — so both sides keep chasing people who owe them nothing.'
		}
	],
	facts: [
		{ label: 'Title', values: ['CueUp'] },
		{ label: 'Target audience', values: ['Self-managing landlords', 'Tenants'] },
		{ label: 'Focus', values: ['Rent', 'Repair coordination'] },
		{ label: 'Time line', values: ['Apr 2026 –Jul 2026'] },
		{
			label: 'Tools',
			tools: [
				{ src: '/cueup/tool-figma.png', alt: 'Figma', round: true },
				{ src: '/cueup/tool-claude.png', alt: 'Claude' },
				{ src: '/cueup/tool-chatgpt.png', alt: 'ChatGPT' }
			]
		},
		{ label: 'My Role', values: ['Product design', 'Research synthesis', 'UI Excecution'] }
	]
};

export const solution = [
	{ text: 'CueUp gives landlords and tenants a ' },
	{ text: 'shared view', bold: true },
	{ text: ' of rent and repairs, making every status, update, and next responsibility clear.' }
];

export const findings = {
	note: 'I reviewed nine public Reddit posts and comments to understand how landlords and tenants currently coordinate rent and repairs.',
	callout: 'CueUp Focuses On Payment Verification And Repair Progress.',
	tracks: [
		{
			title: 'Rent Coordination',
			tone: 'green',
			stages: [
				{
					title: 'Rent Due & Paid',
					today: 'Pays externally but may still receive reminders',
					gap: 'checks multiple payment sources manually'
				},
				{
					title: 'Proof Shared',
					today: 'shares screenshots or asks for a receipt',
					gap: 'proof gets buried inside chat or dispured',
					highlight: true
				},
				{
					title: 'Payment Verified',
					today: 'Manually checks if the payment was received',
					gap: 'Lacks a reliable paid pending and overdue view'
				}
			]
		},
		{
			title: 'Repair coordination',
			tone: 'orange',
			stages: [
				{
					title: 'Repair Reported',
					today: 'Reports issues via calls or messages without a record',
					gap: 'Requests arrive across different channels'
				},
				{
					title: 'Assigned & Resolved',
					today: 'Follows up repeatedly to understand repair progress',
					gap: 'Tracks vendors , promises and closure manually',
					highlight: true
				}
			]
		}
	],
	/**
	 * Sources row — a "Sources:" label followed by six clickable user chips.
	 * Each chip links out to the Reddit thread and reveals the post itself on
	 * hover/focus, rendered as text by CRedditPost (no screenshots). The wording
	 * mirrors the reference deck, typos and all.
	 */
	sources: {
		label: 'Sources:',
		users: [
			{
				label: 'User 01',
				href: 'https://www.reddit.com/',
				posts: [
					'Building A Tool To Track Trent Payment After My Owner Disputed On Rent Payment – Anyone Else Dealt With This?'
				]
			},
			{
				label: 'User 02',
				href: 'https://www.reddit.com/',
				posts: ['Suggest Paper Trail For Rent Payment By Cash']
			},
			{
				label: 'User 03',
				href: 'https://www.reddit.com/',
				posts: ['How Do You Handle Tenant Repair Requests & Track Issues Oer Time']
			},
			{
				label: 'User 04',
				href: 'https://www.reddit.com/',
				posts: [
					'I Always Sent A Message On WhatsAapp To Confirm That I Had Made This Month’s Payment. Until I Received Yes From Him.',
					'More Over I Sent Payment Online With Message “So And So Month’s Rent”'
				]
			},
			{
				label: 'User 05',
				href: 'https://www.reddit.com/',
				posts: [
					'Tenants Call For Minor Repairs, Sometimes For Plumbing Or Electrical. Nothing Major.',
					'But Coordinating Everything Remotely Gets Tiring.',
					'You End Up Depending On Random Contacts Or Whoever The Tenant Suggests And Doubt Of Quality Of Work.'
				]
			},
			{
				label: 'User 06',
				href: 'https://www.reddit.com/',
				posts: ['How Do Tenants Reports Issues ? (Text . Mail Or Call)']
			}
		]
	}
};

export const compare = {
	note: 'Built for different rental needs',
	columns: [
		{
			logo: { src: '/cueup/logo-rentok.png', alt: 'RentOk', wide: true },
			focus: 'PG, Hostel And Co-Living Properties',
			cueup: 'For Self-Managing Landlords With A Few Properties'
		},
		{
			logo: { src: '/cueup/logo-rentrovio.png', alt: 'RentRovio' },
			focus: 'PG, Hostel And Co-Living Properties',
			cueup: 'Simple Rent + Maintenance Coordination'
		},
		{
			logo: { src: '/cueup/logo-rentmaa.png', alt: 'Rent Maa' },
			focus: 'Shared Rent Records',
			cueup: 'Shared Status For Rent + Maintenance'
		}
	]
};

export const constraints = {
	note: 'The product was intentionally limited to a focused rent and repair coordination model.',
	items: [
		{
			title: 'Focused Audience',
			tone: 'violet',
			icon: '/cueup/icon-audience.png',
			text: 'Self-Managing Landlords With A Limited Number Of Properties And Their Tenants.'
		},
		{
			title: 'External Payments',
			tone: 'pink',
			icon: '/cueup/icon-payments.png',
			text: 'Rent Is Paid Through UPI, Bank Transfer, Or Cash. CueUp Records Proof And Status.'
		},
		{
			title: 'Manual Accountability',
			tone: 'amber',
			icon: '/cueup/icon-accountability.png',
			text: 'Landlords Verify Payments And Assign Technicians They Already Work With.'
		},
		{
			title: 'Product Boundary',
			tone: 'emerald',
			icon: '/cueup/icon-boundary.png',
			text: 'No Accounting, Built-In Chat, Payment Processing, Or Vendor Marketplace.'
		}
	]
};

/**
 * User persona. Only the headshot is an image asset — everything else (the
 * name tag, context, stats, and lists) is real text laid out by CPersona, so
 * it reads and reflows like the rest of the case study.
 */
export const personas = {
	landlord: {
		variant: 'landlord',
		sub: 'Landlords',
		name: 'Akash Kulkarni',
		tone: 'green',
		photo: { src: '/cueup/landlordimg.png', alt: 'Akash Kulkarni' },
		context:
			'Manages Rental Units Directly And Coordinates Rent And Repairs Through Notebooks, WhatsApp, Calls, And Payment Screenshots.',
		stats: [
			{ n: '25', label: 'Properties', color: '#1e40af' },
			{ n: '22', label: 'Occupied', color: '#2e7d32' },
			{ n: '3', label: 'Vacant', color: '#991b1b' }
		],
		behaviours: [
			'Accepts Rent Through UPI, Bank Transfer, Or Cash',
			'Checks Screenshots To Confirm Payments',
			'Sends Rent Reminders Manually',
			'Coordinates Repairs Through Calls And Personal Contacts'
		],
		painPoints: [
			'Payment Proofs Get Buried In Conversations',
			'Rent Tracking Depends On Memory And Manual Records',
			'Repair Requests Arrive Through Different Channels',
			'Status Updates Require Repeated Follow-Ups'
		],
		goals: [
			'Clearly Identify Paid, Pending, And Overdue Rent',
			'Avoid Reminding Tenants Who Have Already Paid',
			'Track Repair Progress And Responsibility',
			'Maintain A Reliable History Of Payments And Repairs'
		]
	},
	tenant: {
		variant: 'tenant',
		sub: 'Tenants',
		name: 'Arjun',
		tone: 'blue',
		photo: { src: '/cueup/tenantimg.png', alt: 'Arjun' },
		context:
			'Pays Rent Externally And Coordinates Payment Confirmation And Repairs With His Landlord Through WhatsApp, Calls, And Screenshots.',
		behaviours: [
			'Pays Through UPI, Bank Transfer, Or Cash',
			'Saves And Shares Payment Screenshots',
			'Messages The Landlord For Payment Confirmation',
			'Reports And Follows Up On Repairs Through WhatsApp Or Calls'
		],
		painPoints: [
			'Paid Rent Can Still Be Questioned',
			'Payment Proof Provides No Clear Closure',
			'Repair Progress Remains Unclear',
			'Updates Require Repeated Follow-Ups'
		],
		goals: [
			'Maintain Reliable Proof Of Rent Payments',
			'Know When A Payment Is Confirmed',
			'Report Repair Issues Clearly',
			'Track Repair Progress And Responsibility'
		]
	}
};

/**
 * Information architecture. `width` is the child-pill width in canvas px;
 * groups sit left to right across the 1020px column.
 */
export const iaLandlord = {
	note: 'For landlords',
	groups: [
		{
			root: 'Home',
			tone: 'violet',
			x: 12,
			width: 202,
			children: ['Overview', 'Needs Attention', 'Overdue', 'Activity']
		},
		{
			root: 'Rent',
			tone: 'sky',
			x: 269,
			width: 201,
			children: ['Rent status', 'Payments Verify', 'Paid', 'Late& Due']
		},
		{
			root: 'Tenants',
			tone: 'pink',
			x: 526,
			width: 219,
			children: ['Occupancy Status', 'Invite tenant', 'Tenant Details']
		},
		{ root: 'Repairs', tone: 'amber', x: 800, width: 147, children: ['Open', 'Resolved'] }
	]
};

export const iaTenant = {
	note: 'For Tenants',
	groups: [
		{
			root: 'Home',
			tone: 'emerald',
			x: 22,
			width: 185,
			children: ['Pay & Submit', 'Raise Request', 'Updates', 'Profile']
		},
		{
			root: 'Rent',
			tone: 'pink',
			x: 262,
			width: 144,
			children: ['Pay Rent', 'Tenancy', 'History']
		},
		{
			root: 'Repairs',
			tone: 'skyDeep',
			x: 461,
			width: 185,
			children: ['Open', 'Resolved', 'Raise Request']
		}
	]
};

/**
 * User flows. Nodes are [x, y, width, height] on a 1020 x `height` canvas,
 * connectors are polylines through the same space; `arrow` puts a head on the
 * final point.
 */
export const flowLandlord = {
	note: 'Landlords',
	height: 276,
	nodes: [
		{ label: 'Home', tone: 'home', box: [554, 28, 134, 38] },
		{ label: 'Assign Vendor', tone: 'fuchsia', box: [204, 41, 157, 31] },
		{ label: 'Assign', tone: 'fuchsia', box: [375, 41, 112, 31] },
		{ label: 'Overdue Tenants', tone: 'amber', box: [755, 41, 177, 31] },
		{ label: 'Select Vendor', tone: 'fuchsia', box: [105, 85, 155, 31] },
		{ label: 'Open Repairs', tone: 'lime', box: [320, 94, 150, 31] },
		{ label: 'Payments to verify', tone: 'violet', box: [529, 94, 190, 31] },
		{ label: 'Tenant Detail', tone: 'amber', box: [770, 105, 148, 31] },
		{ label: 'Cancel', tone: 'fuchsia', box: [54, 154, 101, 31] },
		{ label: 'Confirm', tone: 'fuchsia', box: [178, 155, 109, 31] },
		{ label: 'View Request', tone: 'lime', box: [316, 155, 151, 31] },
		{ label: 'Review Proof', tone: 'violet', box: [543, 155, 149, 31] },
		{ label: 'Call', tone: 'amber', box: [748, 171, 77, 31] },
		{ label: 'Message', tone: 'amber', box: [847, 171, 115, 31] },
		{ label: 'Overview', tone: 'lime', box: [335, 216, 112, 31] },
		{ label: 'End', tone: 'fuchsia', box: [117, 217, 112, 31] }
	],
	links: [
		{ tone: 'fuchsia', points: [[554, 47], [520, 47], [520, 57], [489, 57]], arrow: true },
		{ tone: 'fuchsia', points: [[375, 57], [363, 57]], arrow: true },
		{ tone: 'lime', points: [[431, 72], [431, 83], [395, 83], [395, 92]], arrow: true },
		{ tone: 'lime', points: [[395, 125], [392, 125], [392, 153]], arrow: true },
		{ tone: 'lime', points: [[392, 186], [391, 186], [391, 214]], arrow: true },
		{ tone: 'lime', points: [[335, 232], [296, 232], [296, 74]], arrow: true },
		{ tone: 'lime', points: [[316, 171], [296, 171]] },
		{
			tone: 'fuchsia',
			points: [[183, 116], [183, 135], [105, 135], [105, 152]],
			arrow: true
		},
		{
			tone: 'fuchsia',
			points: [[183, 135], [233, 135], [233, 153]],
			arrow: true
		},
		{ tone: 'fuchsia', points: [[105, 185], [105, 201], [173, 201], [173, 215]], arrow: true },
		{ tone: 'fuchsia', points: [[233, 186], [233, 201], [173, 201]] },
		{ tone: 'violet', points: [[621, 66], [621, 92]], arrow: true },
		{ tone: 'violet', points: [[624, 125], [618, 125], [618, 153]], arrow: true },
		{ tone: 'amber', points: [[688, 47], [722, 47], [722, 57], [753, 57]], arrow: true },
		{ tone: 'amber', points: [[843, 72], [843, 103]], arrow: true },
		{ tone: 'amber', points: [[844, 136], [844, 155], [787, 155], [787, 169]], arrow: true },
		{ tone: 'amber', points: [[844, 155], [905, 155], [905, 169]], arrow: true }
	]
};

export const flowTenant = {
	note: 'For Tenants',
	height: 366,
	nodes: [
		{ label: 'Home', tone: 'home', box: [416, 23, 134, 38] },
		{ label: 'Rent due', tone: 'orange', box: [249, 68, 116, 31] },
		{ label: 'Raise Request', tone: 'blue', box: [554, 67, 155, 31] },
		{ label: 'Pay', tone: 'orange', box: [197, 128, 112, 31] },
		{ label: 'Submit', tone: 'orange', box: [323, 129, 112, 31] },
		{ label: 'Open', tone: 'blue', box: [573, 128, 112, 31] },
		{ label: 'Describe Issue', tone: 'pink', box: [754, 129, 159, 31] },
		{ label: 'Pre-Filled Rent', tone: 'orange', box: [142, 190, 161, 31] },
		{ label: 'Upload proof', tone: 'orange', box: [306, 190, 147, 31] },
		{ label: 'List Of Requests', tone: 'blue', box: [542, 191, 172, 31] },
		{ label: 'Set Priority', tone: 'pink', box: [770, 189, 133, 31] },
		{ label: 'Select Payment Mode', tone: 'orange', box: [103, 250, 214, 31] },
		{ label: 'View Detail', tone: 'blue', box: [573, 252, 112, 31] },
		{ label: 'Submit', tone: 'pink', box: [790, 250, 103, 31] },
		{ label: 'Pay Externally', tone: 'orange', box: [118, 312, 155, 31] },
		{ label: 'Track Status', tone: 'pink', box: [769, 310, 143, 31] }
	],
	links: [
		{ tone: 'orange', points: [[483, 61], [483, 84], [367, 84]], arrow: true },
		{ tone: 'blue', points: [[483, 61], [483, 83], [552, 83]], arrow: true },
		{ tone: 'orange', points: [[307, 99], [307, 113], [253, 113], [253, 126]], arrow: true },
		{ tone: 'orange', points: [[307, 113], [379, 113], [379, 127]], arrow: true },
		{ tone: 'orange', points: [[253, 159], [223, 159], [223, 188]], arrow: true },
		{ tone: 'orange', points: [[379, 160], [380, 160], [380, 188]], arrow: true },
		{ tone: 'orange', points: [[223, 221], [210, 221], [210, 248]], arrow: true },
		{ tone: 'orange', points: [[210, 281], [196, 281], [196, 310]], arrow: true },
		{ tone: 'orange', points: [[273, 328], [380, 328], [380, 223]], arrow: true },
		{ tone: 'blue', points: [[632, 98], [629, 98], [629, 126]], arrow: true },
		{ tone: 'blue', points: [[629, 159], [628, 159], [628, 189]], arrow: true },
		{ tone: 'blue', points: [[628, 222], [629, 222], [629, 250]], arrow: true },
		{ tone: 'pink', points: [[709, 83], [834, 83], [834, 127]], arrow: true },
		{ tone: 'pink', points: [[834, 160], [837, 160], [837, 187]], arrow: true },
		{ tone: 'pink', points: [[837, 220], [842, 220], [842, 248]], arrow: true },
		{ tone: 'pink', points: [[842, 281], [841, 281], [841, 308]], arrow: true }
	]
};

export const futureScope = {
	note:
		'Future iterations can strengthen coordination and trust while preserving CueUp’s focused rent-and-repairs boundary.',
	items: [
		{
			title: 'Validate core flows',
			text: 'Test payment verification and repair tracking with landlords and tenants to identify usability gaps.'
		},
		{
			title: 'Smarter reminders',
			text: 'Customise reminder timing and exclude tenants who have already paid or submitted proof.'
		},
		{
			title: 'Payment exceptions',
			text: 'Support rejected proofs, resubmissions, partial payments, and corrections without processing payments inside CueUp.'
		},
		{
			title: 'Stronger repair tracking',
			text: 'Add priority, completion dates, photos, and issue reopening for better repair visibility.'
		}
	]
};

export const learnings = {
	note:
		'CueUp showed that everyday coordination problems are often visibility problems before they become feature problems.',
	items: [
		{
			title: 'Shared status reduces confusion',
			text: 'One shared view makes completed, pending, and action-required tasks clear without searching through conversations.'
		},
		{
			title: 'Payment needs confirmation',
			text: 'Landlord verification gives both sides closure and creates a dependable record after payment proof is submitted.'
		},
		{
			title: 'Attention guides hierarchy',
			text: 'Overdue rent, unverified proofs, and active repairs should receive greater visibility than completed items.'
		},
		{
			title: 'Focus creates clarity',
			text: 'Limiting CueUp to rent and repairs kept the product simple, relevant, and easier to understand.'
		}
	]
};

export const designSystem = {
	note:
		'A compact system built around calm surfaces, clear hierarchy, and status colours that make rental coordination easy to scan.',
	colors: [
		{ name: 'Canvas', hex: '#F2F5F8', value: '#f2f5f8' },
		{ name: 'Surface', hex: '#FFFFFF', value: '#ffffff' },
		{ name: 'Ink', hex: '#1F2937', value: '#1f2937' },
		{ name: 'Success', hex: '#2E7D32', value: '#2e7d32' },
		{ name: 'Attention', hex: '#D97706', value: '#d97706' },
		{ name: 'Overdue', hex: '#991B1B', value: '#991b1b' }
	],
	components: [
		{ title: 'Status tags', text: 'Short, high-contrast states make rent and repair progress instantly scannable.' },
		{ title: 'Action cards', text: 'Raised, rounded surfaces bring the next action to the front without clutter.' },
		{ title: 'Role-aware navigation', text: 'Simple bottom navigation keeps Home, Rent, and Repairs accessible in context.' }
	]
};
