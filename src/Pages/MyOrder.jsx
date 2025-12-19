import React, { useEffect, useState } from 'react'
import { getMyOrders } from '../services/api'

const MyOrder = () => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		let mounted = true
		getMyOrders()
			.then((r) => mounted && setOrders(r.data || r))
			.catch(() => {
				if (mounted) setOrders([])
			})
		return () => (mounted = false)
	}, [])

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">My Orders</h1>
			{orders.length === 0 && <div>No orders yet.</div>}
			<div className="space-y-4">
				{orders.map((o) => (
					<div key={o.id || o._id} className="p-4 border rounded bg-white">
						<div className="font-semibold">Order #{o.id || o._id}</div>
						<div className="text-sm text-gray-600">Items: {o.items?.length || 0}</div>
						<div className="text-sm">Status: {o.status || 'Placed'}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default MyOrder
