import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = '/Volumes/Office Files/Marriage Pic/All Edited/Img';
const outputDir = path.join(process.cwd(), 'public', 'Img_Web');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir);
    const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

    console.log(`Found ${images.length} images. Starting resize process...`);

    let count = 0;
    // Process sequentially or in small batches to not overwhelm memory
    for (const image of images) {
      const inputPath = path.join(inputDir, image);
      const outputPath = path.join(outputDir, image.replace('.png', '.jpg')); // Convert all to jpg for web

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
            console.log(`Processed ${count}/${images.length} images...`);
          }
        } catch (err) {
          console.error(`Failed to process ${image}:`, err);
        }
      }
    }

    console.log(`\nFinished! Successfully processed ${count} images.`);
    console.log(`Images are saved in: ${outputDir}`);
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

processImages();
