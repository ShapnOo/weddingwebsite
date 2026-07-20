'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Shapno123') {
      // Set a cookie that the middleware will read
      document.cookie = "site_pwd=Shapno123; path=/; max-age=86400; samesite=strict";
      // Redirect to home page
      router.push('/');
    } else {
      setError(true);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background styling similar to hero section */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(13, 14, 18, 0.4), rgba(13, 14, 18, 1))',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#0d0e12',
        zIndex: -1
      }} />

      <div className="glass" style={{
        position: 'relative',
        zIndex: 1,
        padding: '4rem 3rem',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
        animation: 'fade-in-up 1s ease forwards'
      }}>
        <div className="monogram" style={{ 
          fontSize: '2.5rem', 
          color: 'var(--accent-gold)', 
          fontFamily: 'var(--font-hero)',
          letterSpacing: '8px',
          marginBottom: '1.5rem',
        }}>
          T & N
        </div>
        
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Private Access</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Please enter the guest password to view our wedding website.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter Password"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${error ? '#ff6b6b' : 'var(--glass-border)'}`,
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.3s ease'
              }}
            />
            {error && (
              <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'left' }}>
                Incorrect password, please try again.
              </p>
            )}
          </div>

          <button type="submit" className="btn" style={{ width: '100%', background: 'var(--accent-gold)', color: 'var(--bg-color)', fontWeight: 'bold' }}>
            Unlock
          </button>
        </form>
      </div>
    </main>
  );
}
