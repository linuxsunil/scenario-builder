// Scenario Builder — Google Apps Script Proxy
// Use this when your scenario will be publicly accessible.
// It keeps your Anthropic API key server-side so it is never exposed in the browser.
//
// DEPLOY AS A WEB APP:
//   1. Paste this entire file into script.google.com (replace everything)
//   2. Line 9: replace YOUR_ANTHROPIC_API_KEY_HERE with your sk-ant-... key
//   3. Press Ctrl+S to save
//   4. Click Deploy > New Deployment
//   5. Type: Web App | Execute as: Me | Who has access: Anyone
//   6. Click Deploy and copy the Web App URL
//   7. In your generated scenario HTML, set AI_KEY to this URL

var ANTHROPIC_API_KEY = 'YOUR_ANTHROPIC_API_KEY_HERE';
var SHARED_SECRET = 'scenario-builder-2026';

var SYSTEM_PROMPT_BASE =
  'You are an expert coach evaluating how a learner responds to a scenario. ' +
  'Evaluate the response on a score of 1, 2, or 3. ' +
  '1 = Ineffective: passive, aggressive, or misses the point entirely. ' +
  '2 = Partially effective: right instinct but weak execution or missed opportunity. ' +
  '3 = Effective: confident, constructive, and strategically sound. ' +
  'Write sme_reaction (1-2 sentences in the character\'s voice, believable and in character) and ' +
  'coach_feedback (2-4 sentences: score 1 = explain what went wrong and give a reframe; score 2 = acknowledge what worked then explain what edges it out; score 3 = affirm what made it effective and name the skill). ' +
  'Respond ONLY with valid JSON: {"score":1,"sme_reaction":"...","coach_feedback":"..."}';

function doGet(e) {
  try {
    var secret          = e.parameter.secret          || '';
    var sceneContext    = e.parameter.sceneContext     || '';
    var characterSaid   = e.parameter.rajSaid         || 'no direct dialogue';
    var learnerResponse = e.parameter.learnerResponse || '';
    var systemPrompt    = e.parameter.systemPrompt    || SYSTEM_PROMPT_BASE;
    var act             = e.parameter.act             || 'Unknown';

    if (SHARED_SECRET && secret !== SHARED_SECRET) {
      return outputJson({ error: 'Unauthorised' });
    }

    if (!sceneContext || !learnerResponse) {
      return outputJson({ error: 'Missing required fields' });
    }

    var userMessage =
      'ACT: ' + act + '\n' +
      'SCENE CONTEXT: ' + sceneContext + '\n' +
      'CHARACTER SAID: ' + characterSaid + '\n' +
      'LEARNER RESPONSE: ' + learnerResponse + '\n' +
      'Evaluate this and reply with JSON only.';

    var payload = {
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    };

    var fetchOptions = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response     = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', fetchOptions);
    var responseCode = response.getResponseCode();
    var responseText = response.getContentText();

    if (responseCode !== 200) {
      return outputJson({ error: 'Anthropic error ' + responseCode, detail: responseText });
    }

    var data       = JSON.parse(responseText);
    var rawContent = data.content[0].text;
    var cleaned    = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

    var parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (pe) {
      parsed = {
        score: 2,
        sme_reaction: 'Hmm. Not sure what to make of that.',
        coach_feedback: 'There was an issue processing the response. Try rephrasing and submitting again.'
      };
    }

    return outputJson(parsed);

  } catch (err) {
    return outputJson({ error: err.message });
  }
}

function outputJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
