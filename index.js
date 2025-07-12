import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./posted_log.json'); // Adjust if needed

// Read the log file and parse it to get an array of posted video IDs/names
export function getPostedLog() {
  try {
    if (!fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(logPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posted_log.json:', error);
    return [];
  }
}

// Add a new entry to the posted log and save it
export function addToPostedLog(entry) {
  try {
    const posted = getPostedLog();
    if (!posted.includes(entry)) {
      posted.push(entry);
      fs.writeFileSync(logPath, JSON.stringify(posted, null, 2));
    }
  } catch (error) {
    console.error('Error updating posted_log.json:', error);
  }
}
