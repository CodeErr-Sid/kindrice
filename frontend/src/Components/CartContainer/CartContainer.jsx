import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { removeFromCart, updateCart } from '../../api/cartapi';
import { toast } from 'react-toastify';

const CartContainer = () => {
  const navigate = useNavigate();
  const { cart, currency, isLoggedIn, idToken, getCartItems } = useContext(AuthContext);

  const [quantities, setQuantities] = useState([]);
  const [totalCartWeight, setTotalCartWeight] = useState(0); // State to keep track of total weight
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      setQuantities(cart.map(item => item.quantity || 1));
    }
  }, [cart]);


  const getPriceByWeight = (product, selectedWeight) => {
    const selectedWeightPrice = product.weightPrice.find(
      (wp) => wp.weight.value === parseFloat(selectedWeight)
    );

    if (!selectedWeightPrice) {
      console.error("Weight not found for selected weight:", selectedWeight);
      return 0;
    }
    return selectedWeightPrice.totalPrice;
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

  // Calculate total price and weight for each item based on quantity and weight
  const calculateTotalPriceAndWeight = (product, selectedWeight, quantity) => {
    const price = getPriceByWeight(product, selectedWeight);
    const weight = parseFloat(selectedWeight) * quantity; // Calculate weight based on selected weight and quantity
    return { price: price * quantity, weight };
  };

  useEffect(() => {
    const { total, weight } = cart && cart.length > 0 ? cart.reduce((acc, item, index) => {
      const { price, weight } = calculateTotalPriceAndWeight(item.productId, item.weight, quantities[index] || 0);
      return {
        total: acc.total + price,
        weight: acc.weight + weight,
      };
    }, { total: 0, weight: 0 }) : { total: 0, weight: 0 };

    setTotalCartPrice(total);
    setTotalCartWeight(weight); // Update the total cart weight
  }, [cart, quantities]);

  const handleIncrement = (index) => {
    if (totalCartWeight + parseFloat(cart[index].weight) <= 20) { // Check if adding this item exceeds 20kg
      setQuantities(prevQuantities => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = (updatedQuantities[index] || 0) + 1; // Increment quantity
        return updatedQuantities;
      });
    } else {
      toast.warn("Total weight exceeds 20 kg. Please reduce the quantity.");
    }
  };

  const handleDecrement = (index) => {
    setQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      if ((updatedQuantities[index] || 1) > 1) { // Prevent decrementing below 1
        updatedQuantities[index] = (updatedQuantities[index] || 1) - 1;
      }
      return updatedQuantities;
    });
  };

  const handleQuantityChange = (index, event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantities(prevQuantities => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = value;
        return updatedQuantities;
      });
    }
  };

  const handleCheckout = async () => {
    if (totalCartWeight <= 20) {
      const cartItems = cart.map((item, index) => ({
        productId: item.productId._id,
        weight: item.weight,
        quantity: quantities[index],
      }));
      try {

        const success = await updateCart(cartItems, idToken)

        if (success) {
          await getCartItems(idToken);
        }

        const items = cart.map((item, index) => {
          const selectedWeight = parseInt(item.weight, 10);

          const weightCategory = item.productId.weightPrice.find((wp) => wp.weight.value === selectedWeight);

          return {
            "name": `${item.productId.productName} - ${selectedWeight}kg`, // Product name using productName and weight
            "sku": weightCategory?.sku, // SKU from the selected weight category
            "units": quantities[index], // Quantity from quantities array
            "selling_price": weightCategory?.totalPrice, // Selling price using total price from weight category
            "discount": "", // Keep as empty string
            "tax": item.productId.taxPercentage.toString(), // Tax percentage from productId
            "hsn": Number(item.productId.hsnCode) // HSN code from productIdz
          };
        });


        navigate('/checkout', {
          state: {
            items,
            price: totalCartPrice,
            weight: totalCartWeight,
            singleProduct: false
          }
        });
      } catch (error) {
        toast.error(error)
      }


    } else {
      toast.warn("Total weight exceeds 20 kg. Reduce Quantity or Remove a product.");
    }
  };


  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart : MAXIMUM ORDER CAPACITY : 20Kg
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
                          value={quantities[index] || 0}
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
                          {currency + calculateTotalPriceAndWeight(item.productId, item.weight, quantities[index] || 0).price}
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
                            d="M6 18 17 6M6 6l11 12"
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
              <p className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Order summary</p>
              <div className="flex items-center justify-between py-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-400">Total Weight:</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{totalCartWeight.toFixed(2)} kg</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-400">Total Price:</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{currency + totalCartPrice}</p>
              </div>
              <button
                className="mt-4 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700"
                onClick={handleCheckout} // Use handleCheckout function here
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
                  {/* SVG Icon */}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartContainer;
