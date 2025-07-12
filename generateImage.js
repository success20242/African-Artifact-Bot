// generateImage.js
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt = 'An ancient African mask with detailed patterns, 1024x1024, museum lighting') {
  try {
    console.log('[generateImage] Generating image from prompt:', prompt);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    });

    const imageUrl = response.data[0].url;
    console.log('[generateImage] Image URL:', imageUrl);

    // Download the image from the generated URL
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);

    const buffer = await res.arrayBuffer();
    const imagePath = path.resolve('./output', 'artifact-image.png');

    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    fs.writeFileSync(imagePath, Buffer.from(buffer));

    console.log('[generateImage] Image saved to', imagePath);
    return imagePath;
  } catch (error) {
    console.error('[generateImage] ❌ Error generating image:', error.message);
    throw error;
  }
}
