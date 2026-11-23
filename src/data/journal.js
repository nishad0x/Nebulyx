export const AUTHOR = {
  name: 'Sonu Kumar',
  alias: 'SKROCK',
  role: 'Founder, Nebulyx',
  bio: 'Sonu Kumar (SKROCK) is the founder of Nebulyx, a studio in Chandigarh, India that designs, builds and grows launches for founders: websites, AI automation, social growth, AI search and online stores.',
};

export const JOURNAL_PATH = '/journal/';

export const ARTICLES = [
  {
    slug: 'what-is-aeo-and-geo',
    title: 'What AEO and GEO mean, and how to get your business recommended by AI assistants',
    seoTitle: 'What Are AEO and GEO? Getting Recommended by AI Assistants',
    description: 'A plain guide to AEO and GEO: how ChatGPT, Perplexity, Claude and Gemini choose which businesses to mention, and what to fix first.',
    date: '2026-11-19',
    service: 'aeo-geo-marketing',
    kicker: 'AI search',
    intro: 'More of your buyers now ask an AI assistant for a recommendation before they ever open a search results page. "Which agency builds websites for startups?" "What is the best tool for invoicing?" The assistant answers in a few sentences, and it either mentions you or it does not. AEO and GEO are the names for the work that makes it more likely to mention you, and to describe you correctly when it does.',
    sections: [
      {
        h: 'AEO, GEO and SEO in one paragraph each',
        p: [
          'SEO (search engine optimization) is about ranking your pages in a list of results. The reader still clicks, scans and decides.',
          'AEO (answer engine optimization) is about being the source an assistant uses when it writes a direct answer. The reader may never visit your site, so the answer itself has to carry your name, what you do and why you fit.',
          'GEO (generative engine optimization) is the broader effort to be understood correctly by generative AI systems: consistent facts about your business across the web, content written so it can be quoted, and signals that you are a real, trustworthy company. In practice most people use AEO and GEO interchangeably, and both build on good SEO rather than replacing it.',
        ],
      },
      {
        h: 'How an assistant decides who to mention',
        p: [
          'Assistants that browse the web, such as Perplexity, ChatGPT search and Gemini, run searches in the background, read a handful of pages and summarise them. Assistants answering from memory rely on what they learned during training. Either way, they lean on the same few things: pages that answer the question directly, facts that are stated the same way in several places, and sources that look established.',
          'That means the assistant is not judging your design or your ad budget. It is judging whether your information is easy to find, easy to understand and easy to trust.',
        ],
      },
      {
        h: 'Five things to fix first',
        list: [
          'Make your site readable without JavaScript. Many crawlers, including several AI crawlers, read the raw HTML. If your page is empty until a script runs, they see nothing.',
          'Write pages that answer real questions. One page per service, with a plain description, who it is for, how it works and the questions buyers ask before they contact you.',
          'Add structured data. Organization, Service, FAQPage and BreadcrumbList markup state in machine-readable form what you offer and where you are.',
          'Keep your facts consistent. Your name, location, services and contact details should read the same on your site, social profiles and directory listings.',
          'Allow the crawlers in. Check robots.txt so the assistants you want to appear in are not blocked, and consider an llms.txt file that summarises your business.',
        ],
      },
      {
        h: 'How to check what assistants say about you today',
        p: [
          'Write down ten questions a buyer might ask before they find you, such as "who builds online stores for first-time founders". Ask each one in ChatGPT, Perplexity, Claude and Gemini. Note whether you are mentioned, how you are described, and which sources are cited. Repeat the same questions every month so you can see what changes.',
          'If an assistant describes you wrongly, the fix is rarely to argue with it. Find the source it is likely reading, such as an old directory listing or an outdated page, and correct it.',
        ],
      },
      {
        h: 'What no one can promise',
        p: [
          'No one controls what an AI assistant says. Anyone who guarantees that ChatGPT will recommend you is guessing. What you can control is how clear, consistent and citable your information is, and that is also what makes you easier to find in ordinary search.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-automate-first',
    title: 'What a small team should automate first, and what to leave alone',
    seoTitle: 'What to Automate First in a Small Team (and What Not To)',
    description: 'How founders can choose their first AI automations: where the hours go, which tasks suit a workflow, and which should stay with a person.',
    date: '2026-11-19',
    service: 'platform-automation',
    kicker: 'AI automation',
    intro: 'Most small teams do not need an "AI strategy". They need two or three hours a day back. The fastest way to get them is to automate the boring, repeatable work first, and to be honest about the work that still needs a person.',
    sections: [
      {
        h: 'Start by finding where the hours go',
        p: [
          'For one week, ask everyone to note any task they do more than three times that involves copying information from one place to another, sending a similar message, or checking whether something happened. You are looking for work that is frequent, follows the same steps, and has a clear "done" state.',
          'Rank the list by hours per week, then by how annoying the task is. Annoying tasks get done late and badly, so automating them often improves quality as well as speed.',
        ],
      },
      {
        h: 'Good first candidates',
        list: [
          'New lead handling: capture a form or inbox lead, add it to the CRM, tag where it came from and send a first reply.',
          'Data entry between tools: invoices to the accounting tool, orders to a spreadsheet, sign-ups to the email list.',
          'Repeated customer questions: answer routine questions from your own documentation and pass anything unusual to a person.',
          'Follow-ups and reminders: chase unpaid invoices, missed calls and stalled deals on a schedule.',
          'Reporting: a weekly summary of sales, sign-ups or support volume, sent to the team automatically.',
        ],
      },
      {
        h: 'What to leave with a person',
        p: [
          'Keep people in charge of anything where a wrong answer is expensive or hard to undo: refunds above a limit, legal or medical questions, pricing exceptions, and conversations with upset customers. An automation can prepare the information and draft a reply, but a person should decide.',
          'Also leave out processes that change every week. Automating a process before it is stable just means rebuilding the automation every week.',
        ],
      },
      {
        h: 'Design every automation to ask for help',
        p: [
          'The difference between a helpful automation and a dangerous one is what it does when something looks odd. Every workflow should have a clear rule for flagging an unusual case to a named person, and a simple log of what ran, so anyone on the team can see what happened without reading code.',
        ],
      },
      {
        h: 'Measure it like any other hire',
        p: [
          'Before you build, write down how many hours the task takes today and how often it goes wrong. After a month, check both again. If the numbers have not moved, the automation is not finished, or it was the wrong task to start with.',
        ],
      },
    ],
  },
  {
    slug: 'startup-website-checklist',
    title: 'The launch website checklist: what a founder actually needs on day one',
    seoTitle: 'Startup Website Checklist: What You Need on Day One',
    description: 'A short checklist for a founder launch website: the pages, copy, speed, search and tracking basics that matter on day one, and the extras that can wait.',
    date: '2026-11-19',
    service: 'web-building',
    kicker: 'Websites',
    intro: 'A launch website has one job: help the right visitor understand what you do and take the next step, whether that is signing up, buying or booking a call. Everything on day one should serve that job. Most of what founders worry about can wait.',
    sections: [
      {
        h: 'The pages you need',
        list: [
          'A homepage that says what you do, who it is for and what to do next, in the first screen.',
          'One page per product or service, with enough detail that a buyer can decide without emailing you.',
          'A simple way to get in touch or sign up that works on a phone.',
          'Privacy and terms pages, especially if you collect emails or take payments.',
        ],
      },
      {
        h: 'Copy before design',
        p: [
          'Write the words first. A clear headline, a two-sentence explanation and an obvious next step will do more for conversions than any animation. Read the first screen out loud to someone who does not know your business. If they cannot repeat back what you do, rewrite it before you design anything.',
        ],
      },
      {
        h: 'Speed and phones',
        p: [
          'Most visitors arrive on a phone, often on a slow connection. Keep the first screen light, show the main message without waiting for scripts, and test on a real mid-range phone, not just a laptop. A page that loads its main content in under two and a half seconds is a reasonable target.',
        ],
      },
      {
        h: 'Search basics on day one',
        list: [
          'A unique title and description for every page.',
          'Content in the HTML, so search engines and AI crawlers can read it without running scripts.',
          'A sitemap, a robots.txt file and a canonical link on every page.',
          'Structured data for your business and, where it fits, your services and FAQs.',
          'Google Search Console and Bing Webmaster Tools set up, so you can see how you are found.',
        ],
      },
      {
        h: 'What can wait',
        p: [
          'A blog, a large animation budget, multiple languages and a complex content system can all wait until you know what visitors respond to. Launch with a site you can change easily, watch what people do, and improve the pages that matter.',
        ],
      },
      {
        h: 'Make sure you own it',
        p: [
          'Your domain, hosting, analytics and the code itself should be in your name, not your agency\'s. If you ever change teams, you should be able to hand over the keys in an afternoon.',
        ],
      },
    ],
  },
  {
    slug: 'launching-a-store-without-stock',
    title: 'Launching an online store without holding stock: what it really takes',
    seoTitle: 'How to Launch an Online Store Without Holding Stock',
    description: 'What it takes to launch a dropshipping store: choosing products, vetting suppliers, pricing for margin, automating orders and testing first ads.',
    date: '2026-11-19',
    service: 'dropshipping-models',
    kicker: 'Online stores',
    intro: 'Dropshipping removes the need to buy stock up front: a supplier ships each order directly to your customer. It does not remove the work of running a store. The founders who do well treat it as a real business with real customers, not a shortcut.',
    sections: [
      {
        h: 'Pick a product you can explain',
        p: [
          'Good first products solve a clear problem, are easy to show in a short video, and are not sold everywhere at the same price. Before you build anything, check that you can describe who the product is for and why they would buy it from you rather than a large marketplace.',
        ],
      },
      {
        h: 'Vet suppliers before customers do',
        list: [
          'Order samples to check quality, packaging and real delivery times to your main market.',
          'Ask how stock levels are shared and what happens when an item sells out.',
          'Agree how returns and damaged items are handled before your first sale.',
          'Keep a second supplier in mind for your best-selling product.',
        ],
      },
      {
        h: 'Price for the whole cost, not the product cost',
        p: [
          'Your margin has to cover the product, shipping, payment fees, ads, returns and your time. Work out what you can afford to spend to win one customer before you set a price. Many new stores lose money on every order because they priced against the product cost alone.',
        ],
      },
      {
        h: 'Automate the order flow',
        p: [
          'Orders should pass to the supplier automatically, tracking numbers should flow back to the customer automatically, and stock changes should update your store without anyone copying them by hand. Manual order handling is where most early mistakes happen.',
        ],
      },
      {
        h: 'Test ads in small steps',
        p: [
          'Start with a small daily budget across a few short videos, keep the ones that bring in customers at a cost you can afford, and stop the rest quickly. Platforms such as TikTok Shop and Meta can grow a store fast, but only after you know which product and message work.',
        ],
      },
      {
        h: 'Be honest with customers',
        p: [
          'State delivery times clearly, answer messages quickly and make returns easy. Reviews and repeat buyers are what turn a test into a business, and they depend on customers trusting you.',
        ],
      },
    ],
  },
];

export function articlePath(slug) {
  return `${JOURNAL_PATH}${slug}/`;
}

export function minutesFor(article) {
  const text = [article.intro, ...article.sections.flatMap((sec) => [sec.h, ...(sec.p || []), ...(sec.list || [])])].join(' ');
  return Math.max(2, Math.round(text.split(/\s+/).length / 220));
}
