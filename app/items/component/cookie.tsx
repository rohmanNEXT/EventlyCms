'use client';
import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieUI() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    console.log('Cookies accepted');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    console.log('Cookies declined');
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4
        left-1/2 transform -translate-x-1/2
        sm:left-auto sm:right-6 sm:translate-x-0
        bg-gray-900/40 text-white p-4 rounded shadow-lg backdrop-blur-md
        transition-all duration-300
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center gap-2 pb-3">
        <Cookie />
        <p className="m-0">Kami menggunakan cookie untuk pengalaman terbaik.</p>
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleDecline}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
