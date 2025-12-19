import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
	const { items, updateQty, remove, total, doPlaceOrder } = useCart()
	const [customer, setCustomer] = useState({ name: '', address: '' })
	const [placing, setPlacing] = useState(false)
	const navigate = useNavigate()

	const place = async () => {
		setPlacing(true)
		try {
			await doPlaceOrder(customer)
			// simple success flow
			navigate('/myorders')
		} catch (e) {
			console.error(e)
			alert('Failed to place order')
		} finally {
			setPlacing(false)
		}
	}

	if (!items.length) return <div>Your cart is empty.</div>

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
			<div className="space-y-4">
				{items.map((it) => (
					<div key={it.id} className="p-4 border rounded bg-white flex justify-between items-center">
						<div>
							<div className="font-semibold">{it.name}</div>
							<div className="text-sm text-gray-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(it.price)} each</div>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="number"
								min={1}
								value={it.qty}
								onChange={(e) => updateQty(it.id, Number(e.target.value))}
								className="w-20 border rounded px-2 py-1"
							/>
							<button onClick={() => remove(it.id)} className="text-red-600">Remove</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-6">
				<div className="text-lg font-bold">Total: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}</div>
				<div className="mt-4 space-y-2 max-w-md">
					<input
						placeholder="Your name"
						value={customer.name}
						onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
						className="w-full border rounded px-3 py-2"
					/>
					<textarea
						placeholder="Delivery address"
						value={customer.address}
						onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
						className="w-full border rounded px-3 py-2"
					/>
					<button onClick={place} disabled={placing} className="px-4 py-2 bg-green-600 text-white rounded">
						{placing ? 'Placing...' : 'Place Order'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Cart
