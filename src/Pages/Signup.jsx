import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/api'

const Signup = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const submit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			await signup(form)
			navigate('/login')
		} catch (err) {
			console.error(err)
			alert('Signup failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded shadow">
			<h2 className="text-xl font-bold mb-4">Sign up</h2>
			<form onSubmit={submit} className="space-y-3">
				<input
					className="w-full border rounded px-3 py-2"
					placeholder="Name"
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
				/>
				<input
					className="w-full border rounded px-3 py-2"
					placeholder="Email"
					value={form.email}
					onChange={(e) => setForm({ ...form, email: e.target.value })}
				/>
				<input
					type="password"
					className="w-full border rounded px-3 py-2"
					placeholder="Password"
					value={form.password}
					onChange={(e) => setForm({ ...form, password: e.target.value })}
				/>
				<button className="w-full bg-green-600 text-white px-3 py-2 rounded" disabled={loading}>
					{loading ? 'Signing up...' : 'Sign up'}
				</button>
			</form>
		</div>
	)
}

export default Signup
