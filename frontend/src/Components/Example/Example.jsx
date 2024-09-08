import React from 'react';
import './Example.css';
import { assets } from '../../assets/assets';

export default function Example() {
  return (
    <div className="example-section">
      <div className="example-content-left">
        <img src={assets.cars} alt='' />
      </div>
      <div className="example-section__content-right">
        <h2><span>What is Low-GI?</span></h2>
        <p className='first-child'>
          Once upon a time, a rabbit and a tortoise had a race. The rabbit dashed off quickly, full of energy, like <span className="important-highlight">high GI foods</span> that give you a fast burst. But the rabbit soon got tired and had to stop.
        </p>
        <br/>
        <p className='second-child'>
          The tortoise, moving slowly and steadily like <span className="important-highlight">low GI foods</span>, kept going without stopping. In the end, the tortoise won the race because of his steady pace.
          <br />
          <br />
          Just like the tortoise, low GI foods provide <span className="important-highlight">slow, lasting energy</span>, helping you stay strong and balanced, while high GI foods, like the rabbit, give quick energy that fades fast. <span className="important-highlight">Slow and steady wins the race!</span>
        </p>
      </div>
    </div>
  );
}