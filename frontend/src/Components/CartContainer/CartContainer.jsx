import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CartContainer = () => {
  const navigate = useNavigate();
  const { cart, currency } = useContext(AuthContext);
  
  // State for managing quantities
  const [quantities, setQuantities] = useState(cart.map(item => item.quantity));

  // Handle increment function
  const handleIncrement = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  // Handle decrement function
  const handleDecrement = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) { // Prevent decrementing below 1
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  // Calculate total price for each item
  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  // Calculate total cart price
  const calculateCartTotal = () => {
    return quantities.reduce((total, quantity, index) => {
      const itemPrice = cart[index].productId.price;
      return total + (itemPrice * quantity);
    }, 0);
  };

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart && cart.length !== 0 && cart.map((item, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={item.productId.images[0]}
                          alt={item.productId.productName}
                        />
                        <img
                          className="hidden h-20 w-20 dark:block"
                          src={item.productId.images[0]}
                          alt={item.productId.productName}
                        />
                      </a>
                      <label htmlFor={`counter-input-${index}`} className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            id={`decrement-button-${index}`}
                            onClick={() => handleDecrement(index)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id={`counter-input-${index}`}
                            className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none dark:text-white"
                            value={quantities[index]}
                            readOnly
                          />
                          <button
                            type="button"
                            id={`increment-button-${index}`}
                            onClick={() => handleIncrement(index)}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-end md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            {currency + calculateTotalPrice(item.productId.price, quantities[index])}
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex-1 md:max-w-md">
                        <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                          {item.productId.productName} - {item.productId.weight}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:w-full">
              <div className="border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                <dl className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {currency + calculateCartTotal()}
                  </dd>
                </dl>
                <dl className="flex justify-between pt-4  border-gray-200 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {currency + calculateCartTotal()}
                  </dd>
                </dl>
                <button
                  className="mt-4 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartContainer;
