import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = '/Volumes/Office Files/Marriage Pic/All Edited/Img';
const outputDir = path.join(process.cwd(), 'public', 'Img_Web');

// Process a specific event directory
async function processEventDirectory(eventName) {
  const eventInputDir = path.join(inputDir, eventName);
  const eventOutputDir = path.join(outputDir, eventName);

  if (!fs.existsSync(eventInputDir)) {
    console.log(`Input directory for ${eventName} not found. Skipping.`);
    return;
  }

  if (!fs.existsSync(eventOutputDir)) {
    fs.mkdirSync(eventOutputDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(eventInputDir);
    const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

    console.log(`\nFound ${images.length} images for ${eventName}. Starting resize process...`);

    let count = 0;
    for (const image of images) {
      const inputPath = path.join(eventInputDir, image);
      const outputPath = path.join(eventOutputDir, image.replace('.png', '.jpg')); 

      // Skip if already processed
      if (!fs.existsSync(outputPath)) {
        try {
          await sharp(inputPath)
            .resize({
              width: 1920,
              height: 1920,
              fit: 'inside',
              withoutEnlargement: true
            })
            .jpeg({ quality: 80, progressive: true })
            .toFile(outputPath);
            
          count++;
          if (count % 10 === 0) {
            console.log(`[${eventName}] Processed ${count}/${images.length} new images...`);
          }
        } catch (err) {
          console.error(`[${eventName}] Failed to process ${image}:`, err);
        }
      }
    }
    console.log(`Finished ${eventName}! Processed ${count} new images.`);
  } catch (err) {
    console.error(`Error reading directory for ${eventName}:`, err);
  }
}

async function processAllEvents() {
  const events = ['Marriage', 'Holud', 'Reception'];
  for (const event of events) {
    await processEventDirectory(event);
  }
  console.log(`\nAll events processed! Images are saved in: ${outputDir}`);
}

processAllEvents();
