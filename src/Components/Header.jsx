import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-2xl font-bold text-green-600">
          FoodApp
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>
          <Link to="/restaurants" className="hover:text-green-600">
            Restaurants
          </Link>
          <Link to="/cart" className="hover:text-green-600">
            Cart
          </Link>
          <Link to="/add-food" className="hover:text-green-600">
            Add Food
          </Link>
          <Link to="/add-restaurant" className="hover:text-green-600">
            Add Restaurant
          </Link>
          <Link to="/login" className="hover:text-green-600">
            Login
          </Link>
          <Link to="/signup" className="hover:text-green-600">
            Signup
          </Link>
        </nav>

      </div>
    </header>
  )
}

export default Header
