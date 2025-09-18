import React from "react";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = ({ cart, setCart }) => {
  // Remove product from cart
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Update quantity
  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return; // prevent 0 or negative
    setCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-10">
          <ShoppingCart className="h-8 w-8 text-green-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty 🛒
          </p>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4"
                >
                  {/* Item Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.malayalam} | {item.type}
                    </p>
                    <p className="text-green-600 font-bold mt-1">
                      ₹{item.price}{" "}
                      <span className="text-sm text-gray-500">
                        x {item.quantity || 1}
                      </span>
                    </p>
                  </div>

                  {/* Quantity Controls + Remove */}
                  <div className="flex items-center space-x-3">
                    {/* Quantity Buttons */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(index, (item.quantity || 1) - 1)
                        }
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l"
                      >
                        ➖
                      </button>
                      <span className="px-4 font-semibold">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(index, (item.quantity || 1) + 1)
                        }
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r"
                      >
                        ➕
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{total}
              </span>
            </div>

            {/* Checkout */}
            <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
