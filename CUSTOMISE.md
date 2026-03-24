# Customisation Guide

Everything in a generated scenario is editable. This guide covers what you can change and how.

---

## The easy way — use the builder editor

After generating a scenario, the builder loads all fields into a full editor. You can change:

- Scenario title, learner role, learning objective
- Character name, role, personality, skin tone, hair, clothing colour
- Every scene — dialogue, narrator text, learner prompt, coaching context, score weight
- Act names and scene count (add or remove freely)
- All three ending texts and score thresholds
- Score meter label and end labels
- Coach name and feedback style
- Colour scheme (SME colour, learner colour, coach colour, background)

No file editing required. Make changes, click Download HTML, zip, upload.

---

## Editing the HTML directly

If you prefer to edit the exported file directly, open index.html in any text editor (Notepad on Windows, TextEdit on Mac).

### Change the AI provider or key

Near the top of the script section:
```
const AI_PROVIDER = 'claude';   // 'claude' | 'openai' | 'gemini'
const AI_KEY      = 'sk-ant-...';
```

Change AI_PROVIDER to openai or gemini, and replace the key.

### Change character names

The character name appears in the SCENES array in each message object. Search for the name and replace all instances.

### Change scene dialogue

Find the SCENES array. Each scene has a messages array containing the character's dialogue. Edit the text field.

### Change the coaching criteria

Find SYSTEM_PROMPT near the top of the script. This is the instruction sent to the AI for evaluating learner responses. Edit it to match your scenario and skill.

### Change score thresholds

Find the renderEnding function:
```
const e = score >= HIGH_THRESHOLD ? ENDINGS.high : score >= MID_THRESHOLD ? ENDINGS.mid : ENDINGS.low;
```

HIGH_THRESHOLD and MID_THRESHOLD are set as constants near the top of the script.

### Change colours

Find the CSS variables at the top of the style section:
```
--sme: #2D3A5C;
--you: #1A4A3A;
--coach: #4A2D6B;
--bg: #F7F5F0;
```

Replace with any hex colour values.

---

## Adapting for a completely different scenario

To reuse the engine for a different scenario type, you only need to change:

1. The four guided fields in the builder — the rest generates automatically
2. Or if editing HTML directly: the SCENES array, ENDINGS object, and SYSTEM_PROMPT

The animation engine, scoring logic, character stage, and export all work identically regardless of scenario content.

---

## Adding the scenario to Storyline 360

Instead of Rise's code block, use Insert > Web Object in Storyline:

1. Host your index.html on a web server (GitHub Pages is free — see SETUP.md)
2. In Storyline, go to Insert > Web Object
3. Paste the hosted URL
4. Set it to display in the slide (not in a new window)
5. Size the web object to fill your slide

The scenario runs identically inside Storyline.

---

## Sharing scenarios with other IDs

Export your scenario config as JSON using the Export JSON button in the builder toolbar. Send the JSON file to another ID. They import it with the Import JSON button — all fields populate instantly, no rebuilding from scratch.

---

## Saving and reusing characters

In the Character Library panel of the builder, click Save current SME to save a character to your browser. Saved characters persist between sessions and can be loaded into any new scenario.

Note: characters are saved to your browser's local storage. They will not transfer to another computer unless you export the scenario JSON and share it.
