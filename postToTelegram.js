// postToTelegram.js
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function postToTelegram(videoPath, caption) {
  try {
    console.log('[postToTelegram] Posting video to Telegram...');

    const form = new FormData();
    form.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    form.append('caption', caption);
    form.append('parse_mode', 'Markdown');
    form.append('video', fs.createReadStream(videoPath));

    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendVideo`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    console.log('[postToTelegram] Success:', data.result.message_id);
  } catch (error) {
    console.error('[postToTelegram] Error:', error);
    throw error;
  }
}
