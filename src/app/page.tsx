import fs from 'fs';
import path from 'path';
import HeroVideo from '@/components/HeroVideo';
import AlbumCard from '@/components/AlbumCard';

export default async function Home() {
  const events = [
    { title: 'Marriage Ceremony', slug: 'Marriage' },
    { title: 'Holud Night', slug: 'Holud' },
    { title: 'Reception', slug: 'Reception' }
  ];

  const albumsData = events.map(event => {
    const dirPath = path.join(process.cwd(), 'public', 'Img_Web', event.slug);
    let count = 0;
    let coverImage = undefined;

    if (fs.existsSync(dirPath)) {
      try {
        const files = fs.readdirSync(dirPath);
        const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
        count = images.length;
        if (count > 0) {
          // You can sort or pick a specific image. We just pick the first one.
          images.sort();
          coverImage = images[0];
        }
      } catch (e) {
        console.error(`Failed to read directory for ${event.slug}`);
      }
    }

    return {
      ...event,
      count,
      coverImage
    };
  });

  return (
    <main>
      {/* Hero Section */}
      <HeroVideo />

      {/* Our Story Section */}
      <section className="section container">
        <div className="glass reveal-on-scroll" style={{ padding: '4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem' }}>Our Story</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Every love story is beautiful, but ours is our favorite. From the first moment we met, 
            we knew there was something truly special between us. Through every laugh, every adventure, 
            and every quiet moment, our bond has only grown stronger.
          </p>
          <p style={{ fontSize: '1.1rem' }}>
            We are so thrilled to share this magical journey with you. Thank you for being part of our lives 
            and joining us as we take this beautiful step together.
          </p>
        </div>
      </section>

      {/* Events / Albums Section */}
      <section id="gallery" className="section container" style={{ paddingTop: '2rem' }}>
        <h2 className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '3rem' }}>Captured Moments</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {albumsData.map((album, idx) => (
            <AlbumCard 
              key={album.slug}
              title={album.title}
              eventSlug={album.slug}
              imageCount={album.count}
              coverImage={album.coverImage}
              delay={`${idx * 0.2}s`}
            />
          ))}
        </div>
        
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Tahmid & Nabila</h3>
        <p style={{ fontSize: '0.875rem' }}>© {new Date().getFullYear()} All Rights Reserved.</p>
      </footer>
    </main>
  );
}
