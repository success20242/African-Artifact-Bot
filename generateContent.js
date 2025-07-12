import generateImage from './generateImage.js';
import generateVideo from './generateVideo.js';
import postToTelegram from './postToTelegram.js';
import postToFacebook from './postToFacebook.js';

async function runBot() {
  console.log('🧠 Generating image...');
  await generateImage();

  console.log('🎬 Generating video...');
  await generateVideo();

  console.log('📤 Posting to Telegram...');
  await postToTelegram();

  console.log('📤 Posting to Facebook...');
  await postToFacebook();

  console.log('✅ All tasks completed.');
}

runBot();
