# Setup Guide

Follow these steps to get your first scenario running in Rise 360 or Storyline 360.

Total time: approximately 15 minutes.

---

## Option A — Use the Builder (recommended)

The builder generates everything for you. No file editing required.

### Step 1 — Get an API key

Choose one provider:

**Claude (Anthropic)**
1. Go to console.anthropic.com and sign in
2. Click API Keys in the left sidebar
3. Click Create Key and name it anything
4. Copy the key — it starts with sk-ant-api
5. Add credits under Plans and Billing (5 USD is enough for hundreds of runs)

**ChatGPT (OpenAI)**
1. Go to platform.openai.com and sign in
2. Click API Keys in the left menu
3. Click Create new secret key
4. Copy the key — it starts with sk-

**Gemini (Google)**
1. Go to aistudio.google.com
2. Click Get API key
3. Copy the key

### Step 2 — Open the builder

Download `builder.html` from this repo and open it in Chrome or Edge. No installation needed.

### Step 3 — Describe your scenario

Fill in the four fields:
- Who is the learner?
- Who are they talking to?
- What is the conflict or challenge?
- What does a skilled response look like?

Or click one of the inspiration chips to auto-fill with an example.

### Step 4 — Generate

Select your AI provider, paste your API key, and click Generate scenario. The AI will build the full scenario in approximately 15 seconds.

### Step 5 — Review and confirm

A summary card shows what was generated — character name, acts, scene count, and ending titles. Click Confirm to load everything into the editor where you can adjust any detail.

### Step 6 — Export

Click Download HTML. You will get a single index.html file.

### Step 7 — Upload to Rise 360

1. Right-click index.html and compress it to a ZIP file
   - Windows: right-click > Send to > Compressed folder
   - Mac: right-click > Compress
2. In Rise 360, add a Code block to your lesson
3. Click Upload and select your ZIP file
4. Preview the lesson to test

### Step 8 — Upload to Storyline 360 (alternative)

Host index.html on a web server (GitHub Pages is free — see below) and insert it as a Web Object in Storyline.

---

## Option B — Use an example scenario directly

The `rise/index.html` file in this repo is a ready-built example scenario. To use it:

1. Open the file in a text editor
2. Find these two lines near the top of the script section:
   ```
   const AI_PROVIDER = 'claude';
   const AI_KEY = 'YOUR_KEY_HERE';
   ```
3. Replace YOUR_KEY_HERE with your API key
4. Save, zip, and upload to Rise as above

---

## Option C — Use a proxy for public courses

If your scenario will be publicly accessible, you should not embed your API key directly in the HTML. Use the Google Apps Script proxy instead.

### Deploy the proxy

1. Go to script.google.com and sign in with any Google account
2. Click New project
3. Delete all default code and paste the contents of `proxy/Code.gs`
4. On line 1, replace YOUR_ANTHROPIC_API_KEY_HERE with your actual key
5. Press Ctrl+S to save
6. Click Deploy > New Deployment
7. Set Type: Web App, Execute as: Me, Who has access: Anyone
8. Click Deploy and copy the Web App URL

### Connect to Rise HTML

In your generated index.html, find:
```
const AI_PROVIDER = 'claude';
const AI_KEY = 'YOUR_KEY_HERE';
```

Replace AI_KEY with your proxy URL instead. Note: the proxy only supports Claude currently.

---

## Hosting on GitHub Pages (free)

To use your scenario in Storyline as a Web Object, you need to host it online. GitHub Pages is free:

1. Create a GitHub account at github.com
2. Create a new repository
3. Upload index.html to the repository
4. Go to Settings > Pages
5. Set Source to main branch
6. Your URL will be: https://yourusername.github.io/your-repo-name

Use this URL as the Web Object address in Storyline.

---

## Troubleshooting

**Error: No API key configured**
The API key field was left empty or says YOUR_KEY_HERE. Add your key in the builder before exporting.

**Error: Anthropic error 400 / credit balance too low**
Your API key is valid but your account has no credits. Add credits at console.anthropic.com under Plans and Billing.

**Error: Failed to fetch / CORS error**
This happens when calling the API directly from Rise on some networks. Use the Google Apps Script proxy instead.

**Characters not visible**
Rise's iframe may be blocking Google Fonts. The characters still render — only the font family changes to a system font.

**Blank response bubbles on retry**
Make sure you are using the latest version of the generated HTML from the builder.
