import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRestaurants } from '../services/api'

const Restaurants = () => {
	const [restaurants, setRestaurants] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let mounted = true
		getRestaurants()
			.then((r) => mounted && setRestaurants(r.data || r))
			.catch(() => { })
			.finally(() => mounted && setLoading(false))
		return () => (mounted = false)
	}, [])

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">All Restaurants</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{restaurants.map((r) => {
					const id = r._id || r.id
					return (
						<Link key={id} to={`/restaurants/${id}`} className="block p-4 border rounded hover:shadow bg-white">
							<h3 className="text-lg font-semibold">{r.name}</h3>
							<p className="text-sm text-gray-600">{r.description}</p>
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default Restaurants
