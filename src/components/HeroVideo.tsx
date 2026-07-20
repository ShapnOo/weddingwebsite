'use client';

import { useState, useRef, useEffect } from 'react';

export default function HeroVideo() {
  const [hasEntered, setHasEntered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Wait exactly 3 seconds, then remove preloader and attempt autoplay
    const timer = setTimeout(() => {
      setHasEntered(true);
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="section" 
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      {/* Background YouTube Video */}
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/aMVks48wN5M?autoplay=1&mute=0&loop=1&playlist=aMVks48wN5M&controls=0&showinfo=0&rel=0&playsinline=1&cc_load_policy=0&vq=hd1080&enablejsapi=1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '56.25vw', /* 16:9 Aspect Ratio */
          minHeight: '100vh',
          minWidth: '177.77vh',
          pointerEvents: 'none',
          zIndex: 0
        }}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      {/* Gradient Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(13, 14, 18, 0.4), rgba(13, 14, 18, 1))',
        zIndex: 1
      }} />

      {/* Premium Cinematic Preloader Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#0d0e12',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: hasEntered ? 0 : 1,
        pointerEvents: hasEntered ? 'none' : 'auto',
        transition: 'opacity 1.5s cubic-bezier(0.65, 0, 0.35, 1)' // Super smooth cinematic fade out
      }}>
        
        <div className="preloader-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Elegant Monogram */}
          <div className="monogram" style={{ 
            fontSize: '3rem', 
            color: 'var(--accent-gold)', 
            fontFamily: 'var(--font-playfair)',
            letterSpacing: '8px',
            marginBottom: '2rem',
            opacity: 0,
            animation: 'fadeInUp 1s ease forwards 0.3s'
          }}>
            T & N
          </div>
          
          <div style={{
            fontSize: '0.85rem',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            opacity: 0,
            animation: 'fadeInUp 1s ease forwards 0.6s'
          }}>
            A Cinematic Experience
          </div>

          {/* Sleek Progress Bar */}
          <div style={{ 
            width: '200px', 
            height: '2px', 
            background: 'rgba(255,255,255,0.1)', 
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '2px',
            opacity: 0,
            animation: 'fadeIn 1s ease forwards 0.9s'
          }}>
            <div className="progress-fill" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              background: 'var(--accent-gold)',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              animation: 'fillProgress 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }} />
          </div>
        </div>
      </div>

      {/* Main Content (Visible after entering) */}
      <div className="container" style={{ position: 'relative', zIndex: 2, opacity: hasEntered ? 1 : 0, transition: 'opacity 2s ease 1s, transform 2s ease 1s', transform: hasEntered ? 'translateY(0)' : 'translateY(40px)' }}>
        <h4 style={{ color: 'var(--accent-gold)', letterSpacing: '4px', marginBottom: '1rem', textTransform: 'uppercase' }}>
          We're Getting Married
        </h4>
        <h1 style={{ marginBottom: '2rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          Tahmid & Nabila
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', maxWidth: '600px', margin: '0 auto', marginBottom: '3rem' }}>
          A celebration of love, family, and a beautiful new beginning.
        </p>
        <a href="#gallery" className="btn">View Highlights</a>
      </div>

      <style>{`
        @keyframes fillProgress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
