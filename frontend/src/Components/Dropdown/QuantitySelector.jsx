import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const QuantitySelector = ({ initialQuantity, minQuantity = 1, maxQuantity, onQuantityChange, title }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Update the quantity state whenever initialQuantity changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Call with updated quantity
    } else {
      toast.warn("Maximum Weight Limit Reached");
    }
  };

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Call with updated quantity
    }
  };

  return (
    <div title={title} className="quantity-button flex items-center justify-between border-2 border-[#016533] rounded-lg px-4 py-2">
      <button
        onClick={handleDecrease}
        className={`cursor-pointer ${quantity <= minQuantity ? 'text-gray-400 cursor-not-allowed' : ''}`}
        disabled={quantity <= minQuantity} // Disable button when at minimum quantity
      >
        <FontAwesomeIcon icon={faMinus} style={{ color: quantity <= minQuantity ? "#A0A0A0" : "#016533" }} />
      </button>
      <span className="text-[#016533] font-bold">{quantity} Bag</span>
      <button
        onClick={handleIncrease}
        className={`cursor-pointer ${quantity >= maxQuantity ? 'text-gray-400 cursor-not-allowed' : ''}`}
        disabled={quantity >= maxQuantity} // Disable button when at maximum quantity
      >
        <FontAwesomeIcon icon={faPlus} style={{ color: quantity >= maxQuantity ? "#A0A0A0" : "#016533" }} />
      </button>
    </div>
  );
};

export default QuantitySelector;
