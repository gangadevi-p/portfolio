/**
 * KIET Student App — case study content (Project 1).
 *
 * Every string / list below drives the page at /work/kiet-student-app.
 * App screenshots live in /static/kiet — swap the files (keep the names) with
 * your own exports. `persona` photos are transparent cut-outs.
 */

export const kietMeta = {
	slug: 'kiet-student-app',
	title: 'KIET Student App',
	role: 'Product Designer',
	year: '2024',
	summary: 'One app for everything at KIET campus — announcements, academics and student services.',
	cover: '/kiet/hero-phone-home.png'
};

export const hero = {
	badge: 'KIET Student App • Case study',
	titleLead: 'One App For Everything At',
	titleAccent: 'KIET Campus.',
	stats: [
		{ n: '9+', label: 'Core Modules', tone: 'blue' },
		{ n: '2', label: 'User Roles', tone: 'green' },
		{ n: '1', label: 'Unified Platform', tone: 'orange' }
	],
	lead: 'I faced this myself, so I brought scattered campus information and daily tasks into one place.'
};

export const mockups = [
	{ src: '/img/KIET/Home so.png', alt: 'KIET Student App home screen mockup' },
	{ src: '/img/KIET/Attedance So.png', alt: 'KIET Student App attendance screen mockup' },
	{ src: '/img/KIET/Materials so.png', alt: 'KIET Student App materials screen mockup' }
];

export const overview = {
	overview:
		'KIET Student App brings campus information, academics, and student services into one mobile platform. It helps students access daily updates and tasks more easily.',
	problem: {
		label: 'Student Experience',
		text: 'Students relied on WhatsApp, PDFs, and multiple websites for important college information. This made updates harder to find and easy to miss.'
	},
	solution: {
		label: 'Product Response',
		text: 'The app brings announcements, attendance, academics, and campus services into one place. It makes common student tasks faster and more organised.'
	}
};

export const team = {
	facts: [
		{ label: 'Users:', value: 'Students + Admin', tone: 'teal' },
		{ label: 'Timeline :', value: '4 Months', tone: 'dark' }
	],
	download: {
		label: 'Download App',
		href: 'https://play.google.com/store/apps/details?id=com.bharath.kiet_student_app&hl=en_IN'
	},
	members: [
		{
			name: 'Gangadevi',
			role: 'Product Designer',
			contributions: ['Research', 'User Personas', 'UX Design', 'UI Design', 'User Flows', 'Iteration']
		},
		{
			name: 'Bharath Prakash',
			role: 'Android Developer',
			contributions: ['Development', 'Integration', 'Testing', 'Builds', 'Deployment', 'Maintenance']
		}
	]
};

export const process = [
	{
		title: 'Ground Problem',
		tone: 'sky',
		text: 'Spoke with students to understand their daily tasks, frustrations, and difficulties with the existing experience.'
	},
	{
		title: 'Set Priorities',
		tone: 'blush',
		text: 'Organised the findings into clear user needs and focused on the tasks students performed most often.'
	},
	{
		title: 'Build Structure',
		tone: 'mint',
		text: 'Mapped the information architecture, user flows, and wireframes to create a clear foundation for the app.'
	},
	{
		title: 'Test',
		tone: 'butter',
		text: 'Reviewed the flows with students and refined areas that felt unclear, slow, or difficult to use.'
	},
	{
		title: 'Design & Refine',
		tone: 'sky',
		text: "Created the final interface and reusable components based on student needs and KIET's visual identity."
	}
];

export const personas = [
	{
		roll: '216Q1A4601',
		name: 'Sharmista',
		branch: 'CSC',
		photo: '/kiet/persona-sharmista.png',
		pains: [
			'Important notices get buried in WhatsApp.',
			'Request status is unclear after submission.',
			'Campus information is spread across platforms.'
		],
		goals: [
			'See classes and important updates quickly.',
			'Track permissions and complaints easily.',
			'Access campus services in one place.'
		]
	},
	{
		roll: '216Q1A4371',
		name: 'Rahul',
		branch: 'CAI',
		photo: '/kiet/persona-rahul.png',
		pains: [
			'Academic progress is difficult to understand quickly.',
			'Materials and schedules are scattered.',
			'Missed updates can affect attendance and submissions.'
		],
		goals: [
			'Track attendance and academic progress easily.',
			'Find materials, projects and timetables quickly.',
			'Stay updated on deadlines and requirements.'
		]
	}
];

export const existing = [
	{ label: 'Whatsapp', tone: 'teal' },
	{ label: 'College website', tone: 'blue' },
	{ label: 'ERP portal', tone: 'rose' }
];

export const jobs = [
	{
		when: 'When I start my college day',
		want: 'I want to see my schedule & important updates',
		outcome: 'I know what needs my attention'
	},
	{
		when: 'When I check my academics',
		want: 'I want to see attendance & results quickly',
		outcome: 'I can track my progress'
	},
	{
		when: 'When I need permission',
		want: 'I want to Submit a request & check its status',
		outcome: 'I do not need to contact faculty repeatedly'
	},
	{
		when: 'When I need campus information',
		want: 'I want to find services like café, library & timetable',
		outcome: 'I can access everything in one place'
	}
];

export const ia = [
	{ root: 'Home', tone: 'brown', children: ['Recent Updates'] },
	{
		root: 'Quick Actions',
		tone: 'green',
		grid: [
			'Cafe Menu',
			'Library',
			'Fee Portal',
			'Permissions',
			'Easy Pay',
			'Time Table',
			'Birthdays',
			'Projects',
			'Complaints'
		]
	},
	{ root: 'Notification', tone: 'amber', children: ['New', 'Seen'] },
	{ root: 'Academics', tone: 'blue', children: ['Materials', 'Academics'] },
	{ root: 'Attendance', tone: 'rose', children: ['Status', 'Present & Absent'] },
	{ root: 'Profile', tone: 'teal', children: ['My profile', 'My Clubs', 'My Permissions'] }
];

export const flow = {
	spine: [
		{ label: 'Onboarding', tone: 'orange' },
		{ label: 'Enter Credentials', tone: 'rose' },
		{ label: 'Roll & Password', tone: 'rose' },
		{ label: 'Home', tone: 'orange' }
	],
	branches: [
		{ tone: 'blue', steps: ['Recent Updates', 'New', 'End'] },
		{ tone: 'blue', steps: ['Attendance', 'Checks their status', 'End'] },
		{ tone: 'orange', steps: ['Quick actions'] }
	],
	quickActions: [
		{ tone: 'teal', steps: ['Cafe menu', 'Checks avail items', 'End'] },
		{ tone: 'teal', steps: ['Complaints', 'Fill details', 'Submit', 'End'] },
		{ tone: 'teal', steps: ['Projects', 'Checks Progress', 'End'] },
		{ tone: 'teal', steps: ['Permissions', 'Fill details', 'Submit', 'End'] }
	]
};

export const studentExperience = {
	phone: { src: '/kiet/student-home.png', alt: 'Student home screen' }
};

export const iterated = {
	permissions: {
		title: 'Permissions',
		reason: 'Students had limited visibility into their permission requests, making it difficult to understand their status and know when follow-up was required.',
		outcome: 'Current iteration Created a clearer request lifecycle, helping students quickly understand approval status, responsible authorities, and the next action required.',
		screens: [
			{ src: '/img/KIET/Permissions Old.png', alt: 'Old permissions screen', label: 'Old' },
			{ src: '/img/KIET/Permissions so.png', alt: 'New permissions screen', label: 'New' }
		]
	},
	projects: {
		title: 'Projects',
		reason:
			'Project information was spread across different areas, making it difficult for students to understand overall progress, deadlines, and individual responsibilities.',
		outcome:
			'Current iteration brought important project context together, helping students understand progress, track responsibilities, and stay aware of upcoming deadlines.',
		screens: [
			{ src: '/img/KIET/Project Old.png', alt: 'Old projects screen', label: 'Old' },
			{ src: '/img/KIET/Projects So.png', alt: 'New projects screen', label: 'New' }
		]
	}
};

export const iterations = [
	{
		caption:
			'Reorganised the home screen to prioritise important updates, frequent actions, and daily classes',
		before: { src: '/kiet/iter-home-before.png', alt: 'Old home screen' },
		after: { src: '/kiet/iter-home-after.png', alt: 'New home screen' }
	},
	{
		caption: 'Simplified permission requests to make their status easier to scan and follow.',
		before: { src: '/kiet/iter-perm-before.png', alt: 'Old permissions screen' },
		after: { src: '/img/KIET/Permissions so.png', alt: 'New permissions screen' }
	}
];

export const admin = [
	{
		title: 'Student Details',
		oldReason:
			'The existing experience made student information harder to scan, slowing down how quickly admins could find and review students.',
		newReason:
			'The iteration focused on making student information easier to scan and navigate, improving efficiency for everyday administrative tasks.',
		screens: [
			{ src: '/img/KIET/Students old so.png', alt: 'Old admin student details screen', label: 'Old' },
			{ src: '/img/KIET/Student So.png', alt: 'New admin student details screen', label: 'New' }
		]
	},
	{
		title: 'Complaints',
		oldReason:
			'The existing experience made it harder to understand which complaints needed attention, creating friction in everyday issue management.',
		newReason:
			'The iteration focused on improving clarity around complaint handling, making it easier for admins to manage issues at a glance.',
		screens: [
			{ src: '/img/KIET/Complaints old So.png', alt: 'Old admin complaints screen', label: 'Old' },
			{ src: '/img/KIET/Complaints So.png', alt: 'New admin complaints screen', label: 'New' }
		]
	}
];

export const reviews = [
	{
		name: 'Naresh Dakarapu',
		date: '3/30/24',
		stars: 5,
		helpful: 8,
		text: 'it is very helpful for our college students to manage all works in a single app. And we can check my percentage and daily attendance here'
	},
	{
		name: 'Avinash Alapati',
		date: '5/2/24',
		stars: 5,
		helpful: 10,
		text: "As a KIET Student this app is very useful different purposes of students like academic pdf's cafe menu, results etc…  I would recommend everyone to install this app to get latest update on everything regarding KIET groups."
	},
	{
		name: 'Lava Kumar Sagireddy',
		date: '3/28/24',
		stars: 5,
		helpful: 10,
		text: 'The first app for our college is ready to rock. The features are too good and happy to see the developer is from our KIET itself. Smooth experience.'
	},
	{
		name: 'Midhin kathi',
		date: '5/3/24',
		stars: 5,
		helpful: 1,
		text: 'Excellent app for kiet all sources can be viewed here thankyou for making this app.'
	},
	{
		name: 'Kavya Amrutha Anisetti',
		date: '2/24/25',
		stars: 5,
		helpful: 1,
		text: 'Very useful thank you now no need to search any links. Loved it'
	},
	{
		name: 'Hemanth Kumar Ganteda',
		date: '7/28/24',
		stars: 5,
		helpful: 5,
		text: 'It is really a good recommended app for the students who are in kiet. And its provides pdfs in semesters wise.'
	}
];

export const impact = {
	stats: [
		{ n: '6,061', label: 'Total acquisitions', tone: 'green' },
		{ n: '1841', label: 'Google Play Explores', tone: 'blue' }
	],
	caption:
		'The app saw strong adoption after launch, with students continuing to discover and install it over time.',
	image: { src: '/kiet/impact-acquisitions.png', alt: 'Google Play acquisitions over time' }
};

export const usage = {
	stats: [
		{ n: '600', label: 'DAU', tone: 'green' },
		{ n: '1.8k', label: 'MAU', tone: 'blue' }
	],
	caption:
		'Usage increased around key academic periods, showing that students returned to the app when campus information mattered most',
	image: { src: '/kiet/impact-usage.png', alt: 'Daily and monthly active users over time' }
};
