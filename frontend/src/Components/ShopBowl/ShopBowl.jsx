import React from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import './ShopBowl.css';

const ShopBowl = ({ title }) => {
  return (
    <section>
      <div className="shop-bowl-container">
        {/* Uncomment and use this line if you want to display an image */}
        {/* <img className='shopbowl-img' src={assets.ShopBowl} alt="" /> */}
        <h1 className='shopbowl-heading'>{title}</h1>
      </div>
    </section>
  );
};


ShopBowl.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ShopBowl;
