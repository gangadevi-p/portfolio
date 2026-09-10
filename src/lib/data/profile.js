/**
 * profile.js — the single canonical description of Gangadevi as a designer.
 *
 * This is the source of truth for anything that has to *explain her*: the
 * on-site "Portfolio guide" (portfolio-assistant.js reads `knowledge` below)
 * and the written PROFILE.md at the repo root.
 *
 * Everything here is drawn from the real project data (work.js, experience.js,
 * kiet.js, cueup.js, geekbull.js, adm.js, projects.js, site.js). If a project,
 * date, or metric changes in those files, update it here too.
 *
 * Voice: third person ("Gangadevi", "she") so the assistant can quote it
 * directly. PROFILE.md re-casts the same facts in the first person.
 */

export const identity = {
	name: 'Gangadevi',
	title: 'Product & UX Designer',
	location: 'Bengaluru, India',
	email: 'hello@gangadevi.design',
	links: [
		{ label: 'Dribbble', href: 'https://dribbble.com/' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/' },
		{ label: 'Read.cv', href: 'https://read.cv/' }
	],
	/** one line, use this when someone just wants the gist */
	oneLiner:
		'Product & UX designer who takes work from research and user flows through to polished, animated interfaces — focused on calm, useful products.'
};

/**
 * Who she is as a designer — the parts that do not fit in a project list.
 * Written to hold up whether the reader is a hiring manager, another designer,
 * or a recruiter skimming.
 */
export const designerIdentity = {
	summary:
		'Gangadevi is a Product & UX Designer based in Bengaluru. She works end to end — research, synthesis, information architecture, user flows, UI, and iteration — and cares most about the experience: calm, low-noise interfaces that make the common task faster. She has shipped a real product (the KIET Student App is live on the Play Store with measurable adoption) and has internship experience across B2B tools, product design, and communication design.',
	principles: [
		'Start from evidence — talk to real users, read what they say in their own words, and ground decisions in what people actually do.',
		'Design the whole path, not just the screen — IA and flows first, so the UI has a structure to sit on.',
		'Scope tightly on purpose — decide what the product is not, so the part that ships is clear.',
		'Calm over clever — reduce noise, surface status, make the frequent action the easy one.',
		'Show the work — case studies that carry the research, the structure, and the before/after, not just final shots.',
		'Use the tools that speed the thinking — Figma for craft, AI tools (Claude, ChatGPT) for research synthesis and drafting.'
	],
	strengths: [
		'End-to-end product design — owning a feature from problem to shipped UI',
		'User research and synthesis — interviews and forum/desk research turned into clear needs',
		'Information architecture and user flows, including multi-role products',
		'Interaction design and prototyping',
		'Design systems and reusable components',
		'Motion and micro-interactions',
		'Visual and communication design (poster / campaign work)'
	],
	/** what she is a good fit for */
	fitFor:
		'Teams that value thoughtful, user-centred product design and want a designer who can carry research through to a refined, considered interface. Comfortable across mobile apps, B2B tools, e-commerce, and visual design.'
};

/**
 * How she works — a repeatable process, pulled from the KIET case study and
 * the CueUp method.
 */
export const process = [
	{
		title: 'Ground the problem',
		text: 'Talk to the people who live with the problem. Observe their daily tasks, frustrations, and the workarounds they already use.'
	},
	{
		title: 'Set priorities',
		text: 'Organise the findings into clear user needs and focus on the tasks people perform most often.'
	},
	{
		title: 'Build structure',
		text: 'Map the information architecture, user flows, and wireframes so there is a clear foundation before any visual design.'
	},
	{
		title: 'Test',
		text: 'Review the flows with real users and refine anything that feels unclear, slow, or difficult.'
	},
	{
		title: 'Design and refine',
		text: 'Build the final interface and reusable components, matched to the product’s visual identity.'
	}
];

/**
 * Skills, each tied to where she has actually done it. "Evidence" is what makes
 * this useful to a hiring manager — it is not a self-rated bar chart.
 */
export const skills = [
	{
		name: 'Product design (end to end)',
		evidence: 'Owned product design at Manino; designed the KIET Student App and CueUp from problem to UI.'
	},
	{
		name: 'User research and synthesis',
		evidence: 'Student interviews for the KIET app; reviewed nine public Reddit threads to map how landlords and tenants coordinate rent and repairs for CueUp.'
	},
	{
		name: 'Information architecture',
		evidence: 'A 9-module IA with two roles for the KIET app; separate landlord and tenant IA maps for CueUp.'
	},
	{
		name: 'User flows and interaction design',
		evidence: 'Multi-role flows for both KIET (student + admin) and CueUp (landlord + tenant).'
	},
	{
		name: 'Prototyping',
		evidence: 'Interactive flows reviewed with students and refined before build.'
	},
	{
		name: 'Design systems',
		evidence: 'Reusable components for the KIET app; design-system and platform work during the Geekbull internship.'
	},
	{
		name: 'Motion and micro-interactions',
		evidence: 'A weekly motion-study series of interface animation experiments; animated interfaces in the portfolio itself.'
	},
	{
		name: 'Visual and communication design',
		evidence: 'A daily social-media poster series for ADM Education Society, one idea per issue.'
	},
	{ name: 'Front-end basics', evidence: 'Comfortable reading and tweaking the front end of what she designs.' }
];

export const tools = ['Figma (core)', 'Adobe XD', 'Canva', 'Notion', 'Claude', 'ChatGPT'];

/**
 * Selected work. `detailed: true` marks the two full case studies on the site.
 * Keep `outcome` factual — only the KIET app has shipped metrics.
 */
export const projects = [
	{
		name: 'KIET Student App',
		slug: 'kiet-student-app',
		year: '2024',
		role: 'Product Designer',
		detailed: true,
		context: 'Team of two (designer + Android developer), roughly four months. Live on the Google Play Store.',
		problem:
			'Students relied on WhatsApp, PDFs, and several separate websites for college information, so updates were hard to find and easy to miss.',
		contribution: 'Research, user personas, UX design, UI design, user flows, and iteration.',
		solution:
			'One app that brings announcements, attendance, academics, permissions, and campus services (café menu, library, timetable, fee portal, complaints, projects) into a single place — 9+ modules across two roles, student and admin.',
		outcome:
			'6,061 total acquisitions, about 600 daily and 1.8k monthly active users, and 5-star Play Store reviews. Usage rose around exam and academic periods, when campus information mattered most.'
	},
	{
		name: 'CueUp',
		slug: 'cueup',
		year: '2026',
		role: 'Product Designer',
		detailed: true,
		context: 'A self-directed product concept for self-managing landlords and their tenants.',
		problem:
			'Rent and repairs are the only two things a landlord and a tenant owe each other. Both live in WhatsApp and neither has a status, so both sides keep chasing people who owe them nothing.',
		contribution: 'Product design, research synthesis, and UI execution.',
		solution:
			'A shared view of rent and repairs, so every status, update, and next responsibility is clear to both sides — payment verification and repair progress in one place. Deliberately scoped: no accounting, no built-in chat, no payment processing, no vendor marketplace; payments stay external (UPI, bank, cash) and accountability stays manual.',
		outcome:
			'Competitive analysis (RentOk, RentRovio, Rent Maa), landlord and tenant personas, information architecture and user flows for both roles, and the UI.'
	},
	{
		name: 'Athera',
		year: '2026',
		role: 'Designer',
		context: 'An e-commerce web app for selling furniture.',
		problem: 'Retail / e-commerce product design for a furniture catalogue and checkout.',
		contribution: 'Interface and experience design for the storefront.',
		outcome: 'Portfolio project.'
	},
	{
		name: 'Fitbit',
		year: '2024',
		role: 'Designer',
		context: 'A product-design exercise on a real-world application.',
		contribution: 'Interface and flow design.',
		outcome: 'Portfolio project.'
	}
];

/** Smaller experiments — the "I Play" / playground list. */
export const playground = [
	{ name: 'Motion study — micro-interactions', year: '2025', note: 'A weekly set of interface animation experiments.' },
	{ name: 'Type specimen — Anton / Archivo', year: '2024', note: 'An editorial layout system for heavy display type.' },
	{ name: 'Icon set — 48 line glyphs', year: '2024', note: 'Open-source, pixel-snapped at 24px.' },
	{
		name: 'Colour tool — accessible palettes',
		year: '2023',
		note: 'Generates WCAG-safe colour ramps from a single seed colour.'
	}
];

/** Work history — from experience.js. */
export const experience = [
	{
		company: 'Manino',
		role: 'Product Designer',
		period: 'May 2026 – July 2026',
		text: 'Designed an end-to-end product — flows, visuals, UX, and problem-solving.'
	},
	{
		company: 'Geekbull',
		role: 'UI/UX Design Intern',
		period: 'Nov 2024 – Feb 2025',
		text: 'Worked on three products across the internship: Vyaasa (an HRMS platform), a chatbot, and Pixer data.'
	},
	{
		company: 'ADM Education Society',
		role: 'Graphic Design Intern',
		period: 'May 2024 – June 2024',
		text: 'A daily social-media poster series for the organisation’s channels — one issue a day, each carried by a single idea.'
	}
];

/**
 * The same story, framed for the three people most likely to read it.
 */
export const forAudience = {
	hiringManager:
		'She ships. The KIET Student App is live on the Play Store with real adoption (6,061 acquisitions, ~600 DAU), and she designed it end to end, carrying research, IA, flows, and UI with minimal hand-off. She scopes tightly — CueUp is defined as much by what it refuses to do as by what it does — and she communicates decisions through structured case studies. Her work ranges across mobile apps, B2B tools, e-commerce, and communication design.',
	designer:
		'Research-led and systems-minded. She shows the IA, the flows, and the before/after iterations, not just the final shots. She thinks in reusable components, treats motion as part of the craft, and grounds choices in real user language (student interviews, forum research). Comfortable pairing with engineers — the KIET app was built with an Android developer.',
	recruiter:
		'Product & UX Designer in Bengaluru with around two years across product design and internships (Manino, Geekbull, ADM). One shipped app on the Play Store, two detailed case studies, and a playground of smaller craft experiments. Core tool is Figma, works alongside AI tools for research and drafting.'
};

/**
 * Flat, searchable knowledge base for the on-site guide.
 * Each entry: an id, `tags` the matcher scores a question against, and the
 * `text` reply (portfolio-guide voice, 2–4 sentences).
 * Order matters only as a tie-breaker — earlier entries win an equal score.
 */
export const knowledge = [
	{
		id: 'who',
		tags: ['designer', 'herself', 'identity', 'summary', 'overview', 'bio', 'introduce', 'introduction', 'yourself'],
		text: designerIdentity.summary
	},
	{
		id: 'philosophy',
		tags: ['philosophy', 'principle', 'principles', 'approach', 'believe', 'belief', 'values', 'style', 'think', 'opinion', 'mindset'],
		text: 'Gangadevi designs the whole path, not just the screen: information architecture and flows first, then UI. She starts from evidence — real user language from interviews and forums — scopes tightly on purpose, and favours calm, low-noise interfaces that make the frequent task the easy one. She also believes in showing the work, so her case studies carry the research and the before/after, not only final shots.'
	},
	{
		id: 'process',
		tags: ['process', 'method', 'methodology', 'workflow', 'steps', 'stages', 'iterate', 'iteration'],
		text: 'Her process runs in five steps: ground the problem by talking to the people who live with it; set priorities by turning findings into clear needs and focusing on the most frequent tasks; build structure with IA, flows, and wireframes; test the flows with real users and refine what is slow or unclear; then design and refine the final interface and reusable components.'
	},
	{
		id: 'skills',
		tags: ['skill', 'skills', 'strength', 'strengths', 'strongest', 'expertise', 'good', 'best', 'ux', 'ui', 'capabilities', 'do'],
		text: 'Gangadevi is strongest at end-to-end product design, user research and synthesis, information architecture, and user flows — including multi-role products. She also works in prototyping, design systems, motion and micro-interactions, and visual / communication design. Each of these is backed by real project work: student interviews and a 9-module IA for the KIET app, nine Reddit threads synthesised for CueUp, and a daily poster series for ADM.'
	},
	{
		id: 'tools',
		tags: ['tool', 'tools', 'figma', 'software', 'stack', 'ai', 'claude', 'chatgpt', 'canva', 'notion', 'xd'],
		text: 'Figma is her core tool, with Adobe XD, Canva, and Notion alongside it. She also uses AI tools — Claude and ChatGPT — for research synthesis and drafting, which is how CueUp’s forum research was pulled together.'
	},
	{
		id: 'kiet',
		tags: ['kiet', 'student', 'app', 'campus', 'college', 'university', 'play', 'store', 'android', 'metrics', 'impact', 'users'],
		text: 'For the KIET Student App, Gangadevi designed a unified campus app for announcements, attendance, academics, permissions, and services like the café menu, library, and timetable — 9+ modules across student and admin roles. Students had been relying on WhatsApp, PDFs, and scattered websites. Her role covered research, personas, UX and UI, user flows, and iteration; the finished app reached 6,061 total acquisitions, about 600 daily and 1.8k monthly active users, and 5-star Play Store reviews.'
	},
	{
		id: 'cueup',
		tags: ['cueup', 'landlord', 'tenant', 'rent', 'repair', 'repairs', 'property', 'housing', 'whatsapp'],
		text: 'CueUp is a 2026 product concept for self-managing landlords and their tenants. Rent and repairs are the only two things the two sides owe each other, but both live in WhatsApp with no status, so everyone keeps chasing. Gangadevi reviewed nine public Reddit threads, then designed a shared status view that makes payment verification, repair progress, and the next responsibility clear — deliberately scoped to leave out accounting, chat, payment processing, and a vendor marketplace.'
	},
	{
		id: 'athera',
		tags: ['athera', 'ecommerce', 'e-commerce', 'furniture', 'retail', 'shop', 'store', 'web'],
		text: 'Athera is a 2026 e-commerce web app for selling furniture — a retail project covering the storefront and checkout experience. It is shown in the portfolio grid rather than as a full case study.'
	},
	{
		id: 'fitbit',
		tags: ['fitbit', 'fitness', 'health', 'wearable', 'tracker'],
		text: 'Fitbit is a 2024 product-design exercise on a real-world application, focused on interface and flow design. It sits in the portfolio grid rather than as a full case study.'
	},
	{
		id: 'playground',
		tags: ['playground', 'experiment', 'experiments', 'side', 'play', 'motion', 'icon', 'icons', 'type', 'typography', 'colour', 'color', 'palette'],
		text: 'Her playground collects smaller craft experiments: a weekly motion study of interface animations, an editorial type specimen system for Anton / Archivo, an open-source 48-glyph icon set pixel-snapped at 24px, and a colour tool that generates WCAG-safe palette ramps from a single seed colour.'
	},
	{
		id: 'manino',
		tags: ['manino', 'recent', 'current', 'latest', 'now'],
		text: 'At Manino (Product Designer, May – July 2026) Gangadevi designed an end-to-end product — user flows, visuals, UX, and problem-solving. It is her most recent product role.'
	},
	{
		id: 'geekbull',
		tags: ['geekbull', 'hrms', 'vyaasa', 'chatbot', 'pixer', 'b2b', 'platform'],
		text: 'At Geekbull (UI/UX Design Intern, Nov 2024 – Feb 2025) Gangadevi worked on three products: Vyaasa, an HRMS platform; a chatbot; and Pixer data. It is where she got hands-on with B2B tool design and platform components.'
	},
	{
		id: 'adm',
		tags: ['adm', 'poster', 'posters', 'graphic', 'social', 'media', 'campaign', 'communication'],
		text: 'At ADM Education Society (Graphic Design Intern, May – June 2024) she ran a daily poster series for the organisation’s social channels — one issue a day, each poster carried by a single idea, covering topics from animal welfare to pollution.'
	},
	{
		id: 'experience',
		tags: ['experience', 'intern', 'internship', 'internships', 'job', 'jobs', 'history', 'employment', 'career', 'roles', 'worked', 'background'],
		text: 'Recent roles: Product Designer at Manino (2026), designing an end-to-end product — flows, visuals, UX, and problem-solving; UI/UX Design Intern at Geekbull (2024–25), working on an HRMS platform, a chatbot, and Pixer data; and Graphic Design Intern at ADM Education Society (2024), running a daily social-media poster series.'
	},
	{
		id: 'hire',
		tags: ['hire', 'fit', 'recruit', 'hiring', 'manager', 'reason', 'candidate', 'value', 'bring'],
		text: forAudience.hiringManager
	},
	{
		id: 'for-designers',
		tags: ['designer', 'designers', 'team', 'craft', 'peer', 'collaborate', 'critique', 'systems'],
		text: forAudience.designer
	},
	{
		id: 'contact',
		tags: ['contact', 'reach', 'email', 'hire', 'talk', 'connect', 'linkedin', 'dribbble', 'message', 'resume', 'cv'],
		text: 'You can reach Gangadevi at hello@gangadevi.design, or through the Dribbble, LinkedIn, and Read.cv links on the site. The Resume link on the page has her full profile.'
	},
	{
		id: 'location',
		tags: ['location', 'where', 'based', 'city', 'bengaluru', 'bangalore', 'india', 'remote', 'relocate'],
		text: 'Gangadevi is based in Bengaluru, India, and works as a Product & UX Designer.'
	},
	{
		id: 'experience-length',
		tags: ['years', 'experience', 'long', 'senior', 'junior', 'level', 'much', 'old', 'fresher', 'graduate'],
		text: 'She has around two years of design experience across product roles and internships — Manino (2026), Geekbull (2024–25), and ADM (2024) — plus the KIET Student App, which she designed and shipped to the Play Store in 2024.'
	},
	/**
	 * Kept last on purpose: its tags ("work", "project") are generic, so any
	 * specific project or company entry above should win a tie before this
	 * catch-all does.
	 */
	{
		id: 'work-overview',
		tags: ['work', 'works', 'project', 'projects', 'case', 'study', 'studies', 'portfolio', 'built', 'made', 'shipped'],
		text: 'The portfolio highlights four projects: the KIET Student App (a unified campus app, live on the Play Store), CueUp (rent and repair coordination for landlords and tenants), Athera (a furniture e-commerce web app), and Fitbit. KIET and CueUp are the two detailed case studies — they show her research, structure, flows, interfaces, and iteration.'
	}
];

/** Fallback when nothing scores — still useful, still points somewhere. */
export const fallback =
	'Gangadevi is a Product & UX Designer in Bengaluru, focused on calm, useful digital experiences. She takes work from research and flows through to polished, animated interfaces. Try asking about her design approach, her skills, the KIET Student App, CueUp, her experience, or why she could be a good fit for your team.';

export const profile = {
	identity,
	designerIdentity,
	process,
	skills,
	tools,
	projects,
	playground,
	experience,
	forAudience,
	knowledge,
	fallback
};

export default profile;
