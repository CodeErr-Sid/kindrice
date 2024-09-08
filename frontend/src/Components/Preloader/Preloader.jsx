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

    // Animate .sb-loading opacity
    const loadingElement = document.querySelector('.sb-loading');
    animateOpacity(loadingElement, 1, 500);

    setTimeout(() => {
      // Animate number count
      document.querySelectorAll('.sb-preloader-number').forEach((element) => {
        const countTo = parseInt(element.getAttribute('data-count'), 10);
        const countNum = parseInt(element.textContent, 10);
        const duration = 1000;
        const startTime = performance.now();

        const updateCount = (timestamp) => {
          const progress = (timestamp - startTime) / duration;
          if (progress < 1) {
            element.textContent = Math.floor(countNum + (countTo - countNum) * progress);
            requestAnimationFrame(updateCount);
          } else {
            element.textContent = countTo;
          }
        };

        requestAnimationFrame(updateCount);
      });

      // Animate .sb-bar height
      const barElement = document.querySelector('.sb-bar');
      animateHeight(barElement, '100%', 1000, () => {
        // Hide preloader after animation
        setPreloaderHidden(true);
      });
    }, 400);
  }, []);

  return (
    <div className={`sb-preloader ${preloaderHidden ? 'sb-hidden' : ''}`}>
      <div className="sb-preloader-bg"></div>
      <div className="sb-preloader-body">
        <div className="sb-loading">
          <div className="sb-percent">
            <span className="sb-preloader-number" data-count="100">00</span>
            <span className="sb-percentage">%</span>
          </div>
        </div>
        <div className="sb-loading-bar">
          <div className="sb-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
