import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ options = [], selected, onSelect, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const displayOptions = Array.isArray(options) && options.length > 0 ? options : [1, 5, 10];
  const currentOption = selected ?? displayOptions[0] ?? 1;

  return (
    <div ref={dropdownRef} className="relative w-full text-left z-30" title={title}>
      <div
        className="quantity-button flex items-center justify-between border-2 border-[#016533] rounded-lg px-4 py-2 cursor-pointer bg-white select-none"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="text-[#016533] font-bold">{currentOption} KG</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: "#016533" }}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          {displayOptions.map((option, index) => (
            <div
              key={index}
              className={`cursor-pointer px-4 py-2 text-[#016533] font-medium hover:bg-green-50 transition-colors ${
                option === currentOption ? 'bg-green-100 font-bold' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option} KG
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
