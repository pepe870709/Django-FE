import React from 'react'
import { useState } from 'react'

const Orders = () => {
  const [users, setUsers] = useState([])

  const handleClick = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/users/')
    const data = await response.json()
    setUsers(data)
    console.log(data)
  }

  return (
    <div>
      <h1>Your Orders</h1>
      <p>Here you can view your past orders.</p>
      <div>
        <button className='btn'type='button' onClick={() => handleClick()}>TEST</button>
      </div>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.username} - {user.email}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Orders
