import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import HomeGallery from '@/components/HomeGallery';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';

export default async function Home() {
  // Read images dynamically from the optimized absolute folder path
  const imgDir = path.join(process.cwd(), 'public', 'Img_Web');
  let images: string[] = [];
  
  try {
    const files = fs.readdirSync(imgDir);
    // Filter out only jpg/png
    images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
  } catch (error) {
    console.error('Failed to read image directory', error);
    // Fallback images if directory read fails
    images = ['FrameAlap_Nabila_001.jpg', 'FrameAlap_Nabila_002.jpg', 'FrameAlap_Nabila_003.jpg'];
  }

  // Pick a hero image and a subset for the gallery
  const heroImage = images.length > 0 ? images[0] : '';
  
  // Get 12 random images for the gallery to keep it clean and fast
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  const galleryImages = shuffled.slice(0, 12);

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

      {/* Gallery Section */}
      <section id="gallery" className="section container" style={{ paddingTop: '2rem' }}>
        <h2 className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '3rem' }}>Captured Moments</h2>
        
        <HomeGallery images={galleryImages} />
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }} className="reveal-on-scroll">
          <Link href="/gallery" className="btn" style={{ fontSize: '1rem', padding: '1.2rem 3rem' }}>
            View All Pictures
          </Link>
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
