import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [preloaderHidden, setPreloaderHidden] = useState(false);

  useEffect(() => {
    // Function to animate opacity
    const animateOpacity = (element, endOpacity, duration) => {
      const startOpacity = parseFloat(window.getComputedStyle(element).opacity);
      const startTime = performance.now();

      const step = (timestamp) => {
        const progress = (timestamp - startTime) / duration;
        if (progress < 1) {
          element.style.opacity = startOpacity + (endOpacity - startOpacity) * progress;
          requestAnimationFrame(step);
        } else {
          element.style.opacity = endOpacity;
        }
      };

      requestAnimationFrame(step);
    };

    // Animate .sb-loading opacity
    const loadingElement = document.querySelector('.sb-loading');
    animateOpacity(loadingElement, 1, 500);

    setTimeout(() => {
      // Animate .sb-bar height
      const barElement = document.querySelector('.sb-bar');
      animateHeight(barElement, '100%', 1000, () => {
        // Hide preloader after animation
        setPreloaderHidden(true);
      });
    }, 400);
  }, []);

  // Function to animate height
  const animateHeight = (element, endHeight, duration, callback) => {
    const startHeight = parseFloat(window.getComputedStyle(element).height);
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = (timestamp - startTime) / duration;
      if (progress < 1) {
        element.style.height = startHeight + (parseFloat(endHeight) - startHeight) * progress + 'px';
        requestAnimationFrame(step);
      } else {
        element.style.height = endHeight;
        if (callback) callback();
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className={`sb-preloader ${preloaderHidden ? 'sb-hidden' : ''}`}>
      <div className="sb-preloader-bg"></div>
      <div className="sb-preloader-body">
        {/* The number loader and its related content have been removed */}
        <div className="sb-loading">
          {/* Background transition only */}
        </div>
        <div className="sb-loading-bar">
          <div className="sb-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
