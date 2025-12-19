import React from 'react'

const Foodcard = ({ food = {}, onAdd = () => { } }) => {
	const { name = 'Food', price = 0, description = '', image } = food
	const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

	return (
		<div className="border rounded-lg overflow-hidden shadow-sm bg-white">
			{image ? (
				<img src={image} alt={name} className="w-full h-44 object-cover" />
			) : (
				<div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400">
					No image
				</div>
			)}
			<div className="p-4">
				<h3 className="text-lg font-semibold">{name}</h3>
				<p className="text-sm text-gray-600 my-2">{description}</p>
				<div className="flex items-center justify-between">
					<span className="font-bold text-green-600">{formatter.format(price)}</span>
					<button
						onClick={() => onAdd(food)}
						className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
					>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}

export default Foodcard
