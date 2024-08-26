import React from 'react';
import './ImpactSecond.css';

export default function ImpactSecond({
  logoSrc,
  heartSrc,
  headingText,
  paragraphHtml1,
  paragraphHtml2,
  paragraphHtml3
}) {
  return (
    <section className='ImpactSecond'>
      <div className='ImpactSecond__container'>
        <div className='ImpactSecond__content_left'>
          <div className='ImpactSecond__content_up'>
            <img src={logoSrc} alt='Logo' />
            <h1>{headingText}</h1>
          </div>
          <div className='ImpactSecond__content_down'>
            <img src={heartSrc} alt='Heart' />
          </div>
        </div>
        <div className='ImpactSecond__content_right'>
          <p dangerouslySetInnerHTML={{ __html: paragraphHtml1 }} />
          <p dangerouslySetInnerHTML={{ __html: paragraphHtml2 }} />
          <p dangerouslySetInnerHTML={{ __html: paragraphHtml3 }} />
        </div>
      </div>
    </section>
  );
}
