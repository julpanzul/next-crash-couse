import React from 'react'
import {User} from '../../interfaces'

function UserId({user}: {user: User}) {
  return (
    <div>
      <ul key={user.id}>
        <li>Name: {user.name}</li>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Website: {user.website}</li>
      </ul>
    </div>
  )
}

export default UserId

UserId.getInitialProps = async (ctx: any) => {
  const {id} = ctx.query
  const url = `https://jsonplaceholder.typicode.com/users?${id}`
  const res = await fetch(url)
  const data = await res.json()

  return { user: data[0] }
}