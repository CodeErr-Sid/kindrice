import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const QuantitySelector = ({ initialQuantity = 1, minQuantity = 1, maxQuantity = 10, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      setQuantity(prevQuantity => prevQuantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="quantity-button flex items-center justify-between border-2 border-[#016533] rounded-lg px-4 py-2">
      <button onClick={handleDecrease} className="cursor-pointer">
        <FontAwesomeIcon icon={faMinus} style={{ color: "#016533" }} />
      </button>
      <span className="text-[#016533] font-bold">{quantity} Bag</span>
      <button onClick={handleIncrease} className="cursor-pointer">
        <FontAwesomeIcon icon={faPlus} style={{ color: "#016533" }} />
      </button>
    </div>
  );
};

export default QuantitySelector;
