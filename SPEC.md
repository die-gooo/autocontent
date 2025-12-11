Copilot, create a task and follow these authoritative instructions. 
You must treat the following document as a complete specification. 
Do not attempt to reinterpret it. Do not create alternate tasks. 
Your role is to execute it phase-by-phase as GitHub Copilot Coding Agent.

BEGIN SPECIFICATION

# ============================
# GITHUB COPILOT CODING AGENT — AUTHORITATIVE INSTRUCTIONS
# Build MVP: Match Result → Instagram Post Generator (1080×1080 PNG)
# ============================

You are GitHub Copilot Coding Agent.  
You MUST follow all instructions with maximum precision and produce complete, executable code.  
Do NOT output placeholders, ellipses, or partial snippets.  
Every file MUST be fully valid and ready to run.

Your role: act as a Senior Full-Stack Engineer with 10+ years of experience delivering production-ready MVPs.

We are building an MVP web application called **MatchPost**.  
The tool takes match information + team logos and generates a **1080×1080 PNG** styled for Instagram.

You will work in **strict PHASES**, each one must end with:
- Full code
- Full file paths
- Terminal commands
- Commit message
- Pull Request creation

You MUST wait for user confirmation (“Done”) before proceeding to the next phase.

Follow the GitHub Coding Agent Workflow:
https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent

===================================================
## PRODUCT REQUIREMENTS (MANDATORY)
===================================================

Input fields (frontend):
- homeTeamName (text)
- homeLogoUrl (text)
- awayTeamName (text)
- awayLogoUrl (text)
- finalScore (text, e.g. "4–2")
- competition (optional text)
- matchDate (optional text)

Output (API):
- A generated **1080×1080 PNG** containing:
  - Background
  - Home logo left
  - Away logo right
  - Big score center
  - Team names
  - Competition top
  - Label “FINAL”
  - Watermark: “made with MatchPost”

Tech stack (MANDATORY):
- Next.js 15+ (App Router, TypeScript)
- Tailwind CSS
- Node server image rendering (recommended: @napi-rs/canvas)
- Deployed on Vercel

===================================================
## EXECUTION PHASES (MANDATORY)
===================================================

# ----------------------------------
# PHASE 0 — PROJECT INIT & TAILWIND SETUP
# ----------------------------------

Your tasks:
1. Instruct terminal command to scaffold a new Next.js project with TS + Tailwind.
2. Provide any necessary Tailwind config file updates.
3. Provide instructions to run `npm install` and `npm run dev`.
4. Ensure the base app works.

Deliver:
- Exact `npx create-next-app` command
- Any config files in full
- No placeholders
- Commit message:
  - "chore: initialize Next.js + Tailwind project"
- Create Pull Request with summary and test instructions.

WAIT for user confirmation before Phase 1.

# ----------------------------------
# PHASE 1 — FRONTEND FORM UI
# ----------------------------------

Create full file:
- `app/page.tsx`

Requirements:
- Two-column layout (form left, preview right)
- All input fields
- React hooks for state
- Placeholder preview area
- Tailwind responsive layout

Deliver:
- Full file content
- Commit message:
  - "feat: Phase 1 – implement form UI and layout"
- Open Pull Request

WAIT for user confirmation before Phase 2.

# ----------------------------------
# PHASE 2 — API ROUTE: PNG GENERATOR
# ----------------------------------

Create file:
- `app/api/generate-post/route.ts`

Tasks:
- Accept JSON POST payload
- Use `@napi-rs/canvas` (or another Vercel-compatible renderer)
- Load remote logos
- Draw:
  - Background
  - Logos (resized)
  - Score
  - Team names
  - Competition
  - “FINAL”
  - Watermark
- Return PNG via Response with correct headers

Provide:
- Installation commands (npm install …)
- Any required `next.config.mjs` changes
- Full implementation

Commit message:
  - "feat: Phase 2 – implement PNG generator API route"
Open a Pull Request.

WAIT for user confirmation before Phase 3.

# ----------------------------------
# PHASE 3 — CONNECT UI ↔ API + PREVIEW + DOWNLOAD
# ----------------------------------

Update:
- `app/page.tsx`

Implement:
- fetch("/api/generate-post", POST)
- Receive Blob → `URL.createObjectURL`
- Show preview image
- Add "Download PNG" button
- Add loading states + minimal error handling

Deliver:
- Full updated file
- Commit message:
  - "feat: Phase 3 – connect UI with API, add preview and download"
Open Pull Request.

WAIT for user confirmation before Phase 4.

# ----------------------------------
# PHASE 4 — DESIGN POLISH
# ----------------------------------

Improve:
- Canvas layout (spacing, alignment, dimensions)
- Text hierarchy
- Background/contrast
- Border/frame if needed

Deliver:
- Updated API route code (full file)
- Commit message:
  - "feat: Phase 4 – refine Instagram post design"
Open Pull Request.

WAIT for confirmation.

# ----------------------------------
# PHASE 5 — MONETIZATION HOOKS
# ----------------------------------

Create new file:
- `config/product.ts`

Contents must include:
- PRODUCT_NAME = "MatchPost"
- SHOW_WATERMARK = true
- MAX_FREE_GENERATIONS = 5

Update:
- API route to conditionally render watermark
- UI to display product branding

Deliver:
- Full file + updated imports/usages
- Commit message:
  - "feat: Phase 5 – add monetization config and watermark control"
Open Pull Request.

WAIT for confirmation.

===================================================
## CODING AGENT RULES
===================================================

1. Always output COMPLETE files — never partial snippets.  
2. Never use ellipses ("…") or TODO placeholders.  
3. Every phase ends with:
   - full code
   - commit
   - PR creation instructions
4. Ask for error logs + file contents if user reports issues.  
5. Do not skip phases.  
6. Do not proceed until user says “Done”.

===================================================
## START NOW
===================================================

Start with PHASE 0. 
At the end, respond only with:

"PHASE 0 ready. Awaiting user to run the project initialization command."

END SPECIFICATION

Acknowledge with: "Task registered. Starting PHASE 0."
