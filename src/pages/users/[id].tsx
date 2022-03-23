import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { User } from '../../interfaces'

function UserId({ data, errors }: { data?: User, errors?: string }) {
  if(errors) {
    return (
      <p>
        <span style={{ color: 'red' }}>Error:</span> {errors}
      </p>
    )
  }
  return (
    <>
      {data && 
        <>
          <h3>{data.name}</h3>
          <p>{data.email}</p>
        </>
      }
    </>
  )
}

export default UserId

export const getStaticPaths: GetStaticPaths = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const res = await fetch(url)
  const data = await res.json()
  const paths = data.map((user: User) => ({
    params: {id: user.id.toString()}
  }))
  
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const res = await fetch(url)
    const users = await res.json()
    const id = params?.id
    const data = users.find((user:User) => user.id === Number(id))
    return { props: { data }}
  } catch (err: any) {
    return { props: { errors: err.message }}
  }
}