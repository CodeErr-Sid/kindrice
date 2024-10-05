import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const QuantitySelector = ({ initialQuantity, minQuantity = 1, maxQuantity, onQuantityChange, title }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Update the quantity state whenever initialQuantity or maxQuantity changes
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
