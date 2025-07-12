// postToFacebook.js
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export async function postToFacebook(videoPath, title, description) {
  try {
    console.log('[postToFacebook] Posting video to Facebook...');

    const form = new FormData();
    form.append('source', fs.createReadStream(videoPath));
    form.append('title', title);
    form.append('description', description);
    form.append('access_token', process.env.FB_PAGE_ACCESS_TOKEN);

    const response = await fetch(`https://graph.facebook.com/v19.0/${process.env.FACEBOOK_PAGE_ID}/videos`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    console.log('[postToFacebook] Success, video ID:', data.id);
  } catch (error) {
    console.error('[postToFacebook] Error:', error);
    throw error;
  }
}
