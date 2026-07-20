import fs from 'fs';
import path from 'path';
import HeroVideo from '@/components/HeroVideo';
import AlbumCard from '@/components/AlbumCard';

export default async function Home() {
  const events = [
    { title: 'Marriage Ceremony', slug: 'Marriage', date: '11th April 2025' },
    { title: 'Holud Night', slug: 'Holud', date: '26th June 2025' },
    { title: 'Reception', slug: 'Reception', date: '28th June 2025' }
  ];

  const albumsData = events.map(event => {
    const dirPath = path.join(process.cwd(), 'public', 'Img_Web', event.slug);
    let count = 0;
    let coverImage = undefined;

    if (fs.existsSync(dirPath)) {
      try {
        const files = fs.readdirSync(dirPath);
        const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'));
        count = images.length;
        if (count > 0) {
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
      <section className="section container" style={{ padding: '8rem 2rem', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '20rem',
          color: 'rgba(197, 163, 101, 0.03)',
          fontFamily: 'var(--font-hero)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0
        }}>
          T & N
        </div>

        <div className="reveal-on-scroll" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h4 style={{ color: 'var(--accent-gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.9rem' }}>The Beginning</h4>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>Our Story</h2>
          
          <div className="glass" style={{ padding: '4rem 3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '4px', height: '100%',
              background: 'linear-gradient(to bottom, transparent, var(--accent-gold), transparent)'
            }} />
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.8, fontFamily: 'var(--font-hero)' }}>
              "Every love story is beautiful, but ours is our favorite."
            </p>
            <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              From the first moment we met, we knew there was something truly special between us. Through every laugh, every adventure, 
              and every quiet moment, our bond has only grown stronger.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
              We are so thrilled to share this magical journey with you. Thank you for being part of our lives 
              and joining us as we take this beautiful step together into forever.
            </p>
          </div>
        </div>
      </section>

      {/* Events / Albums Section */}
      <section id="gallery" className="section container" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
        <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h4 style={{ color: 'var(--accent-gold)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.9rem' }}>The Journey</h4>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Captured Moments</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', marginTop: '1rem' }}>
            Relive the magic, the laughter, and the tears of joy from our special events.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {albumsData.map((album, idx) => (
            <AlbumCard 
              key={album.slug}
              title={album.title}
              eventSlug={album.slug}
              imageCount={album.count}
              coverImage={album.coverImage}
              delay={`${idx * 0.2}s`}
              date={album.date}
            />
          ))}
        </div>
        
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '4rem 0 2rem', textAlign: 'center', background: 'linear-gradient(to top, rgba(20,21,26,0.8), transparent)' }}>
        <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '2rem' }}>Tahmid & Nabila</h3>
        <div style={{ width: '50px', height: '1px', background: 'var(--accent-gold)', margin: '1.5rem auto', opacity: 0.5 }} />
        <p style={{ fontSize: '0.875rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
