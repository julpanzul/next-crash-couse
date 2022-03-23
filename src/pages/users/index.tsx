import { GetStaticProps } from 'next'
import Link from 'next/link'
import {User} from '../../interfaces'

function Users({ users }: {users: User[]}) {
  return (
    <>
      {users.map(user => (
        <Link key={user.id} href={`/users/search?name=${user.name}`} passHref>
          <a>
            <li key={user.id}>{user.name}</li>
          </a>
        </Link>
      ))}
    </>
  )
}

export default Users

export const getStaticProps: GetStaticProps = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const res = await fetch(url)
  const users: User[] = await res.json()
  return { props: { users } }
}