import Link from 'next/link';

interface AlbumCardProps {
  title: string;
  eventSlug: string;
  imageCount: number;
  coverImage?: string;
  delay: string;
  date?: string;
}

export default function AlbumCard({ title, eventSlug, imageCount, coverImage, delay, date }: AlbumCardProps) {
  const isComingSoon = imageCount === 0;

  return (
    <Link 
      href={isComingSoon ? '#' : `/gallery/${eventSlug}`} 
      className="album-card scale-on-scroll" 
      style={{ 
        animationDelay: delay,
        position: 'relative',
        display: 'block',
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: isComingSoon ? 'default' : 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: coverImage ? `url('/Img_Web/${eventSlug}/${coverImage}')` : 'none',
          backgroundColor: coverImage ? 'transparent' : 'var(--glass-bg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.5s ease',
          opacity: isComingSoon ? 0.5 : 1
        }}
        className="album-card-bg"
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(13,14,18,1) 0%, rgba(13,14,18,0.2) 100%)'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        {date && (
          <p style={{ color: 'var(--accent-gold-light)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
            {date}
          </p>
        )}
        <h3 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', fontSize: '1.8rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
          {isComingSoon ? 'Coming Soon' : `${imageCount} Photos`}
        </p>
      </div>

      <style>{`
        .album-card:hover .album-card-bg {
          transform: scale(1.05);
        }
      `}</style>
    </Link>
  );
}
