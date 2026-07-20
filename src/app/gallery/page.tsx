import fs from 'fs';
import HomeGallery from '@/components/HomeGallery';
import Link from 'next/link';

import path from 'path';

export default async function GalleryPage() {
  const imgDir = path.join(process.cwd(), 'public', 'Img_Web');
  let images: string[] = [];
  
  try {
    const files = fs.readdirSync(imgDir);
    images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    // Sort them so they appear in order
    images.sort();
  } catch (error) {
    console.error('Failed to read image directory', error);
  }

  return (
    <main style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Link href="/" className="btn" style={{ marginBottom: '2rem', display: 'inline-block' }}>
          &larr; Back to Home
        </Link>
        <h1 style={{ color: 'var(--accent-gold)' }}>Full Gallery</h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {images.length} beautiful moments captured.
        </p>
      </div>

      <div className="container">
        {/* We reuse the HomeGallery component since it has the Lightbox integration and grid layout */}
        <HomeGallery images={images} />
      </div>
    </main>
  );
}
