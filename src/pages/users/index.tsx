import Link from 'next/link'
import {User} from '../../interfaces'

function Users({ users }: {users: User[]}) {
  return (
    <>
      {users.map(user => (
        <Link key={user.id} href='/users/[id]' as={`/users/${user.name}`} passHref>
          <a>
            <li key={user.id}>{user.name}</li>
          </a>
        </Link>
      ))}
    </>
  )
}

export default Users

Users.getInitialProps = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const res = await fetch(url)
  const data = await res.json()
  return { users: data }
}