# Customisation Guide — Adapting for Your Own Scenario

This engine is designed to be reused. Here is how to swap out Raj and the SME conflict for any scenario you want to build.

---

## Change the character name and personality

In index.html, find every instance of Raj Mehta and replace with your character's name.

In Code.gs, edit the SYSTEM_PROMPT. The first two sentences describe the scenario. Replace them with your context:

Example — a difficult line manager:
```
You are an expert leadership coach evaluating how a new manager responds to a challenging conversation with their line manager.
The learner is playing the role of a team leader navigating a manager who micromanages and undermines their decisions.
```

Example — a resistant learner:
```
You are a facilitation coach evaluating how a trainer handles a resistant participant in a workshop.
The learner is playing the role of a facilitator managing a senior delegate who is visibly disengaged.
```

---

## Change the scenes

Each scene in the SCENES array has these fields:

```javascript
{
  id: 1,
  act: "Act 1 - The Opening",           // shown in the act badge top right
  context: {
    icon: "✉",                           // emoji for the context banner
    label: "Email - Monday 9:14 AM",     // bold text in banner
    detail: "Day 1 of the project."      // secondary text in banner
  },
  messages: [
    { from: "raj", name: "Raj Mehta", text: "..." },   // character dialogue
    { from: "narrator", text: "..." }                   // italic narrator text
  ],
  prompt: "How do you respond?",         // textarea placeholder
  rajSaid: "...",                        // sent to AI for context
  sceneContext: "...",                   // sent to AI — key for good evaluation
  scoreGain: 12                          // points awarded for a score 3 response
}
```

The most important field is sceneContext. Write it as if briefing a human coach — describe the power dynamics, what's at stake, and what a skilled response looks like. The richer this is, the better Claude evaluates.

---

## Change the character appearance

Each character is an inline SVG inside the HTML. Find the svg elements with ids svg-raj, svg-coach, and svg-you.

To change skin tone: find the fill colour on the head ellipse and neck rect (default values like #C8956A) and replace with your chosen hex.

To change hair: edit the ellipse and rect elements above the head.

To change clothing: edit the rect elements below the neck.

The mouth paths are controlled by the MOUTHS object in the script. You can adjust the curve values to change the default expression.

---

## Change the scoring thresholds and endings

The three endings trigger at these score thresholds:
- 80 and above: high ending
- 50 to 79: mid ending
- below 50: low ending

To change these, find the renderEnding function and edit:
```javascript
const e = score>=80 ? ENDINGS.high : score>=50 ? ENDINGS.mid : ENDINGS.low;
```

To edit the ending text, find the ENDINGS object and update title, subtitle, narrative, and tips for each ending.

---

## Change the scoring criteria

In Code.gs, the SYSTEM_PROMPT defines what scores 1, 2, and 3 mean. You can rewrite these for any skill:

Example for negotiation skills:
```
1 = Ineffective: positional, combative, or ignores the other party's interests entirely
2 = Partially effective: acknowledges interests but anchors too early or concedes without condition
3 = Effective: explores interests before positions, uses conditional language, builds mutual gain
```

---

## Add more than 3 characters

The stage supports any number of character slots. Copy an existing char-slot div in the HTML, give it a new id, and add the corresponding entry to the chars object in the script. The showCoach function pattern can be reused for any character you want to appear and disappear dynamically.

---

## Use in Storyline 360

Instead of Rise's code block, use a Web Object in Storyline:
1. Host the index.html on a web server (GitHub Pages works perfectly and is free)
2. In Storyline, insert > Web Object and paste the URL
3. Set it to display in the slide (not in a new window)
4. The scenario runs identically inside Storyline

To host on GitHub Pages:
1. Create a GitHub repo
2. Upload index.html as the only file
3. Go to Settings > Pages > Source: main branch
4. Your URL will be https://yourusername.github.io/your-repo-name
