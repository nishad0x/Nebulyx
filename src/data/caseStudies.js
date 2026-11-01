export const CASE_STUDIES = [
  {
    id: "chronopulse-fintech",
    title: "ChronoPulse FinTech",
    category: "Website building",
    categoryTag: "Web Architecture",
    badge: "410% Conversion Lift",
    tagline: "Next-Gen Ultra-Low Latency Institutional Trading Portal",
    client: "ChronoPulse Capital, Zurich",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    clientLogo: "CP",
    overview: "ChronoPulse needed an institutional-grade platform to launch their algorithmic liquidity network. Their existing legacy site had a 4.2-second load time, high bounce rates, and failed to project the technological prestige required for institutional capital allocators.",
    solution: "Nebulyx engineered a custom headless Next.js 15 platform with WebGL particle data visualizers, sub-180ms Time-To-Interactive, edge caching across 280 global nodes, and micro-interactions that communicate precision and credibility.",
    metrics: [
      { label: "TTFB Latency", value: "84ms", change: "-82%" },
      { label: "Demo Booking Surge", value: "+410%", change: "QoQ" },
      { label: "Lighthouse Score", value: "99/100", change: "+45 pts" },
      { label: "Institutional AUM Onboarded", value: "$48M", change: "In 90 Days" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Three.js", "Tailwind CSS", "Vercel Edge", "Framer Motion"],
    testimonial: {
      quote: "Nebulyx took our institutional pitch and turned it into an interactive masterpiece. Our demo conversion exploded by 4x in the first 60 days. Institutional LPs literally commended our platform's speed.",
      author: "Julian Vance",
      role: "Managing Partner",
      company: "ChronoPulse Capital"
    },
    results: [
      "Sub-200ms global response time achieved across Europe, US, and APAC",
      "Organic session duration tripled from 45 seconds to 3 minutes 20 seconds",
      "Seamlessly handled over 250,000 peak concurrent launch visitors without a single millisecond of downtime"
    ]
  },
  {
    id: "omnisync-logistics",
    title: "OmniSync Logistics",
    category: "Platform automation and automated workflows",
    categoryTag: "Platform Automation",
    badge: "42,000+ Hours Saved",
    tagline: "Autonomous Multi-Agent Freight Triage & Financial Reconciliation",
    client: "OmniSync Freight & Supply Chain, Chicago",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    clientLogo: "OS",
    overview: "OmniSync's operations team was drowning under 15,000 weekly bills of lading, manual carrier dispatching, and asynchronous client customs updates, requiring a 40-person team working around the clock on repetitive data entry.",
    solution: "Nebulyx designed a custom autonomous multi-agent orchestration architecture utilizing n8n Enterprise, Python FastAPI, and Claude 3.5 Sonnet to autonomously parse carrier documentation, cross-verify customs codes, update the ERP, and trigger automated Slack/Email alerts.",
    metrics: [
      { label: "Hours Saved / Year", value: "42,400 hrs", change: "Automated" },
      { label: "Error Rate", value: "0.01%", change: "Down from 8.4%" },
      { label: "Processing Speed", value: "12 sec", change: "Down from 45 min" },
      { label: "Annual Operational Savings", value: "$1.45M", change: "Net OPEX" }
    ],
    techStack: ["Python FastAPI", "n8n Enterprise", "Claude 3.5 Sonnet", "PostgreSQL", "Docker", "Slack Webhooks"],
    testimonial: {
      quote: "What used to take 40 employees 8 hours every morning is now completely finished before our management team even arrives at the office. Nebulyx built us an operational superpower.",
      author: "Elena Rostova",
      role: "Chief Operating Officer",
      company: "OmniSync Freight"
    },
    results: [
      "99.8% of inbound customs documents processed with zero human intervention",
      "Operational headcount redeployed from mundane data entry to high-value client acquisition",
      "Instant real-time anomaly detection preventing six-figure billing errors"
    ]
  },
  {
    id: "velox-viral-engine",
    title: "Velox Energy Drink",
    category: "Social media enhancement and management",
    categoryTag: "Social Growth",
    badge: "28.5M Organic Views",
    tagline: "Algorithmic Social Omnipresence & Automated Creator Pipeline",
    client: "Velox Performance Beverages, Miami",
    heroImage: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
    clientLogo: "VX",
    overview: "Velox was spending $120,000/month on paid ads with diminishing returns and near-zero organic brand affinity in a crowded Gen-Z energy beverage category.",
    solution: "Nebulyx deployed an end-to-end algorithmic content flywheel. We developed high-retention 3D motion hooks, an automated creator submission review pipeline, and an omnipresent cross-posting engine across TikTok, Instagram Reels, and YouTube Shorts.",
    metrics: [
      { label: "Organic Impressions", value: "28.5M+", change: "Over 90 Days" },
      { label: "Paid CAC Reduction", value: "-64%", change: "Blended CAC" },
      { label: "Follower Growth", value: "480k+", change: "All Platforms" },
      { label: "Direct Social Revenue", value: "$890K", change: "Attributed Sales" }
    ],
    techStack: ["CapCut Script Engine", "Figma Design System", "TikTok Creator API", "Meta Graph API", "Automated Media Pipeline"],
    testimonial: {
      quote: "Nebulyx cracked the algorithm for us. In 90 days, we became the most talked about new beverage brand on TikTok without spending another dollar on burning ad cash.",
      author: "Marcus Thorne",
      role: "Founder & CMO",
      company: "Velox Beverages"
    },
    results: [
      "Generated 14 viral videos exceeding 1M+ views each in the first quarter",
      "Established an automated brand ambassador network of 350+ micro-creators",
      "Surpassed key legacy competitors in organic social share-of-voice"
    ]
  },
  {
    id: "apexhealth-aeo-geo",
    title: "ApexHealth Longevity",
    category: "AEO & GEO Marketing",
    categoryTag: "AEO & GEO Marketing",
    badge: "#1 AI Search Citation",
    tagline: "Dominating Generative AI Search & Answer Engine Citations",
    client: "ApexHealth Diagnostics, Boston",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    clientLogo: "AH",
    overview: "Traditional Google organic traffic was dropping 35% as prospective patients migrated to querying Perplexity, ChatGPT Search, and Claude for personalized health recommendations and diagnostic clinic referrals.",
    solution: "Nebulyx re-architected ApexHealth's entire digital footprint using Generative Engine Optimization (GEO). We structured proprietary JSON-LD knowledge graphs, high-density medical semantic entities, and authoritative dataset citations recognized by LLM training crawlers.",
    metrics: [
      { label: "Perplexity Citation Rate", value: "94.2%", change: "#1 Recommended" },
      { label: "ChatGPT Search Referral", value: "+380%", change: "Monthly Growth" },
      { label: "Qualified Patient Leads", value: "1,240+", change: "Per Month" },
      { label: "AI Search Market Share", value: "78%", change: "In Longevity Category" }
    ],
    techStack: ["Semantic Entity Clustering", "JSON-LD Schema Matrix", "Perplexity API Telemetry", "OpenAI Embeddings", "Vector Graph DB"],
    testimonial: {
      quote: "While other clinics were still desperately fighting over Google blue links, Nebulyx made us the definitive answer whenever someone asks AI for the best preventative health clinic. Unbelievable foresight.",
      author: "Dr. Arthur Sterling, MD",
      role: "Chief Medical Officer",
      company: "ApexHealth"
    },
    results: [
      "Became the primary cited source on ChatGPT and Perplexity for over 180 high-intent medical queries",
      "Zero dependence on volatile Google algorithm updates",
      "Cost per qualified consultation dropped by 58% compared to traditional Google Ads"
    ]
  },
  {
    id: "aurelia-dropship",
    title: "Aurelia Minimal Living",
    category: "Business models dropshipping",
    categoryTag: "Scaled Dropshipping",
    badge: "$3.4M Scaled GMV",
    tagline: "Turnkey Headless E-Commerce & 4-Day European Automated Logistics",
    client: "Aurelia Home Concepts, London",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    clientLogo: "AU",
    overview: "The client wanted to launch a high-margin Scandinavian home aesthetics brand without holding any physical warehouse inventory, avoiding the traditional pitfalls of 20-day dropship delivery and low perceived value.",
    solution: "Nebulyx architected a turnkey autonomous dropshipping ecosystem: connected direct-to-factory private European agents guaranteeing 3-5 day tracked shipping, built a luxury headless Shopify storefront with sub-second checkout, and deployed automated inventory/pricing synchronization.",
    metrics: [
      { label: "Scaled GMV (120 Days)", value: "$3,420,000", change: "From $0" },
      { label: "Average Delivery Time", value: "3.8 Days", change: "EU & UK Wide" },
      { label: "Store Conversion Rate", value: "4.65%", change: "Industry Avg: 1.8%" },
      { label: "Return & Refund Rate", value: "<1.2%", change: "Industry Avg: 8%" }
    ],
    techStack: ["Shopify Plus", "Private Agent ERP Sync", "Stripe Multi-Currency", "Klaviyo AI", "TikTok Shop Direct"],
    testimonial: {
      quote: "Nebulyx didn't just build a dropshipping store; they built a modern luxury brand with bulletproof backend logistics. We did $3.4M in 4 months and I don't touch a single package.",
      author: "Freja Lindqvist",
      role: "Co-Founder",
      company: "Aurelia Living"
    },
    results: [
      "100% automated order-to-tracking fulfillment without human manual intervention",
      "Scalable infrastructure capable of absorbing $60k/day peak viral spikes effortlessly",
      "Built a defensible high-repeat customer database with a 28% 60-day re-order rate"
    ]
  },
  {
    id: "synthetix-ai-enterprise",
    title: "Synthetix Autonomous Lab",
    category: "Website building",
    categoryTag: "Ecosystem Build",
    badge: "$12M Series A Backed",
    tagline: "Full-Stack Agency Overhaul: Platform + Autonomous Pipeline + AEO",
    client: "Synthetix Bio-Engineering, San Francisco",
    heroImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80",
    clientLogo: "SX",
    overview: "Synthetix needed a total overhaul before their Series A round: an elite interactive website, automated investor pipeline triage, and AEO optimization so tech scouts discovering them via AI tools get instant validation.",
    solution: "Nebulyx deployed an integrated 3-pillar ecosystem: 3D interactive molecular visualization web platform, automated investor data-room access workflow, and an authoritative AI Answer Engine presence.",
    metrics: [
      { label: "Series A Secured", value: "$12,000,000", change: "Over-subscribed" },
      { label: "Global Press & AI Citations", value: "140+", change: "Authoritative Outlets" },
      { label: "Platform Performance", value: "100/100", change: "Zero Flaws" },
      { label: "Lead Inbound Volume", value: "+520%", change: "Enterprise Tier" }
    ],
    techStack: ["WebGL / Three.js", "React 19", "Python AI Engine", "Supabase", "Cloudflare Workers", "GEO Schema"],
    testimonial: {
      quote: "When Silicon Valley VCs opened our site, they were floored. Nebulyx made us look like an established $100M market leader before our Series A was even inked.",
      author: "Dr. Kian Patel",
      role: "Founder & CEO",
      company: "Synthetix"
    },
    results: [
      "Ranked #1 bio-computation startup across Perplexity and Google Gemini recommendations",
      "Investor pitch deck engagement jumped from 18% to 88% completion",
      "Closed oversubscribed round within 5 weeks of launch"
    ]
  }
];

