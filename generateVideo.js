// generateVideo.js
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const DEFAULT_FONT_PATH = process.env.FONT_PATH || './fonts/OpenSans-Regular.ttf';  // fallback path

export function generateVideo(inputImagePath, outputVideoPath, title, description) {
  return new Promise((resolve, reject) => {
    console.log('[generateVideo] Starting video creation...');

    if (!fs.existsSync(inputImagePath)) {
      return reject(new Error(`[generateVideo] Input image not found: ${inputImagePath}`));
    }

    const escapedTitle = title.replace(/:/g, '\\:').replace(/'/g, "\\'"); // escape colon, single quote
    const escapedDescription = description.replace(/:/g, '\\:').replace(/'/g, "\\'");

    const filter = `[0:v]scale=720:1280[scaled];\
color=black@1:s=720x1280:d=10[bg];\
[bg][scaled]overlay=(W-w)/2:(H-h)/2:enable='between(t,0,10)'[v1];\
[v1]drawtext=fontfile='${DEFAULT_FONT_PATH}':text='${escapedTitle}':x=(w-text_w)/2:y=100:fontsize=48:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=10[v2];\
[v2]drawtext=fontfile='${DEFAULT_FONT_PATH}':text='${escapedDescription}':x=(w-text_w)/2:y=180:fontsize=32:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=8`;

    const command = `ffmpeg -y -loop 1 -t 10 -i "${inputImagePath}" -filter_complex "${filter}" -c:v libx264 -pix_fmt yuv420p "${outputVideoPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('[generateVideo] ❌ ffmpeg error:', stderr);
        reject(error);
      } else {
        console.log('[generateVideo] ✅ Video created at', outputVideoPath);
        resolve(outputVideoPath);
      }
    });
  });
}
