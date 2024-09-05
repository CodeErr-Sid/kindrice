import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const CheckoutContainer = () => {

  const { cart } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    address2: '',
    country: 'Choose...',
    state: 'Choose...',
    zip: '',
    paymentMethod: 'credit',
    ccName: '',
    ccNumber: '',
    ccExpiration: '',
    ccCvv: '',
    sameAddress: false,
    saveInfo: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="md:w-1/3 lg:w-1/4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Your Cart</h4>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-4 border border-gray-200 rounded-md bg-white shadow-sm">
              <div>
                <h6 className="text-base font-medium">Product name</h6>
                <p className="text-sm text-gray-600">Brief description</p>
              </div>
              <span className="text-gray-700">$12</span>
            </li>
            <li className="flex justify-between flex-col items-center p-4 border border-gray-200 rounded-md bg-white shadow-sm">
              <div>
                <h6 className="text-base font-medium">Shipping + Delivery</h6>
                <p className="text-sm text-gray-600">Brief description</p>
              </div>
              <span className="text-gray-700">$8</span>
              <div>
                <h6 className="text-base font-medium">Shipping + Delivery</h6>
                <p className="text-sm text-gray-600">Brief description</p>
              </div>
              <span className="text-gray-700">$8</span>
            </li>
            <li className="flex justify-between items-center p-4 border border-gray-200 rounded-md bg-white shadow-sm">
              <div>
                <h6 className="text-base font-medium">Third item</h6>
                <p className="text-sm text-gray-600">Brief description</p>
              </div>
              <span className="text-gray-700">$5</span>
            </li>
            <li className="flex justify-between items-center p-4 border border-gray-200 rounded-md bg-green-700 text-white">
              <div>
                <h6 className="text-base font-medium">Promo code</h6>
                <p className="text-sm">EXAMPLECODE</p>
              </div>
              <span>$-5</span>
            </li>
            <li className="flex justify-between items-center p-4 border border-gray-200 rounded-md bg-white shadow-sm">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>

          <form className="mt-4">
            <div className="flex">
              <input
                type="text"
                className="w-full border rounded-l-md px-3 py-2 border-gray-300"
                id="promoCode"
                placeholder="Promo code"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-r-md hover:bg-green-800"
              >
                Redeem
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-2/3 lg:w-3/4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Billing Address</h4>
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

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
              <div className="flex">
                <span className="bg-gray-200 text-gray-600 px-3 py-2 border rounded-l-md">@</span>
                <input
                  type="text"
                  className="form-input w-full border rounded-r-md px-3 py-2 border-gray-300"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email <span className="text-gray-600">(Optional)</span></label>
              <input
                type="email"
                className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                id="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
              <label htmlFor="address2" className="block text-sm font-medium mb-1">Address 2 <span className="text-gray-600">(Optional)</span></label>
              <input
                type="text"
                className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                id="address2"
                placeholder="Apartment or suite"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="md:w-1/3 mb-4">
                <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                <select
                  className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option>Choose...</option>
                  <option value="1">United States</option>
                </select>
              </div>
              <div className="md:w-1/3 mb-4">
                <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                <select
                  className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option>Choose...</option>
                  <option>California</option>
                </select>
              </div>
              <div className="md:w-1/3 mb-4">
                <label htmlFor="zip" className="block text-sm font-medium mb-1">Zip</label>
                <input
                  type="text"
                  className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                  id="zip"
                  placeholder=""
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="form-checkbox text-green-600"
                id="sameAddress"
                checked={formData.sameAddress}
                onChange={handleChange}
              />
              <label htmlFor="sameAddress" className="ml-2 text-sm">Same as shipping address</label>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/2 mb-4">
                  <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">Payment Method</label>
                  <select
                    className="form-select w-full border rounded-md px-3 py-2 border-gray-300"
                    id="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="credit">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>

              {formData.paymentMethod === 'credit' && (
                <div className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="ccName" className="block text-sm font-medium mb-1">Name on Card</label>
                    <input
                      type="text"
                      className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                      id="ccName"
                      value={formData.ccName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ccNumber" className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                      id="ccNumber"
                      value={formData.ccNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="md:w-1/2 mb-4">
                      <label htmlFor="ccExpiration" className="block text-sm font-medium mb-1">Expiration Date</label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="ccExpiration"
                        value={formData.ccExpiration}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:w-1/2 mb-4">
                      <label htmlFor="ccCvv" className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        className="form-input w-full border rounded-md px-3 py-2 border-gray-300"
                        id="ccCvv"
                        value={formData.ccCvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-600"
                  id="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                />
                <label htmlFor="saveInfo" className="ml-2 text-sm">Save this information for next time</label>
              </div>

              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
