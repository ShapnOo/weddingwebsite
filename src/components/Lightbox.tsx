'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index if initialIndex changes when opening
  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when open
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImg = images[currentIndex];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.95)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={onClose}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute', top: '20px', right: '30px', 
          background: 'none', border: 'none', color: 'white', 
          fontSize: '2rem', cursor: 'pointer', zIndex: 10000
        }}
      >
        &times;
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); prevImage(); }}
        style={{
          position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', 
          fontSize: '2rem', padding: '1rem', cursor: 'pointer', borderRadius: '50%', zIndex: 10000
        }}
      >
        &#8592;
      </button>

      <div style={{ position: 'relative', width: '90vw', height: '90vh' }} onClick={(e) => e.stopPropagation()}>
        <Image 
          src={`/Img_Web/${currentImg}`}
          alt={`Full size image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'contain' }}
          quality={100}
        />
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); nextImage(); }}
        style={{
          position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', 
          fontSize: '2rem', padding: '1rem', cursor: 'pointer', borderRadius: '50%', zIndex: 10000
        }}
      >
        &#8594;
      </button>

      <div style={{
        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        color: 'var(--text-secondary)', fontSize: '0.9rem'
      }}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
