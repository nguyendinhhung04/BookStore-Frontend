// src/components/client/CartPage.jsx
import React from 'react';

const CartPage = () => {
  // Giỏ hàng mẫu
  const cartItems = [
    { id: 1, title: 'Người đàn ông ấy', price: 150000 },
    { id: 2, title: 'Tử thi kể chuyện', price: 120000 }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.title}</span>
              <span>{item.price.toLocaleString()}₫</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-4">
            <span>Total:</span>
            <span>{total.toLocaleString()}₫</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
