import React, { useState, useEffect } from 'react';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-9 left-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 text-3xl bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300"
        >
          &#8679; {/* Upward arrow symbol */}
        </button>
      )}
    </div>
  );
}
