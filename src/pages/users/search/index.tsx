import {User} from '../../../interfaces'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

function Search({users}: {users: User[]}) {
  return (
    <div>
      {users && users.length > 0? 
        users.map((user, i) => (
          <Link key={i} href='/users/[id]' as={`/users/${user.id}`} passHref>
            <a>
              <h1>{user.name}</h1>
            </a>
          </Link>
        )) : <h1>User not found</h1>
      }
    </div>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {name} = ctx.query
  const url = `https://jsonplaceholder.typicode.com/users?name=${name}`
  const res = await fetch(url)
  const data: User[] = await res.json()

  return { props: { users: data }}
}