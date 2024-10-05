import React, { useContext, useEffect, useState } from 'react';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getShippingPrices } from '../../api/shiprocket';
import PaymentButton from "../PaymentButton/PaymentButton";

const CheckoutContainer = () => {
  const location = useLocation();
  const { cart, user, addresses, currency, url } = useContext(AuthContext); // Get addresses from context
  const { items, weight, price } = location.state || {};


  const [shippingPrice, setShippingPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(price);
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneno: '',
    country: 'India',
    city: 'Choose..',
    state: 'Choose...',
    zip: '',
    sameAddress: false,
    saveInfo: false,
  });


  useEffect(() => {
    const shippingPriceSetter = async () => {
      if (formData.zip && formData.zip.length >= 6 && weight && price) {
        let courier = await getShippingPrices(url, formData.zip, weight, price);

        console.log(courier)
        // Calculate the total shipping price, considering freight charge, coverage charges, and any other additional charges
        const totalShippingPrice = courier.freight_charge;

        // Set the total shipping price, or set it to 0 if no charges exist
        setShippingPrice(totalShippingPrice || 0);
      } else {
        setShippingPrice(0);
      }
    };

    // Call the function
    shippingPriceSetter();

  }, [formData.zip, weight, price, url]);

  useEffect(() => {
    setGrandTotal(price + shippingPrice);
  }, [shippingPrice, price]);

  console.log(shippingPrice)

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    const formatedPhoneNumber = address.phonenumber.replace('+91', '').replace(/-/g, '').trim();
    setFormData({
      ...formData,
      firstName: address.firstname,
      lastName: address.lastname,
      email: address.email,
      address: address.addressLine1,
      phoneno: formatedPhoneNumber,
      zip: address.zipcode,
      city: address.city,
      state: address.state,
      country: address.country,
    });
    setIsFormVisible(false); // Hide form if using existing address
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const billingDetails = {
      billing_customer_name: formData.firstName,
      billing_last_name: formData.lastName,
      billing_address: formData.address,
      billing_city: formData.city,
      billing_pincode: formData.zip,
      billing_state: formData.state,
      billing_country: formData.country,
      billing_email: formData.email,
      billing_phone: formData.phoneno,
    };
    console.log(billingDetails);
  };

  const isButtonEnabled = formData.zip && formData.zip.length >= 6 && items && grandTotal > 0 && shippingPrice > 0;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col-reverse md:flex-row-reverse space-y-4 md:space-y-0 md:space-x-4">
        <div className="md:w-1/3 lg:w-1/3 p-4 bg-gray-50 rounded-lg shadow-md">
          <div className="border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Order summary</p>
            <dl className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total Price (incl. of all taxes)</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">
                {currency + price}
              </dd>
            </dl>
            <dl className="flex justify-between pt-4">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Tax percentage</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">
                5%
              </dd>
            </dl>
            <dl className="flex justify-between pt-4">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Shipping + Delivery</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">
                {currency + shippingPrice}
              </dd>
            </dl>
            <dl className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">
                {currency + grandTotal}
              </dd>
            </dl>
            <PaymentButton
              className={`mt-4 w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white ${isButtonEnabled ? 'bg-primary-700 hover:bg-primary-800' : 'bg-gray-400 cursor-not-allowed'}`}
              name="Buy Now"
              amount={grandTotal}
              address={formData}
              notes={items}
              disabled={!isButtonEnabled}
            />
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

        <div className="md:w-2/3 lg:w-3/4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Billing Address</h4>

          {addresses && addresses.length > 0 && (
            <div className="mb-4">
              <h5 className="text-lg font-semibold mb-2">Choose from your saved addresses:</h5>
              <ul className="space-y-2">
                {addresses.map((address, index) => (
                  <li key={index} className="border p-4 rounded-lg shadow-md">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={index}
                        onChange={() => handleAddressSelect(address)}
                        className="form-radio text-primary-700"
                      />
                      <span>
                        <p>{address.firstname} {address.lastname}</p>
                        <p>{address.addressLine1}, {address.city}, {address.state}, {address.country}, {address.zipcode}</p>
                        <p>Phone: {address.phonenumber}</p>
                      </span>
                    </label>
                  </li>
                ))}

                {/* Add New Address as a Radio Option */}
                <li className="border p-4 rounded-lg shadow-md">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="selectedAddress"
                      value="new"
                      onChange={() => setIsFormVisible(true)}
                      className="form-radio text-primary-700"
                    />
                    <span>Add a new address</span>
                  </label>
                </li>
              </ul>
            </div>
          )}


          {(isFormVisible || !addresses.length) && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/2 mb-4">
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First name</label>
                  <input
                    type="text"
                    className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:w-1/2 mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last name</label>
                  <input
                    type="text"
                    className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="mb-4 md:w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4 md:w-1/2">
                  <label htmlFor="phoneno" className="block text-sm font-medium mb-1">Phone no</label>
                  <input
                    type="text"
                    className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                    id="phoneno"
                    placeholder="+91-000-000-0000"
                    value={formData.phoneno}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="mb-4 md:w-1/2">
                  <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                    id="address"
                    placeholder="1234 Main St"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4 md:w-1/2">
                  <label htmlFor="zip" className="block text-sm font-medium mb-1">Zip</label>
                  <input
                    type="text"
                    className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                    id="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/3 mb-4">
                  <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                  <CountrySelect
                    onChange={(e) => {
                      setCountryid(e.id);
                      setFormData(prev => ({ ...prev, country: e.name }));
                    }}
                    defaultValue={{
                      emoji: "🇮🇳",
                      name: formData.country
                    }}
                    value={formData.country}
                    placeHolder="Select Country"
                    className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                  />
                </div>
                <div className="md:w-1/3 mb-4">
                  <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                  <StateSelect
                    countryid={countryid}
                    onChange={(e) => {
                      setstateid(e.id);
                      setFormData(prev => ({ ...prev, state: e.name }));
                    }}
                    placeHolder="Select State"
                    className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                  />
                </div>
                <div className="md:w-1/3 mb-4">
                  <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                  <CitySelect
                    stateid={stateid}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.name }))}
                    placeHolder="Select City"
                    className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white ${isButtonEnabled ? 'bg-primary-700 hover:bg-primary-800' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!isButtonEnabled}
              >
                Proceed to Payment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

};

export default CheckoutContainer;
