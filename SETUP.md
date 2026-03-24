# Setup Guide — Working with Raj

Follow these steps in order. Total time: approximately 15 minutes.

---

## Step 1 — Get your Anthropic API key

1. Go to console.anthropic.com
2. Sign in or create an account
3. Click API Keys in the left sidebar
4. Click Create Key, name it anything (e.g. raj-scenario)
5. Copy the key — it starts with sk-ant-api
6. Add credits under Plans and Billing (5 USD is enough for hundreds of runs)

Keep this key private. Do not paste it anywhere public.

---

## Step 2 — Deploy the Google Apps Script proxy

The proxy sits between Rise and the Anthropic API so your key is never exposed in the browser.

1. Go to script.google.com and sign in with any Google account
2. Click New project
3. Select all the default code and delete it
4. Open the file proxy/Code.gs from this repo and paste the entire contents
5. On line 1, replace YOUR_ANTHROPIC_API_KEY_HERE with your actual key:

```
var ANTHROPIC_API_KEY = 'sk-ant-api03-...your key here...';
```

6. Press Ctrl+S (or Cmd+S) to save
7. Click Deploy in the top right
8. Choose New Deployment
9. Click the gear icon and select Web App
10. Set Execute as: Me
11. Set Who has access: Anyone
12. Click Deploy
13. Copy the Web App URL — it looks like:
    https://script.google.com/macros/s/ABC123.../exec

Save this URL. You need it in the next step.

---

## Step 3 — Update the Rise HTML file

1. Open rise/index.html in any text editor (Notepad on Windows, TextEdit on Mac)
2. Near the top of the script section, find this line:

```
const PROXY_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

3. Replace YOUR_APPS_SCRIPT_URL_HERE with your Web App URL from Step 2:

```
const PROXY_URL = 'https://script.google.com/macros/s/ABC123.../exec';
```

4. Save the file

The SHARED_SECRET is already set to raj-scenario-2026 in both files and they match — no need to change it.

---

## Step 4 — Package and upload to Rise 360

The file must be named index.html and must be at the root of the ZIP (not inside a folder).

On Windows:
1. Right-click index.html
2. Send to > Compressed (zipped) folder
3. Name it working-with-raj.zip

On Mac:
1. Right-click index.html
2. Compress index.html
3. Rename the result to working-with-raj.zip

In Rise 360:
1. Add a Code block to your lesson
2. Click Upload
3. Upload your working-with-raj.zip
4. Preview the lesson

---

## Step 5 — Test it

Type one of these responses in Scene 1 to confirm everything is working:

Bad response (should score 1):
Thanks Raj, I will get started on the slides right away!

Neutral response (should score 2):
Thanks for sending these. Could you highlight which sections are most critical?

Good response (should score 3):
Before I dive in, can we grab 30 minutes to align on what learners should actually be able to do differently after this training?

If you see Raj react and the Learning Coach appear, everything is working.

---

## Troubleshooting

Error: Failed to fetch
The Apps Script URL in index.html does not match your deployed URL. Check line 304 in the HTML.

Error: Anthropic error 400
Your API key is empty, incorrect, or has no credits. Check line 1 of Code.gs and your billing at console.anthropic.com.

Error: Unauthorised
The SHARED_SECRET in index.html and Code.gs do not match. Both should say raj-scenario-2026.

Blank bubbles on second attempt
Make sure you are using the latest version of index.html from this repo.

Characters not visible
Rise's iframe may be blocking Google Fonts. The characters will still render — only the font changes.

---

## Updating the Apps Script after changes

If you edit Code.gs, you must redeploy for changes to take effect:
1. Deploy > Manage Deployments
2. Click the pencil icon
3. Change version to New version
4. Click Deploy

The URL stays the same — no need to update the HTML.

---

## Customising for a different scenario

To swap Raj for a different character or topic:

In index.html, find the SCENES array and edit each scene object:
- sceneContext: what the AI needs to know about the situation
- rajSaid: what the character just said
- prompt: the placeholder text in the learner's input box
- messages: the dialogue bubbles shown to the learner

In Code.gs, edit SYSTEM_PROMPT to describe your new scenario, character, and what a good response looks like.

The scoring engine, characters, and meter all work automatically.
