import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Restaurants from './Pages/Restaurants'
import RestaurantMenu from './Pages/RestaurantMenu'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import MyOrder from './Pages/MyOrder'
import Profile from './Pages/Profile'
import AddFood from './Pages/AddFood'
import AddRestaurant from './Pages/AddRestaurant'
import { CartProvider } from './context/CartContext.jsx'

const App = () => {
	return (
		<BrowserRouter>
			<CartProvider>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 container mx-auto p-4">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/restaurants" element={<Restaurants />} />
							<Route path="/restaurants/:id" element={<RestaurantMenu />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/myorders" element={<MyOrder />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/add-food" element={<AddFood />} />
							<Route path="/add-restaurant" element={<AddRestaurant />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</CartProvider>
		</BrowserRouter>
	)
}

export default App
