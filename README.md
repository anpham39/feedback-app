# Feedback App

A responsive feedback application built with Nuxt 3, TypeScript and Tailwind CSS.

The app submits user feedback to a [Google Sheets](https://docs.google.com/spreadsheets/d/1WHndOHu0oWHfRtse-vS2WBfvm7uS9QnbjQXHV_BKwi4/edit?gid=0#gid=0) using a Google Apps Script web app as a lightweight backend.

## Submit feedback endpoint
```
  * POST /api/submitFeedback
  * Server-side proxy that send feedback to a Google Apps Script. 
  *
  * Request body:
  *   - rating: RatingValue ('Poor' | 'Fair' | 'Satisfactory' | 'Good' | 'Excellent')
  *   - text: string (optional feedback text)
  *   - consent: object with publicConsent, contactConsent, privacyConsent booleans
  *   - timestamp: ISO timestamp
  *   - userId: string (ID of the user submitting feedback) 
  * 
  * Response:
  *   - 200 (Success): Returns feedbackId
  *   - 500: Endpoint not configured
  *   - 502: Google Apps Script request failed
 ```

## Script added to Google Apps Script to handle POST API logic:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  if (!sheet) throw new Error('Sheet "Feedback" not found');

  const feedbackId = Utilities.getUuid();

  const payload = JSON.parse(e.postData.contents);
  Logger.log(e);
  Logger.log(payload);

  sheet.appendRow([
    feedbackId,
    payload.timestamp,
    payload.userId,
    payload.rating,
    payload.text || '',
    payload.consent.publicConsent ? 'Yes' : 'No',
    payload.consent.contactConsent ? 'Yes' : 'No',
    payload.consent.privacyConsent ? 'Yes' : 'No',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ feedbackId }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd feedback-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
feedback-app/
├── app.vue                # Root component, display feedback form or feedback received view based on submit stage
├── nuxt.config.ts
├── tailwind.config.js
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── ConsentCheckbox.vue    # Reusable consent checkbox
│   ├── EmojiRating.vue        # 5-level emoji rating selector
│   ├── FeedbackForm.vue       # Main feedback form, shows text feedback field after emoju selected
│   └── FeedbackReceived.vue   # Confirmation screen after submit feedback
├── public/
│   ├── logo.png              
│   ├── checked.png           # Checkbox icon
│   └── [rating]-*.png        # Emoji images (active/inactive)
├── server/
│   └── api/
│       └── submitFeedback.post.ts  # API endpoint for submissions
├── types/
│   └── feedback.ts           # Type definitions for feedback and rating
└── utils/
    └── user.ts               # Mock user data utilities
```
