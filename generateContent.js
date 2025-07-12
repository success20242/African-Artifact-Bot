// generateContent.js
import { generateImage } from './generateImage.js';
import { generateVideo } from './generateVideo.js';
import { postToTelegram } from './postToTelegram.js';
import { postToFacebook } from './postToFacebook.js';
import dotenv from 'dotenv';
dotenv.config();

async function runBot() {
  try {
    // 1. Define the prompt and overlay texts
    const prompt = "A majestic African ceremonial mask, detailed and artistic, vibrant colors, cultural heritage";
    const title = "African Ceremonial Mask – Symbol of Tradition";
    const description = "Intricately designed mask used in rituals and ceremonies";
    const caption = `🖼️ *${title}*\n\n${description}\n\n#AfricanArt #CulturalHeritage #TraditionalMasks`;

    // 2. Generate the AI image
    const imagePath = await generateImage(prompt);

    // 3. Generate video from image + overlay text
    const videoOutputPath = './output/artifact-video.mp4';
    await generateVideo(imagePath, videoOutputPath, title, description);

    // 4. Post video to Telegram
    await postToTelegram(videoOutputPath, caption);

    // 5. Post video to Facebook
    await postToFacebook(videoOutputPath, title, caption);

    console.log("✅ All steps completed successfully!");
  } catch (error) {
    console.error("❌ Bot failed:", error);
  }
}

runBot();
