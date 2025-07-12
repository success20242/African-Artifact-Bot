# African Artifact Bot

Automated bot to generate cultural videos from AI-generated images and captions, then post them to Facebook and Telegram.

## Files

- `index.js`: Main entry point
- `generateContent.js`: Calls the image, video, and posting scripts
- `generateImage.js`: Generates an image using AI
- `generateVideo.js`: Creates a vertical video with overlay
- `postToTelegram.js`: Posts to Telegram
- `postToFacebook.js`: Posts to Facebook
- `.env`: API keys and tokens
- `posted_log.json`: Keeps track of already-posted content

Run with:
```bash
npm install
node index.js
```
