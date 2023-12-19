import * as fs from 'fs';
import * as path from 'path';

export function writeFileSync(filePath: string, content: string): boolean {
  try {
    const parentDir = path.dirname(filePath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
