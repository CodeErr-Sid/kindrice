import React, { useContext, useEffect, useState, useMemo } from 'react';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getShippingPrices } from '../../api/shiprocket';
import PaymentButton from "../PaymentButton/PaymentButton";
import { toast } from 'react-toastify';
import axios from 'axios';
import fetchPackageForOrder from '../../api/packageSelector';

const CheckoutContainer = () => {
  const location = useLocation();
  const { addresses, currency, url } = useContext(AuthContext);
  const { items, weightQuantity, price, singleProduct } = location.state || {};

  (() => {
    if (!location.state) {
      window.location.href = '/';
      return;
    }
  })();


  const { packageCategory, totalWeight, dimensions } = fetchPackageForOrder(weightQuantity);
  const { length, breadth, height } = dimensions;

  const [grandTotal, setGrandTotal] = useState(price);
  const [saveAddress, setSaveAddress] = useState(true); // State for saving the address
  const [shippingIsBilling, setShippingIsBilling] = useState(true); // State for shipping is billing
  const [showBillingCheckbox, setShowBillingCheckbox] = useState(false);
  const [showShippingCheckbox, setShowShippingCheckbox] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [billingCities, setBillingCities] = useState([]);  // For billing city dropdown
  const [shippingCities, setShippingCities] = useState([]); // For shipping city dropdown

  const [courier, setCourier] = useState({ shippingPrice: 0, courier_id: null, courier_company_name: "" }); // Single state for both courier details

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneno: '',
    country: 'India',
    city: '',
    state: '',
    zip: '',
    sameAddress: false,
    saveInfo: false,
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      email: '',
      phoneno: '',
    },
  });

  // Handle form changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (setter) => {
    setter((prev) => !prev); // Toggle the checkbox state
  };


  const handleShippingChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      shippingAddress: { ...prevData.shippingAddress, [id]: value },
    }));
  };


  // Handle selecting an address from user's saved addresses
  const handleAddressSelect = (address) => {
    const formattedPhoneNumber = address.phonenumber.replace('+91', '').replace(/-/g, '').trim();
    setFormData({
      firstName: address.firstname,
      lastName: address.lastname,
      email: address.email,
      address: address.addressLine1,
      phoneno: formattedPhoneNumber,
      zip: address.zipcode,
      city: address.city,
      state: address.state,
      country: address.country,
      shippingAddress: {
        firstName: address.firstname,
        lastName: address.lastname,
        address: address.addressLine1,
        city: address.city,
        state: address.state,
        zip: address.zipcode,
        country: address.country,
        email: address.email,
        phoneno: formattedPhoneNumber,
      },
    });
    setIsFormVisible(false);
  };

  // Memoized shipping price and courier ID calculation
  const shippingPriceSetter = useMemo(() => async () => {
    const shippingZip = shippingIsBilling ? formData.zip : formData.shippingAddress.zip; // Determine which zip to use

    if (shippingZip.length >= 6 && totalWeight && price) {
      try {
        const courierData = await getShippingPrices(url, shippingZip, totalWeight, price, length, breadth, height);

        if (!courierData.success) {
          toast.error(courierData.message);
          setCourier({ shippingPrice: 0, courier_id: null });
          setFormData(prevState => ({
            ...prevState,
            zip: "", // Update the zip in the main address
            shippingAddress: {
              ...prevState.shippingAddress,
              zip: "" // Optionally reset the shippingAddress.zip as well
            }
          }));

        }

        console.log(courierData)

        const totalShippingPrice = (courierData.freight_charge || 0) + (courierData.coverage_charges || 0) + (courierData.other_charges || 0);

        setCourier({ shippingPrice: totalShippingPrice, courier_id: courierData.courier_company_id, courier_company_name: courierData.courier_name });
      } catch (error) {
        setCourier({ shippingPrice: 0, courier_id: null });
        toast.error("Invalid Pincode")
      }
    } else {
      setCourier({ shippingPrice: 0, courier_id: null });
    }
  }, [formData.zip, formData.shippingAddress.zip, totalWeight, price, url, shippingIsBilling]); // Add isShippingSameAsBilling to dependencies


  // Combine shipping and grand total calculations
  useEffect(() => {
    shippingPriceSetter();
    setGrandTotal(price + courier.shippingPrice);
  }, [price, courier.shippingPrice, shippingPriceSetter]);

  useEffect(() => {
    const fetchLocation = async (pin, isShipping = false) => {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);

        if (response && response.data && response.data[0].Status === 'Success') {
          const postOffices = response.data[0].PostOffice;

          if (postOffices.length > 0) {
            if (isShipping) {
              // Update shipping address state, country, and city
              setFormData((prev) => ({
                ...prev,
                shippingAddress: {
                  ...prev.shippingAddress,
                  state: postOffices[0].State,
                  country: 'India', // Assuming country is India
                  city: postOffices[0].Name, // Set default shipping city
                },
              }));

              // Set shipping cities list
              if (postOffices.length > 1) {
                setShippingCities(postOffices.map((po) => po.Name));
              } else {
                setShippingCities([]);
              }
            } else {
              // Update billing address state, country, and city
              setFormData((prev) => ({
                ...prev,
                state: postOffices[0].State,
                country: 'India', // Assuming country is India
                city: postOffices[0].Name, // Set default billing city
              }));

              // Set billing cities list
              if (postOffices.length) {
                setBillingCities(postOffices.map((po) => po.Name));
              } else {
                setBillingCities([]);
              }
            }
          }
        } else {
          // Handle error cases
          if (isShipping) {
            setFormData((prev) => ({
              ...prev,
              shippingAddress: {
                ...prev.shippingAddress,
                city: '',
                state: '',
              },
            }));
            setShippingCities([]);
          } else {
            setFormData((prev) => ({
              ...prev,
              city: '',
              state: '',
            }));
            setBillingCities([]);
          }
        }
      } catch (err) {
        // Handle error cases
        if (isShipping) {
          setFormData((prev) => ({
            ...prev,
            shippingAddress: {
              ...prev.shippingAddress,
              city: '',
              state: '',
            },
          }));
          setShippingCities([]);
        } else {
          setFormData((prev) => ({
            ...prev,
            city: '',
            state: '',
          }));
          setBillingCities([]);
        }
      }
    };

    // Check if shippingIsBilling is true or false
    if (shippingIsBilling) {
      if (formData.zip && formData.zip >= 6) {
        fetchLocation(formData.zip); // Fetch location for billing address
      }
    } else {
      // If shippingIsBilling is false, fetch both billing and shipping locations
      if (formData.zip && formData.zip >= 6) {
        fetchLocation(formData.zip); // Fetch location for billing address
      }
      if (formData.shippingAddress.zip && formData.shippingAddress.zip >= 6) {
        fetchLocation(formData.shippingAddress.zip, true); // Fetch location for shipping address
      }
    }
  }, [formData.zip, formData.shippingAddress.zip, shippingIsBilling]);


  const formatPhoneNumber = (phoneno) => {
    // Remove +91 and dashes, then trim extra spaces
    const formattedPhoneNumber = phoneno.replace('+91', '').replace(/-/g, '').replace(/\s/g, '').trim();
    return Number(formattedPhoneNumber);
  };

  const notesData = [{
    courier_id: courier.courier_id,
    shippingPrice: courier.shippingPrice,
    courier_company_name: courier.courier_company_name,
    packageCategory: packageCategory,
    saveThisAddress: saveAddress,
    orderData: {
      billing_customer_name: formData.firstName,
      billing_last_name: formData.lastName,
      billing_address: formData.address,
      billing_city: formData.city,
      billing_pincode: formData.zip,
      billing_state: formData.state,
      billing_country: formData.country,
      billing_email: formData.email,
      billing_phone: formatPhoneNumber(formData.phoneno),
      shipping_is_billing: shippingIsBilling,
      shipping_customer_name: shippingIsBilling ? formData.firstName : formData.shippingAddress.firstName,
      shipping_last_name: shippingIsBilling ? formData.lastName : formData.shippingAddress.lastName,
      shipping_address: shippingIsBilling ? formData.address : formData.shippingAddress.address,
      shipping_city: shippingIsBilling ? formData.city : formData.shippingAddress.city,
      shipping_pincode: shippingIsBilling ? formData.zip : formData.shippingAddress.zip,
      shipping_country: shippingIsBilling ? formData.country : formData.shippingAddress.country,
      shipping_state: shippingIsBilling ? formData.state : formData.shippingAddress.state,
      shipping_email: shippingIsBilling ? formData.email : formData.shippingAddress.email,
      shipping_phone: shippingIsBilling ? formatPhoneNumber(formData.phoneno) : formatPhoneNumber(formData.shippingAddress.phoneno),
      order_items: items,  // Assuming 'items' is your order items list
      sub_total: price,
      length: dimensions.length,
      breadth: dimensions.breadth,
      height: dimensions.height,
      weight: totalWeight,
    }
  }];

  // Form Validation

  const isFormDataValid = formData.firstName && formData.lastName && formData.email && formData.address &&
    formData.phoneno && formData.city && formData.state && formData.zip?.length >= 6 && formData.country;

  const isShippingAddressValid = shippingIsBilling || (
    formData.shippingAddress.firstName && formData.shippingAddress.lastName &&
    formData.shippingAddress.address && formData.shippingAddress.city &&
    formData.shippingAddress.state && formData.shippingAddress.zip?.length >= 6 &&
    formData.shippingAddress.country && formData.shippingAddress.email &&
    formData.shippingAddress.phoneno
  );

  const isNotesDataValid = notesData[0].courier_id && notesData[0].packageCategory &&
    notesData[0].orderData.sub_total > 0 && notesData[0].orderData.length &&
    notesData[0].orderData.breadth && notesData[0].orderData.height && notesData[0].orderData.weight > 0;

  const isButtonEnabled = isFormDataValid && isShippingAddressValid && items && grandTotal > 0 &&
    courier.shippingPrice > 0 && isNotesDataValid;

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
                {currency + courier.shippingPrice}
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
              singleProduct={singleProduct}
              amount={grandTotal}
              address={formData}
              notes={notesData}
              pathway={{ items, weightQuantity, price, singleProduct }}
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
            <>
              {/* Billing Address Form */}
              <form className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="md:w-1/2 mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
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
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last name<span className="text-red-500">*</span>
                    </label>
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
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email<span className="text-red-500">*</span></label>
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
                    <label htmlFor="phoneno" className="block text-sm font-medium mb-1">Phone no<span className="text-red-500">*</span></label>
                    <input
                      type="tel" // This ensures the input is treated as a telephone number
                      className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                      id="phoneno"
                      placeholder="0000000000"
                      value={formData.phoneno}
                      onChange={handleChange}
                      maxLength={10} // Limits input to 10 characters
                      pattern="\d{10}" // Ensures only digits are accepted
                      title="Phone number must be 10 digits"
                      required
                    />
                  </div>

                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="mb-4 md:w-1/2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address<span className="text-red-500">*</span></label>
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
                    <label htmlFor="zip" className="block text-sm font-medium mb-1">Pincode<span className="text-red-500">*</span></label>
                    <input
                      type="text" // Use 'text' to ensure flexibility, but restrict input through validation
                      className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                      id="zip"
                      maxLength={6} // Limits input to 6 characters
                      value={formData.zip}
                      onChange={handleChange}
                      pattern="\d{6}" // Ensures input contains exactly 6 digits
                      title="ZIP code must be exactly 6 digits"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {/* Country Input */}
                  <div className="md:w-1/3 mb-4">
                    <label htmlFor="country" className="block text-sm font-medium mb-1">Country<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="country"
                      className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter Country"
                      required
                    />
                  </div>

                  {/* State Input */}
                  <div className="md:w-1/3 mb-4">
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="state"
                      className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter State"
                      required
                    />
                  </div>

                  {/* City Input or Dropdown */}
                  <div className="md:w-1/3 mb-4">
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City<span className="text-red-500">*</span></label>
                    {billingCities.length > 1 ? (
                      <select
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                        required
                      >
                        {billingCities.map((cityName, index) => (
                          <option key={index} value={cityName}>
                            {cityName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id="city"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter City"
                        required
                      />
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={() => handleCheckboxChange(setSaveAddress)}
                      className="mr-2"
                    />
                    <span className="text-sm">Save this address for future use</span>
                  </label>
                </div>

                {/* Checkbox for Shipping is Billing */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shippingIsBilling}
                      onChange={() => handleCheckboxChange(setShippingIsBilling)}
                      className="mr-2"
                    />
                    <span className="text-sm">Shipping is the same as billing</span>
                  </label>
                </div>
                {/* <button
                  type="submit"
                  className={`w-full rounded-lg px-5 py-2.5 text-sm font-medium text-white ${isButtonEnabled ? 'bg-primary-700 hover:bg-primary-800' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!isButtonEnabled}
                >
                  Proceed to Payment
                </button> */}
              </form>

              {/* Shipping Address Form (conditional rendering) */}
              {!shippingIsBilling && (
                <form className="space-y-4 mt-8">
                  <h3 className="text-lg font-medium">Shipping Address</h3>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="md:w-1/2 mb-4">
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">First name<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="firstName"
                        value={formData.shippingAddress.firstName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="md:w-1/2 mb-4">
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last name<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="lastName"
                        value={formData.shippingAddress.lastName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="mb-4 md:w-1/2">
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email<span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="email"
                        placeholder="you@example.com"
                        value={formData.shippingAddress.email}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="mb-4 md:w-1/2">
                      <label htmlFor="phoneno" className="block text-sm font-medium mb-1">Phone no<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="phoneno"
                        placeholder="+91-000-000-0000"
                        value={formData.shippingAddress.phoneno}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="mb-4 md:w-1/2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Address<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="address"
                        placeholder="1234 Main St"
                        value={formData.shippingAddress.address}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="mb-4 md:w-1/2">
                      <label htmlFor="zip" className="block text-sm font-medium mb-1">Pincode<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="zip"
                        value={formData.shippingAddress.zip}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    {/* Shipping Country Input */}
                    <div className="md:w-1/3 mb-4">
                      <label htmlFor="country" className="block text-sm font-medium mb-1">Country<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="country"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        value={formData.shippingAddress.country}
                        onChange={handleShippingChange}
                        placeholder="Enter Country"
                        required
                      />
                    </div>

                    {/* Shipping State Input */}
                    <div className="md:w-1/3 mb-4">
                      <label htmlFor="state" className="block text-sm font-medium mb-1">State<span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="state"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        value={formData.shippingAddress.state}
                        onChange={handleShippingChange}
                        placeholder="Enter State"
                        required
                      />
                    </div>

                    {/* Shipping City Input or Dropdown */}
                    <div className="md:w-1/3 mb-4">
                      <label htmlFor="city" className="block text-sm font-medium mb-1">City<span className="text-red-500">*</span></label>
                      {shippingCities.length > 1 ? (
                        <select
                          id="city"
                          value={formData.shippingAddress.city}
                          onChange={handleShippingChange}
                          className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                          required
                        >
                          {shippingCities.map((cityName, index) => (
                            <option key={index} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          id="city"
                          className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                          value={formData.shippingAddress.city}
                          onChange={handleShippingChange}
                          placeholder="Enter City"
                          required
                        />
                      )}
                    </div>
                  </div>
                </form>
              )}

            </>
          )}

        </div>
      </div>
    </div>
  );

};

export default CheckoutContainer;
