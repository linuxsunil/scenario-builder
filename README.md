# Scenario Builder — AI-Powered Simulations for Rise 360 & Storyline

Build branching conversation scenarios for Rise 360 and Storyline 360 using AI — no coding, no layers, no triggers, no branching slides.

Describe your scenario in plain English. The AI writes the characters, scenes, dialogue, coaching feedback, and endings. You get a single HTML file ready to upload to Rise or embed in Storyline.

---

## What it does

- **Describe → Generate → Export.** Four guided fields. The AI builds the full scenario.
- **Free-text responses** evaluated in real time by Claude, ChatGPT, or Gemini — no multiple choice
- **Animated characters** with emotional reactions that shift based on the learner's score
- **Dynamic score meter** from tense to collaborative (or any label you choose)
- **Three endings** based on cumulative performance
- **Smart analysis tools** — learning objective validator, difficulty preview, tone consistency check
- **Character library** — save and reuse characters across scenarios
- **JSON import/export** — share scenario configs with other IDs in one click
- Works in **Rise 360** (code block) and **Storyline 360** (web object)

---

## Who this is for

Instructional Designers who want to build realistic conversation simulations without spending days on branching logic, variables, and triggers. If you can describe a difficult conversation, you can build a simulation.

---

## Files in this repo

```
builder.html        — open this in any browser to build your scenario
rise/
  index.html        — example generated scenario (demo)
proxy/
  Code.gs           — optional Google Apps Script proxy for managed API keys
README.md           — this file
SETUP.md            — step-by-step deployment guide
CUSTOMISE.md        — how to adapt and customise generated scenarios
```

---

## Quick start

1. Download `builder.html` and open it in Chrome or Edge
2. Fill in the four description fields (or click an inspiration chip)
3. Paste your API key (Claude, OpenAI, or Gemini)
4. Click **Generate scenario**
5. Review the summary card, confirm, and edit if needed
6. Click **Download HTML**
7. Zip the file and upload to Rise 360's code block

See **SETUP.md** for the full guide including how to get an API key.

---

## Supported AI providers

| Provider | Key from | Model used |
|---|---|---|
| Claude (Anthropic) | console.anthropic.com | Sonnet for generation, Haiku for evaluation |
| ChatGPT (OpenAI) | platform.openai.com | GPT-4o for generation, GPT-4o-mini for evaluation |
| Gemini (Google) | aistudio.google.com | Gemini 1.5 Pro for generation, Flash for evaluation |

---

## Cost

Generating a scenario costs approximately $0.05–0.10 USD. Each learner response during the simulation costs approximately $0.002. A full run through a 9-scene scenario costs less than $0.02.

---

## Security note

Your API key is embedded in the generated HTML file. For internal courses this is acceptable. For public-facing courses, use the Google Apps Script proxy in the `proxy/` folder — it keeps your key server-side. See SETUP.md for proxy deployment instructions.

---

## Built with

- [Claude Code](https://claude.ai/code) — Anthropic's agentic coding tool
- Anthropic Claude, OpenAI, and Google Gemini APIs
- Google Apps Script — optional proxy
- Articulate Rise 360 and Storyline 360
- Pure HTML, CSS, JavaScript — no frameworks, no dependencies

---

## Licence

MIT — free to use, adapt, and share. Credit appreciated but not required.
