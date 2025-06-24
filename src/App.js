import React, { useState } from 'react';
import Auth from './components/Auth';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setUserLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>My E-Commerce Store</h1>
      {!userLoggedIn ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <ProductForm />
          <ProductList />
        </>
      )}
    </div>
  );
}

export default App;
