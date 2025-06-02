import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, Route, Routes } from "react-router";
import { LoginForm } from './components/login-form.tsx';
import Login from './components/Login/Login.tsx';
import CollectionPage from './components/Collections/Collection.tsx';
import Ecommerce from './components/Layout/Ecommerce.tsx';
import CheckoutPage from './pages/checkout/index.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
		<CartProvider>
		<Routes>
	<Route path="/" element={<Ecommerce/>}>
	<Route path="/" element={<App />} />
		<Route path="/cart" element={<p>Cart</p>} />
		<Route path="/checkout" element={<CheckoutPage/>} />
		<Route path="/mens" element={<p>Men</p>} />
		<Route path="/womens" element={<p>Women</p>} />
	
		<Route path="/product/:id" element={<p>Product</p>} />
		<Route path="/collections/:category" element={<CollectionPage />} />
	</Route>
		<Route path="/login" element={<Login/>} />
		<Route path="/register" element={<p>Register</p>} />
		</Routes>
		
		</CartProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
