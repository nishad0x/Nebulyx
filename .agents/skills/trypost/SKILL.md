---
name: trypost
description: >
  Autonomous multi-network social media scheduling, queue management, and publishing platform for AI agents.
  Connects to 13+ social networks (Instagram, TikTok, LinkedIn, X, YouTube, Facebook, Threads, Bluesky,
  Pinterest, Mastodon, Google Business, Telegram, Discord) via MCP server or REST API.
source: https://github.com/trypostit/trypost
---

# TryPost — Social Media Orchestration for AI Agents

TryPost is an open-source, multi-network social media scheduling and publishing platform engineered specifically for teams and AI agents. It powers automated content distribution, calendar scheduling, asset repurposing, and performance analytics across all major networks.

In **Nebulyx**, TryPost acts as the core distribution execution engine for **Discipline #3: Algorithmic Social Distribution Studio**.

---

## 1. Supported Social Networks

Every post is published natively through official platform APIs:

- **Short-Form Video & Visual:** TikTok, Instagram (Posts, Reels, Stories), YouTube (Shorts & Videos), Pinterest
- **Professional & Long-Form:** LinkedIn (Personal & Company Pages), Threads, Bluesky, Mastodon
- **Broadcast & Microblogging:** X (Twitter), Facebook Pages & Groups
- **Direct Messaging & Community:** Telegram Channels, Discord Servers, Google Business Profiles

---

## 2. Model Context Protocol (MCP) Integration

TryPost exposes a full-featured MCP server with over 80+ tools.

### Option A: TryPost Cloud / Hosted Instance

Add the remote MCP server to your Antigravity or workspace MCP configuration (`~/.gemini/config/mcp_config.json`):

```json
{
  "mcpServers": {
    "trypost": {
      "url": "https://trypost.it/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TRYPOST_API_TOKEN"
      }
    }
  }
}
```

### Option B: Self-Hosted Docker Instance

Self-host using the Docker Compose setup provided in the repository:

```bash
cd d:\Nebulyx\scratch\trypost-temp
docker compose up -d
```

Configure your local MCP endpoint:
```json
{
  "mcpServers": {
    "trypost-local": {
      "url": "http://localhost:8080/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_LOCAL_TRYPOST_TOKEN"
      }
    }
  }
}
```

---

## 3. Core MCP Toolsets

### 📝 Post Creation & Publishing
- `CreatePost` — Draft or schedule a single post tailored to a specific channel.
- `CreatePosts` — Batch draft omnichannel campaigns across multiple accounts simultaneously.
- `PublishPost` — Trigger immediate native publication.
- `PreviewPost` — Render a network-accurate preview before scheduling.
- `AttachMediaFromUrl` / `AttachMediaFromUpload` — Attach images and video assets directly to queued posts.
- `SetPostRecurrence` — Define automated recurring schedules.

### 📅 Queues & Posting Slots
- `ListSocialAccounts` — Retrieve connected accounts, token validity, and channel IDs.
- `GetPostingSchedule` / `UpdatePostingSchedule` — Inspect and modify weekly time slots.
- `ListFreeSlots` — Identify upcoming open calendar slots for scheduled publishing.
- `MovePostToSlot` / `ReorderQueue` — Reorganize drafts and scheduled queue positions.

### 🔄 Repurposing & Distribution Flywheel
- `CreateRepurpose` — Automatically ingest content from one source (e.g. YouTube or TikTok) and transcribe/reformat for secondary networks (LinkedIn, X, Threads).
- `ListRepurposes` / `ActivateRepurpose` — Manage active syndication pipelines.

### 💡 Ideas Board & Team Collaboration
- `CreateIdea` / `ListIdeas` / `MoveIdeas` — Track content hooks from ideation to production.
- `ApprovePost` / `RejectPost` — Agency and client review workflows.
- `CreatePostNote` — Leave timestamped internal feedback on drafts.

### 📊 Performance Analytics & Insights
- `GetChannelInsights` — Measure followers, reach, impressions, and engagement rate changes.
- `GetPostMetrics` — Inspect per-post interactions, clicks, and conversion signals.
- `GetAnalyticsReport` — Generate cross-channel performance summaries.

---

## 4. Autonomous Workflow Playbook

When executing social distribution workflows:

1. **Ideation & Hook Generation:**
   - Use the `copywriting` skill to generate platform-specific angles (e.g., PAS for LinkedIn, Pattern Interrupt for TikTok/X).
2. **Refining & Humanizing:**
   - Run text through the `humanizer` skill to strip AI tells, corporate jargon, and filler phrases.
3. **Queue Assignment:**
   - Call `ListFreeSlots` to locate optimal posting windows.
   - Call `CreatePost` with the tailored copy, attached media, and tags.
4. **Approval Gate:**
   - High-impact announcements or sensitive client campaigns are tagged for review (`ApprovePost` workflow) before live broadcast.

---

## 5. Companion Skills in Nebulyx

- **`copywriting`**: Conversion-focused copywriting frameworks (AIDA, PAS, BAB) for high-impact social hooks and landing pages.
- **`humanizer`**: Anti-AI writing cleanup based on Wikipedia’s AI Cleanup patterns to ensure social copy sounds genuine and engaging.
- **`design-taste-frontend`**: Visual and UI asset curation for marketing site representations.
