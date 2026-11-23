import React from 'react';
import { renderToString } from 'react-dom/server';
import SiteNav from './components/site/SiteNav';
import { Welcome, About, Services, Process, Work, Studio, Contact } from './components/site/Sections';
import FaqSection from './components/FaqSection';
import ServicePage, { servicePath } from './components/site/ServicePage';
import AboutPage, { ABOUT_PATH } from './components/site/AboutPage';
import { JournalIndex, ArticlePage } from './components/site/JournalPages';
import AiCheckPage, { AI_CHECK_PATH, AI_CHECK_FAQS } from './components/site/AiCheckPage';
import { ARTICLES, AUTHOR, JOURNAL_PATH, articlePath } from './data/journal';
import { FAQS } from './data/faqs';
import { SERVICES_DATA } from './data/services';
import { SERVICE_PAGES } from './data/servicePages';
import { CONTACT } from './data/contact';

const SITE = 'https://www.nebulyx.live';
const noop = () => {};

function StaticHome() {
  return (
    <div className="relative text-white antialiased">
      <SiteNav chapter={0} onBook={noop} />
      <main>
        <Welcome onBook={noop} />
        <About />
        <Services onBookService={noop} />
        <Process />
        <Work />
        <Studio />
        <FaqSection />
        <Contact onBook={noop} />
      </main>
    </div>
  );
}

function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function renderHome() {
  return { html: renderToString(<StaticHome />), schemas: [faqPage(FAQS)] };
}

export const SERVICE_ROUTES = SERVICES_DATA.map((service) => {
  const page = SERVICE_PAGES[service.id];
  const path = servicePath(page.slug);
  const url = `${SITE}${path}`;
  return {
    id: service.id,
    path,
    url,
    title: page.seoTitle,
    description: page.metaDescription,
    ogImage: `${SITE}/og/${page.slug}.png`,
    render: () => renderToString(<ServicePage id={service.id} />),
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description: page.metaDescription,
        url,
        areaServed: 'Worldwide',
        provider: {
          '@type': 'ProfessionalService',
          name: 'Nebulyx',
          url: `${SITE}/`,
          email: CONTACT.email,
          address: { '@type': 'PostalAddress', addressLocality: 'Chandigarh', addressCountry: 'IN' },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
      },
      faqPage(page.faqs),
    ],
  };
});

const ABOUT_URL = `${SITE}${ABOUT_PATH}`;

const JOURNAL_URL = `${SITE}${JOURNAL_PATH}`;
const PUBLISHER = {
  '@type': 'Organization',
  name: 'Nebulyx',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
};
const PERSON = {
  '@type': 'Person',
  name: AUTHOR.name,
  alternateName: AUTHOR.alias,
  jobTitle: 'Founder',
  worksFor: { '@type': 'Organization', name: 'Nebulyx', url: `${SITE}/` },
  url: `${SITE}/about/`,
  sameAs: [CONTACT.instagram],
};

const journalCrumbs = (extra) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Journal', item: JOURNAL_URL },
    ...extra,
  ],
});

const JOURNAL_ROUTES = [
  {
    id: 'journal',
    path: JOURNAL_PATH,
    url: JOURNAL_URL,
    title: 'Journal — Founder Guides on Websites, AI and Growth | Nebulyx',
    description: 'Plain answers to the questions founders ask about websites, AI automation, AI search and online stores, written by Sonu Kumar, founder of Nebulyx.',
    ogImage: `${SITE}/og/journal.png`,
    render: () => renderToString(<JournalIndex />),
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Nebulyx Journal',
        url: JOURNAL_URL,
        publisher: PUBLISHER,
        blogPost: ARTICLES.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.title,
          url: `${SITE}${articlePath(a.slug)}`,
          datePublished: a.date,
          author: { '@type': 'Person', name: AUTHOR.name },
        })),
      },
      journalCrumbs([]),
    ],
  },
  ...ARTICLES.map((a) => {
    const url = `${SITE}${articlePath(a.slug)}`;
    const image = `${SITE}/og/journal-${a.slug}.png`;
    return {
      id: `journal-${a.slug}`,
      path: articlePath(a.slug),
      url,
      title: `${a.seoTitle} | Nebulyx`,
      description: a.description,
      ogImage: image,
      render: () => renderToString(<ArticlePage slug={a.slug} />),
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: a.title,
          description: a.description,
          image,
          datePublished: a.date,
          dateModified: a.date,
          author: PERSON,
          publisher: PUBLISHER,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          isPartOf: { '@type': 'Blog', name: 'Nebulyx Journal', url: JOURNAL_URL },
        },
        journalCrumbs([{ '@type': 'ListItem', position: 3, name: a.title, item: url }]),
      ],
    };
  }),
];

const AI_CHECK_URL = `${SITE}${AI_CHECK_PATH}`;
const AI_CHECK_ROUTE = {
  id: 'ai-visibility-check',
  path: AI_CHECK_PATH,
  url: AI_CHECK_URL,
  title: 'Free AI Visibility Check: What ChatGPT Says About You | Nebulyx',
  description: 'Free check of what ChatGPT, Perplexity, Gemini and Claude say about your business, who they recommend instead, and what to fix first.',
  ogImage: `${SITE}/og/ai-visibility-check.png`,
  render: () => renderToString(<AiCheckPage />),
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Free AI visibility check',
      serviceType: 'AI search visibility audit',
      description: 'A free report on how ChatGPT, Perplexity, Gemini and Claude describe a business, which competitors they recommend instead, and what to fix first.',
      url: AI_CHECK_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      provider: { '@type': 'ProfessionalService', name: 'Nebulyx', url: `${SITE}/` },
    },
    faqPage(AI_CHECK_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Free AI visibility check', item: AI_CHECK_URL },
      ],
    },
  ],
};

export const EXTRA_ROUTES = [
  AI_CHECK_ROUTE,
  ...JOURNAL_ROUTES,
  {
    id: 'about',
    path: ABOUT_PATH,
    url: ABOUT_URL,
    title: 'About Nebulyx — A Studio for Founders in Chandigarh, India',
    description: 'Nebulyx is a Chandigarh studio that designs, builds and grows launches for founders worldwide: one team, a written price up front, and you own everything.',
    ogImage: `${SITE}/og/about.png`,
    render: () => renderToString(<AboutPage />),
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Nebulyx',
        url: ABOUT_URL,
        mainEntity: {
          '@type': 'ProfessionalService',
          name: 'Nebulyx',
          url: `${SITE}/`,
          email: CONTACT.email,
          logo: `${SITE}/logo.png`,
          address: { '@type': 'PostalAddress', addressLocality: 'Chandigarh', addressCountry: 'IN' },
          areaServed: 'Worldwide',
          founder: [
            { '@type': 'Person', name: CONTACT.founder, alternateName: CONTACT.founderAlias, jobTitle: 'Founder', knowsAbout: ['Brand and website design', 'Web engineering', 'AI automation', 'AI search optimization'] },
            { '@type': 'Person', name: CONTACT.coFounder, jobTitle: 'Co-founder', knowsAbout: ['Growth marketing', 'Social media', 'Client success', 'Project delivery'] },
          ],
          sameAs: [CONTACT.instagram],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: ABOUT_URL },
        ],
      },
    ],
  },
];

export const STATIC_PAGES = ['/privacy.html', '/terms.html'];
export const SITE_URL = SITE;
