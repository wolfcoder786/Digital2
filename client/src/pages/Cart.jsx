import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const Cart = ({ cart, setCart }) => {
  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const removeFromCart = (id, name) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success(`${name} removed from cart 🗑️`, {
      style: { borderRadius: "10px", background: "#fff", color: "#f43f5e", fontWeight: "600", padding: "12px 16px" },
      icon: "🗑️",
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="text-center py-20 text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h2>
        <p>Add some pesticides to start your purchase!</p>
      </div>
    );

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-r ${item.color}`}>🪴</div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-blue-600 font-medium">{item.malayalam}</p>
                  <p className="text-sm text-gray-600">₹{item.price} per unit</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"><Minus className="h-4 w-4" /></button>
                <span className="px-4 py-2 border rounded-lg">{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"><Plus className="h-4 w-4" /></button>
              </div>

              <div className="text-lg font-semibold text-green-600 mb-4 md:mb-0">₹{item.price * item.quantity}</div>

              <button onClick={() => removeFromCart(item.id, item.name)} className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition">
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900">Total: ₹{totalPrice}</h2>
          <button className="mt-4 md:mt-0 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
