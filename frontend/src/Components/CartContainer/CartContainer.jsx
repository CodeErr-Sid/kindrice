import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { removeFromCart } from '../../api/cartapi';
import { toast } from 'react-toastify';

const CartContainer = () => {
  const navigate = useNavigate();
  const { cart, currency, isLoggedIn, idToken, getCartItems } = useContext(AuthContext);

  // Initialize quantities state based on cart items
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    // Update quantities when cart changes
    if (cart) {
      setQuantities(cart.map(item => item.quantity || 1));
    }
  }, [cart]);

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  // Function to get the price by weight
  const getPriceByWeight = (product, selectedWeight) => {
    const selectedWeightPrice = product.weightPrice.find(
      (wp) => wp.weight.value === parseFloat(selectedWeight)
    );

    if (!selectedWeightPrice) {
      console.error("Weight not found for selected weight:", selectedWeight);
      return 0; // Return 0 if no matching weight found
    }
    return selectedWeightPrice.totalPrice; // Return the totalPrice for the selected weight
  };

  const handleRemoveFromCart = async (product, weight) => {
    if (isLoggedIn) {
      const message = await removeFromCart(product, idToken, weight);
      await getCartItems();
      toast.success(message);
    } else {
      navigate("/login")
    }
  }

  // Calculate total price for each item based on quantity and weight
  const calculateTotalPrice = (product, selectedWeight, quantity) => {
    const price = getPriceByWeight(product, selectedWeight);
    return price * quantity;
  };

  // Calculate and update the total cart price whenever quantities or cart items change
  useEffect(() => {
    const total = cart?.reduce((total, item, index) => {
      return total + calculateTotalPrice(item.productId, item.weight, quantities[index] || 0);
    }, 0);

    setTotalCartPrice(total); // Update the total cart price
  }, [cart, quantities]);

  // Handle increment function
  const handleIncrement = (index) => {
    setQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = (updatedQuantities[index] || 0) + 1; // Increment quantity
      return updatedQuantities;
    });
  };

  // Handle decrement function
  const handleDecrement = (index) => {
    setQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      if ((updatedQuantities[index] || 1) > 1) { // Prevent decrementing below 1
        updatedQuantities[index] = (updatedQuantities[index] || 1) - 1;
      }
      return updatedQuantities;
    });
  };

  // Handle quantity change
  const handleQuantityChange = (index, event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) { // Ensure value is a non-negative number
      setQuantities(prevQuantities => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = value;
        return updatedQuantities;
      });
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart ? cart.length !== 0 && cart.map((item, index) => (
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
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleDecrement(index)}
                          className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none dark:text-white"
                          value={quantities[index] || 0} // Ensure the value is not undefined
                          onChange={(event) => handleQuantityChange(index, event)}
                        />
                        <button
                          type="button"
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
                          {currency + calculateTotalPrice(item.productId, item.weight, quantities[index] || 0)} {/* Ensure quantity is not undefined */}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex-1 flex flex-col gap-2 md:max-w-md">
                      <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                        {item.productId.description} | {item.weight}Kg
                      </a>
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        onClick={() => handleRemoveFromCart(item.productId._id, item.weight)}
                      >
                        <svg
                          className="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )) : <h1 className='text-2xl'>Cart is Empty</h1>}
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:w-full">
            <div className="border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
              <dl className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">
                  {currency + totalCartPrice}
                </dd>
              </dl>
              <button
                className="mt-4 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700"
                onClick={() => navigate('/magic-checkout')}
              >
                Proceed to Checkout
              </button>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">or</span>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default CartContainer;
