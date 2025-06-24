import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="container">
      <h2 className="my-4">All Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img src={product.image_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>₹ {product.price}</strong></p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="my-4">🛒 Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li className="list-group-item" key={index}>{item.name} - ₹ {item.price}</li>
            ))}
          </ul>
          <h3>Total: ₹ {totalPrice}</h3>
          <button className="btn btn-success" onClick={() => alert("Checkout Successful!")}>Checkout</button>
        </div>
      )}
    </div>
  );
}
