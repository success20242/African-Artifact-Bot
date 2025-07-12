// generateImage.js
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt) {
  try {
    console.log('[generateImage] Generating image from prompt:', prompt);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 1,
      n: 1,
    });

    const imageUrl = response.data[0].url;
    console.log('[generateImage] Image URL:', imageUrl);

    // Download the image to local file
    const res = await fetch(imageUrl);
    const buffer = await res.arrayBuffer();

    const imagePath = path.resolve('./output', 'artifact-image.png');
    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    fs.writeFileSync(imagePath, Buffer.from(buffer));

    console.log('[generateImage] Image saved to', imagePath);

    return imagePath;
  } catch (error) {
    console.error('[generateImage] Error:', error);
    throw error;
  }
}
