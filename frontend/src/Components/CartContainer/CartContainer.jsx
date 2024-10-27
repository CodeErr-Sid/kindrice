import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { removeFromCart, updateCart } from '../../api/cartapi';
import { toast } from 'react-toastify';
import { guestRemoveFromCart, guestUpdateCartItems } from '../../api/localcartapi';

const CartContainer = () => {
  const navigate = useNavigate();
  const { cart, currency, isLoggedIn, idToken, user, refreshToken, getCartItems } = useContext(AuthContext);
  const [quantities, setQuantities] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);


  const maxQuantityMap = {
    1: 3,
    5: 2,
    10: 2,
  };

  const optionsMap = {
    2: [
      { 1: 1, 5: 2 },
      { 1: 2, 5: 2 },
      { 1: 3, 5: 2 },
      { 1: 1, 5: 1 },
      { 1: 2, 5: 1 },
      { 1: 3, 5: 1 },
      { 1: 1, 10: 1 },
      { 1: 2, 10: 1 },
      { 1: 3, 10: 1 },
      { 5: 1, 10: 1 }
    ],
    3: [
      { 1: 1, 5: 1, 10: 1 },
      { 1: 2, 5: 1, 10: 1 },
      { 1: 3, 5: 1, 10: 1 }
    ]
  };



  const updateCartQuantities = async () => {
    if (!cart || cart.length === 0) return; // No items in cart

    let newQuantities = cart.map((item) => item.quantity); // Create a new array for updated quantities

    try {
      if (cart.length === 1) {
        const cartItem = cart[0];
        const maxQuantity = maxQuantityMap[cartItem.weight];

        if (cartItem.quantity > maxQuantity) {
          newQuantities[0] = Math.min(cartItem.quantity, maxQuantity); // Update quantity
        }
      } else if (cart.length > 1) {
        const quantityWeights = cart.map(item => ({
          weight: item.weight,
          quantity: item.quantity
        }));

        const availableOptions = optionsMap[cart.length] || [];
        let matchingOption = null;

        // Find exact matching option
        for (const option of availableOptions) {
          const isValid = quantityWeights.every(item => {
            const limit = option[item.weight];
            return limit !== undefined && item.quantity <= limit;
          });

          if (isValid) {
            matchingOption = option;
            break;
          }
        }

        if (!matchingOption) {
          // No exact match, find closest option
          const closestMatchOptions = availableOptions.filter(option =>
            quantityWeights.every(item => option.hasOwnProperty(item.weight))
          );

          if (closestMatchOptions.length > 0) {
            const closestOption = closestMatchOptions.reduce((best, current) => {
              const currentMatch = Object.entries(current).reduce((acc, [weight, limit]) => {
                const cartItem = quantityWeights.find(item => item.weight == weight);
                return cartItem ? acc + Math.min(cartItem.quantity, limit) : acc;
              }, 0);

              const bestMatch = Object.entries(best).reduce((acc, [weight, limit]) => {
                const cartItem = quantityWeights.find(item => item.weight == weight);
                return cartItem ? acc + Math.min(cartItem.quantity, limit) : acc;
              }, 0);

              return currentMatch > bestMatch ? current : best;
            });

            newQuantities = quantityWeights.map(item => {
              const limit = closestOption[item.weight];
              return limit ? Math.min(item.quantity, limit) : item.quantity;
            });
          } else {
            // Fallback to the highest valid combination
            const highestCombination = availableOptions.reduce((highest, current) =>
              Object.values(current).reduce((sum, val) => sum + val, 0) >
                Object.values(highest).reduce((sum, val) => sum + val, 0) ? current : highest
            );

            newQuantities = quantityWeights.map(item => {
              const limit = highestCombination[item.weight];
              return limit ? Math.min(item.quantity, limit) : item.quantity;
            });
          }
        }
      }

      // Check if quantities have changed
      const hasChanged = newQuantities.some((qty, index) => qty !== cart[index].quantity);

      if (hasChanged) {
        const itemsToUpdate = cart.map((item, index) => ({
          productId: item.productId._id,
          quantity: newQuantities[index],
          weight: item.weight
        }));

        if (isLoggedIn) {
          await refreshToken(user);
          await updateCart(itemsToUpdate, idToken);
        } else {
          guestUpdateCartItems(itemsToUpdate);
        }
        await getCartItems(); // Re-fetch the cart
        setQuantities(newQuantities); // Update local state once
        // toast.success("Cart updated successfully!");
      } else {
        // toast.success("Cart quantities are within limits. No update needed!");
        setQuantities(newQuantities);
      }
    } catch (error) {
      console.error("Error updating cart quantities:", error);
      // toast.error("Failed to update cart. Please try again.");
    }
  };




  useEffect(() => {
    updateCartQuantities();
  }, [cart]);


  const handleQuantityChange = (index, stringvalue) => {

    const value = Number(stringvalue)
    const selectedWeight = parseInt(cart[index].weight, 10);
    const maxQuantity = maxQuantityMap[selectedWeight];

    if (cart.length === 1) {
      // For a single item in the cart
      const newQuantity = Math.min(Number(value), maxQuantity); // Limit to max quantity
      const newQuantities = [...quantities];
      newQuantities[index] = Number(newQuantity); // Update the quantity
      setQuantities(newQuantities);
    } else {

      const newQuantities = [...quantities];
      const availableOptions = optionsMap[cart.length] || [];

      const validOption = availableOptions.find(option => {
        return Object.entries(option).every(([w, q]) => {
          return parseInt(w) === selectedWeight ? value <= q : true;
        });
      });


      if (validOption) {
        newQuantities[index] = value; // Update if valid
        if (newQuantities)
          setQuantities(newQuantities);
      } else {
        // toast.error("Invalid quantity selected for this combination.");
      }
    }
  };


  const getPriceByWeight = (product, selectedWeight) => {
    const selectedWeightPrice = product.weightPrice.find(
      (wp) => wp.weight.value === parseInt(selectedWeight)
    );

    if (!selectedWeightPrice) {
      console.error("Weight not found for selected weight:", selectedWeight);
      return 0; // Return 0 if no weight found
    }
    return selectedWeightPrice.totalPrice;
  };

  const handleRemoveFromCart = async (productId, weight) => {
    if (isLoggedIn) {
      const message = await removeFromCart(productId, idToken, weight);
      await updateCartQuantities();
      await getCartItems();
      // toast.success(message);
    } else {
      // navigate('/login', {
      //   state: {
      //     redirectToCheckout: false
      //   }
      // })

      // remove local cart Item
      await updateCartQuantities();
      await guestRemoveFromCart({ productId, weight });
      await getCartItems();
    }
  };

  const calculateTotalPrice = (product, selectedWeight, quantity) => {
    const price = getPriceByWeight(product, selectedWeight) || 0; // Ensure valid price
    return price * quantity; // Calculate total price
  };

  useEffect(() => {
    const total = cart && cart.length > 0 ? cart.reduce((acc, item, index) => {
      const price = calculateTotalPrice(item.productId, item.weight, quantities[index] || 1); // default to 1 if no quantity is provided
      return acc + price; // Sum up the total price
    }, 0) : 0;

    setTotalCartPrice(total); // Set the total cart price
  }, [cart, quantities]);


  const handleCheckout = async () => {
    const weightQuantityData = [];
    const items = cart.map((item, index) => {
      const selectedWeight = parseInt(item.weight, 10);
      const weightCategory = item.productId.weightPrice.find((wp) => wp.weight.value === selectedWeight);
      const weightInKg = weightCategory.weight.value;

      weightQuantityData.push({ weight: weightInKg, quantity: quantities[index] });

      return {
        name: `${item.productId.productName} - ${selectedWeight}kg`,
        sku: weightCategory?.sku,
        units: quantities[index],
        selling_price: weightCategory?.totalPrice,
        discount: "",
        tax: item.productId.taxPercentage.toString(),
        hsn: Number(item.productId.hsnCode),
      };
    });

    if (isLoggedIn) {
      navigate('/checkout', {
        state: {
          items,
          price: totalCartPrice,
          weightQuantity: weightQuantityData,
          singleProduct: false,
        },
      });
    } else {
      // navigate('/login', {
      //   state: {
      //     items,
      //     price: totalCartPrice,
      //     weightQuantity: weightQuantityData,
      //     singleProduct: false,
      //   },
      // });

      navigate('/checkout', {
        state: {
          items,
          price: totalCartPrice,
          weightQuantity: weightQuantityData,
          singleProduct: false,
        },
      });
    }
  }



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
                <div key={`${item.productId._id}-${item.weight}`} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
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
                        <select
                          value={quantities[index] || 0}
                          onChange={(event) => handleQuantityChange(index, event.target.value)}
                          className="block w-20 px-2 py-1 text-sm font-medium border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          {cart && cart.length === 1 ? (
                            // For single item cart, map based on maxQuantityMap[item.weight]
                            [...Array(maxQuantityMap[cart[0].weight]).keys()].map((qty) => (
                              <option key={qty + 1} value={qty + 1}>
                                {qty + 1}
                              </option>
                            ))
                          ) : (
                            // For multiple items, map based on quantities[index]
                            Array.from({ length: quantities[index] }, (_, idx) => (
                              <option key={idx + 1} value={idx + 1}>
                                {idx + 1}
                              </option>
                            ))
                          )}
                        </select>


                      </div>
                      <div className="text-end md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          {currency + calculateTotalPrice(item.productId, item.weight, quantities[index])}
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
                <p className="text-sm font-medium text-gray-900 dark:text-gray-400">Total Price:</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{currency + totalCartPrice}</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-400">Quantity</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {quantities.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue; // Return the updated accumulator
                  }, 0)}
                </p>

              </div>
              <button
                className="mt-4 w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700"
                onClick={handleCheckout}
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
