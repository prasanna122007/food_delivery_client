import React, { useState } from 'react'
import api from '../services/api'

const AddRestaurant = () => {
    const [form, setForm] = useState({ name: '', description: '' })
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/api/restaurants', form)
            alert('Restaurant added')
            setForm({ name: '', description: '' })
        } catch (err) {
            console.error(err)
            alert('Failed to add restaurant')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add Restaurant</h2>
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="w-full border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <button className="w-full bg-green-600 text-white px-3 py-2 rounded" disabled={loading}>{loading ? 'Adding...' : 'Add Restaurant'}</button>
            </form>
        </div>
    )
}

export default AddRestaurant
