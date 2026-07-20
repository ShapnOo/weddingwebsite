import fs from 'fs';
import path from 'path';
import EventGallery from '@/components/EventGallery';
import Link from 'next/link';

// Use Next.js dynamic routing format (await params for Next.js 15+)
export default async function EventGalleryPage({ params }: { params: Promise<{ event: string }> }) {
  const resolvedParams = await params;
  const eventSlug = resolvedParams.event;
  const eventName = eventSlug === 'Holud' ? 'Holud Night' : eventSlug === 'Reception' ? 'Reception' : 'Marriage Ceremony';
  
  const imgDir = path.join(process.cwd(), 'public', 'Img_Web', eventSlug);
  let images: string[] = [];
  
  try {
    if (fs.existsSync(imgDir)) {
      const files = fs.readdirSync(imgDir);
      images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
      images.sort();
    }
  } catch (error) {
    console.error(`Failed to read directory for ${eventSlug}`, error);
  }

  return (
    <main style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Link href="/#gallery" className="btn" style={{ marginBottom: '2rem', display: 'inline-block' }}>
          &larr; Back to Albums
        </Link>
        <h1 style={{ color: 'var(--accent-gold)' }}>{eventName}</h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {images.length} beautiful moments captured.
        </p>
      </div>

      <div className="container">
        {images.length > 0 ? (
          <EventGallery images={images} event={eventSlug} />
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Coming Soon</h2>
            <p>We are still preparing these memories. Please check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}
