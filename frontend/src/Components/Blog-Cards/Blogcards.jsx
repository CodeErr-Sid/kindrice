import React from 'react';
import './Blogcards.css';
import { assets } from '../../assets/assets';

export default function Blogcards() {
  return (
    <section className='blogcards-section'>
      <div className='blogcards-container'>
        <div className="left-con">
          <div className='blogcards-card-left-up'>
            <div className="card-one">
              <div className="card-one-image">

                <img src={assets.rasberry} alt='Breakfast Rice pudding' />
                <h2>Most Popular</h2>
              </div>
              <div className="card-content-container">
                <p>Breakfast Rice Pudding</p>
                <p>Serves 6 • Cook 10 min</p>
              </div>
            </div>
            <div className='blogcards-card-left-down'>
              <div className="card-one">
                <div className="card-one-image">
                  <img src={assets.riceSalad} alt='Curried chicken and rice salad' />
                </div>
                <div className="card-content-container">
                  <p>Curried Chicken and Rice Salad</p>
                  <p>Serves 6 • Cook 10 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-con">
          <div className='blogcards-card-right-up'>
            <div className="card-one2">
              <div className="card-one-image">
                <img src={assets.friedrice} alt='15-minute Low GI Fried Rice' />
             
              </div>
              <div className="card-content-container">
                <p>15-Minute Low GI Fried Rice</p>
                <p>Serves 6 • Cook 10 min • Prep 5 min</p>
              </div>
            </div>
            <div className='blogcards-card-right-down'>
              <div className="card-one2">
                <div className="card-one-image">
                  <img src={assets.chickenCurry} alt='Chicken Curry with Low GI Rice' />
                  <h2>Most Popular</h2>
                </div>
                <div className="card-content-container">
                  <p>Chicken Curry with Low GI Rice</p>
                  <p>Serves 6 • Cook 15 min • Prep 5 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
}
