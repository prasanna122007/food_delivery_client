import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRestaurantMenu } from '../services/api'
import Foodcard from '../Components/Foodcard'
import { useCart } from '../context/CartContext'

const RestaurantMenu = () => {
	const { id } = useParams()
	const [menu, setMenu] = useState([])
	const [loading, setLoading] = useState(true)
	const { add } = useCart()

	useEffect(() => {
		let mounted = true
		if (!id) return
		getRestaurantMenu(id)
			.then((r) => mounted && setMenu(r.data || r))
			.catch(() => {
				if (mounted)
					setMenu([
						{ id: 'f1', name: 'Hyderabadi Biryani', price: 250, description: 'Fragrant rice with marinated meat' },
						{ id: 'f2', name: 'Masala Dosa', price: 80, description: 'Crispy dosa with potato masala' },
					])
			})
			.finally(() => mounted && setLoading(false))
		return () => (mounted = false)
	}, [id])

	if (loading) return <div>Loading menu...</div>

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Menu</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{menu.map((f) => {
					const fid = f._id || f.id
					return <Foodcard key={fid} food={f} onAdd={() => add(f)} />
				})}
			</div>
		</div>
	)
}

export default RestaurantMenu
