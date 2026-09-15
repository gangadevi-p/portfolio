/**
 * chat-tools.js — the toolset the LLM-backed portfolio assistant can call.
 *
 * Each tool reads from the same canonical data files the site itself renders
 * from (profile.js, site.js, data/experience.js, data/resume.js) so the
 * assistant can never say something the portfolio doesn't already show.
 */
import { profile } from '$data/profile.js';
import { site } from '$data/site.js';
import { experience as experienceCards } from '$data/experience.js';
import { resume } from '$data/resume.js';

const { identity, designerIdentity, process, skills, tools, projects, playground, experience, knowledge, fallback } =
	profile;

function norm(text) {
	return String(text || '').toLowerCase().trim();
}

function findProject(name) {
	const q = norm(name);
	if (!q) return null;
	return (
		projects.find((p) => norm(p.name) === q || norm(p.slug) === q) ||
		projects.find((p) => norm(p.name).includes(q) || q.includes(norm(p.name))) ||
		null
	);
}

function findPlaygroundItem(name) {
	const q = norm(name);
	if (!q) return null;
	return playground.find((p) => norm(p.name).includes(q) || q.includes(norm(p.name))) || null;
}

function findExperience(company) {
	const q = norm(company);
	if (!q) return null;
	return experience.find((e) => norm(e.company).includes(q) || q.includes(norm(e.company))) || null;
}

function findExperienceCard(company) {
	const q = norm(company);
	if (!q) return null;
	return experienceCards.find((e) => norm(e.company).includes(q) || q.includes(norm(e.company))) || null;
}

/** words too common to carry meaning when scoring a search query */
const STOP_WORDS = new Set([
	'the', 'a', 'an', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'to', 'of',
	'in', 'on', 'for', 'and', 'or', 'her', 'his', 'she', 'he', 'they', 'them',
	'i', 'you', 'we', 'me', 'my', 'your', 'their', 'about', 'tell', 'give', 'show',
	'what', 'whats', 'can', 'could', 'would', 'please', 'with', 'as', 'at', 'by',
	'from', 'more', 'some', 'any', 'this', 'that', 'these', 'those', 'it', 'be',
	'how', 'why', 'who', 'when', 'where', 'which', 'am', 'so', 'if', 'not', 'know'
]);

function tokenize(text) {
	return norm(text)
		.replace(/[^a-z0-9\s-]/g, ' ')
		.split(/\s+/)
		.filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

function sameWord(a, b) {
	if (a === b) return true;
	if (a.length > 3 && a.replace(/s$/, '') === b) return true;
	if (b.length > 3 && b.replace(/s$/, '') === a) return true;
	return false;
}

/** OpenAI tool ("function") definitions — passed as `tools` on every request. */
export const toolDefinitions = [
	{
		type: 'function',
		function: {
			name: 'list_projects',
			description:
				'List every project in the portfolio — the featured case studies and the smaller playground experiments — with a one-line summary of each. Use this first for any broad "what has she worked on / show me her projects" question.',
			parameters: { type: 'object', properties: {}, additionalProperties: false }
		}
	},
	{
		type: 'function',
		function: {
			name: 'get_project_details',
			description:
				'Get full details on one specific project by name (e.g. "KIET Student App", "CueUp", "Athera", "Fitbit", or a smaller playground item like "motion study"): problem, her contribution, the solution, and the outcome/metrics.',
			parameters: {
				type: 'object',
				properties: {
					name: { type: 'string', description: 'The project name the visitor asked about.' }
				},
				required: ['name'],
				additionalProperties: false
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'list_work_experience',
			description: 'List her work history — every company, role, and period, most recent first.',
			parameters: { type: 'object', properties: {}, additionalProperties: false }
		}
	},
	{
		type: 'function',
		function: {
			name: 'get_experience_details',
			description:
				'Get full detail on one specific job by company name (e.g. "Manino", "Geekbull", "ADM Education Society"), including what she actually worked on there.',
			parameters: {
				type: 'object',
				properties: {
					company: { type: 'string', description: 'The company name the visitor asked about.' }
				},
				required: ['company'],
				additionalProperties: false
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'get_about',
			description:
				'Get who she is as a designer — summary, design principles, strengths, who she is a good fit for, her five-step process, and her name/title/location.',
			parameters: { type: 'object', properties: {}, additionalProperties: false }
		}
	},
	{
		type: 'function',
		function: {
			name: 'get_skills',
			description: 'Get her skills, each backed by the specific project it was demonstrated in, plus her tool stack.',
			parameters: { type: 'object', properties: {}, additionalProperties: false }
		}
	},
	{
		type: 'function',
		function: {
			name: 'get_contact',
			description: 'Get how to contact or hire her — email, social links, and the résumé download link.',
			parameters: { type: 'object', properties: {}, additionalProperties: false }
		}
	},
	{
		type: 'function',
		function: {
			name: 'get_playground',
			description: 'List her smaller side experiments (the "I Play" section) — motion studies, type, icons, colour tools.',
			parameters: { type: 'object', properties: {}, additionalProperties: false }
		}
	},
	{
		type: 'function',
		function: {
			name: 'search_knowledge',
			description:
				'Free-text fallback search over her full knowledge base. Use this only when none of the other, more specific tools cover the question (e.g. "how many years of experience", "where is she based", "why should we hire her").',
			parameters: {
				type: 'object',
				properties: {
					query: { type: 'string', description: 'The visitor question, verbatim or close to it.' }
				},
				required: ['query'],
				additionalProperties: false
			}
		}
	}
];

function runSearchKnowledge(query) {
	const words = tokenize(query);
	if (words.length === 0) return { answer: fallback };

	let best = null;
	let bestScore = 0;
	for (const entry of knowledge) {
		let score = 0;
		for (const word of words) {
			if (entry.tags.some((tag) => sameWord(tag, word))) score += 3;
			else if (word.length >= 4 && entry.tags.some((tag) => tag.length >= 4 && (tag.includes(word) || word.includes(tag))))
				score += 1;
		}
		if (score > bestScore) {
			bestScore = score;
			best = entry;
		}
	}
	return { answer: bestScore >= 3 ? best.text : fallback };
}

/** name -> handler(args) */
const handlers = {
	list_projects: () => ({
		caseStudies: projects.map(({ name, slug, year, role, detailed, outcome }) => ({
			name,
			slug,
			year,
			role,
			detailed,
			outcome
		})),
		playground
	}),

	get_project_details: ({ name } = {}) => {
		const project = findProject(name);
		if (project) return { found: true, ...project };
		const item = findPlaygroundItem(name);
		if (item) return { found: true, ...item, isPlaygroundItem: true };
		return {
			found: false,
			availableProjects: projects.map((p) => p.name),
			availablePlayground: playground.map((p) => p.name)
		};
	},

	list_work_experience: () => ({ experience }),

	get_experience_details: ({ company } = {}) => {
		const base = findExperience(company);
		const card = findExperienceCard(company);
		if (!base && !card) return { found: false, available: experience.map((e) => e.company) };
		return {
			found: true,
			company: base?.company || card?.company,
			role: base?.role || card?.role,
			period: base?.period || card?.period,
			summary: base?.text,
			highlights: card?.points || (card?.blurb ? [card.blurb] : undefined),
			status: card?.status
		};
	},

	get_about: () => ({ identity, ...designerIdentity, process, tools }),

	get_skills: () => ({ skills, tools }),

	get_contact: () => ({
		email: site.email,
		location: site.location,
		socials: site.socials,
		resumeUrl: resume.resumeUrl
	}),

	get_playground: () => ({ playground }),

	search_knowledge: ({ query } = {}) => runSearchKnowledge(query)
};

/** Execute a tool the model asked for; never throws — errors come back as data. */
export function runTool(name, args) {
	const handler = handlers[name];
	if (!handler) return { error: `Unknown tool: ${name}` };
	try {
		return handler(args || {});
	} catch (err) {
		return { error: err instanceof Error ? err.message : 'Tool failed' };
	}
}
