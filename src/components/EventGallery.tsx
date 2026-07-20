'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

interface EventGalleryProps {
  images: string[];
  event: string;
}

export default function EventGallery({ images, event }: EventGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const basePath = `/Img_Web/${event}`;

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div 
            key={img} 
            className="gallery-item scale-on-scroll" 
            style={{ animationDelay: `${(idx % 3) * 0.1}s`, cursor: 'pointer' }}
            onClick={() => openLightbox(idx)}
          >
            <Image 
              src={`${basePath}/${img}`} 
              alt={`Wedding moment ${idx + 1}`} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
        ))}
      </div>

      <Lightbox 
        images={images} 
        event={event}
        initialIndex={photoIndex} 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
      />
    </>
  );
}
