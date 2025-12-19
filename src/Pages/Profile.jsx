import React from 'react'

const Profile = () => {
	// Simple profile from stored token info (expandable)
	const token = localStorage.getItem('token')

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Profile</h1>
			{!token && (
				<div>
					<p>You are not logged in.</p>
				</div>
			)}
			{token && (
				<div className="p-4 border rounded bg-white">Token present (you can call profile API to fetch details)</div>
			)}
		</div>
	)
}

export default Profile
