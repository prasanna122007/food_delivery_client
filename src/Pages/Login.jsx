import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

const Login = () => {
	const [form, setForm] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const submit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await login(form)
			const token = res.data?.token || res.data
			if (token) localStorage.setItem('token', token)
			navigate('/')
		} catch (err) {
			console.error(err)
			alert('Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded shadow">
			<h2 className="text-xl font-bold mb-4">Login</h2>
			<form onSubmit={submit} className="space-y-3">
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
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	)
}

export default Login
