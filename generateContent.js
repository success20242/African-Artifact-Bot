// generateContent.js
import { generateImage } from './generateImage.js';
import { generateVideo } from './generateVideo.js';
import fs from 'fs';
import path from 'path';

const prompt = "Elongated white Fang mask with serene expression, cultural art significance, spiritual depth";
const title = "Fang Mask of Harmony – Gabon";
const description = "Ngil society • Serene Power • Ancestral Law";

async function runBot() {
  try {
    const imagePath = await generateImage(prompt);

    const videoOutput = path.resolve('./output', 'video.mp4');
    await generateVideo(imagePath, videoOutput, title, description);

    console.log('\n🎉 Bot run completed successfully!');
  } catch (err) {
    console.error('❌ Bot run failed:', err.message);
  }
}

runBot(); // <== THIS LINE IS MANDATORY
