import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRestaurants } from '../services/api'
import api from '../services/api'

const AddFood = () => {
    const [restaurants, setRestaurants] = useState([])
    const [form, setForm] = useState({ restaurantId: '', name: '', description: '', price: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        getRestaurants()
            .then((r) => mounted && setRestaurants(r.data || r))
            .catch(() => { })
        return () => (mounted = false)
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/api/foods', { ...form, price: Number(form.price) })
            alert('Food added')
            // go to the restaurant menu to see the new item
            const rid = form.restaurantId
            setForm({ restaurantId: '', name: '', description: '', price: '' })
            if (rid) navigate(`/restaurants/${rid}`)
        } catch (err) {
            console.error(err)
            alert('Failed to add food')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Food</h2>
            <form onSubmit={submit} className="space-y-3">
                <select value={form.restaurantId} onChange={(e) => setForm({ ...form, restaurantId: e.target.value })} className="w-full border rounded px-3 py-2">
                    <option value="">Select restaurant</option>
                    {restaurants.map((r) => (
                        <option key={r._id || r.id} value={r._id || r.id}>{r.name}</option>
                    ))}
                </select>
                <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <input className="w-full border rounded px-3 py-2" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <button className="w-full bg-green-600 text-white px-3 py-2 rounded" disabled={loading}>{loading ? 'Adding...' : 'Add Food'}</button>
            </form>
        </div>
    )
}

export default AddFood
