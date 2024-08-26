import React from 'react';
import './Publication.css';
import { assets } from '../../assets/assets';

export default function Publication({ cards }) {
  return (
    <section className='publication'>
      <div className="publication-container">
        <div className="up-container">
          <div className="left-container">
            <h1>Most Popular Publications</h1>
            <p>Explore a variety of recipes</p>
          </div>
          <div className="right-container">
            <div className="previous-arrow">
                <img src={assets.prevArrow} alt="previous arrow"/>
            </div>
            <div className="after-arrow">
                <img src={assets.nextArrow} alt="next arrow"/>
            </div>
          </div>
        </div>
        <div className="down-container">
          {cards.map((card, index) => (
            <div className="publication-card" key={index}>
              <div className="publication-image">
                <img src={card.image} alt={`publication${index + 1}`} />
              </div>
              <div className="info-content2">
                <p>{card.title}</p>
                <p className='two'>{card.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
