// generateVideo.js
import { exec } from 'child_process';
import path from 'path';

export function generateVideo(inputImagePath, outputVideoPath, title, description) {
  return new Promise((resolve, reject) => {
    console.log('[generateVideo] Starting video creation...');
    
    // Compose the ffmpeg command
    const filter = `
      color=c=black:s=720x1280:d=10[bg];
      [bg][0:v]overlay=(W-w)/2:(H-h)/2:enable='between(t,0,10)'[v1];
      [v1]drawtext=fontfile=/path/to/font.ttf:text='${title}':x=(w-text_w)/2:y=100:fontsize=48:fontcolor=white:alpha='if(lt(t,1),0,if(lt(t,3),(t-1)/2,1))'[v2];
      [v2]drawtext=fontfile=/path/to/font.ttf:text='${description}':x=(w-text_w)/2:y=200:fontsize=32:fontcolor=white:alpha='if(lt(t,3),0,if(lt(t,5),(t-3)/2,1))'
    `;

    const command = `ffmpeg -y -loop 1 -i "${inputImagePath}" -filter_complex "${filter}" -c:v libx264 -t 10 -pix_fmt yuv420p "${outputVideoPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('[generateVideo] ffmpeg error:', error);
        reject(error);
      } else {
        console.log('[generateVideo] Video created at', outputVideoPath);
        resolve(outputVideoPath);
      }
    });
  });
}
