import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Character = {
  name: string
  image: string
  status: string
  species: string
}

const Character = ({ data }: {data: Character}) => {
  const {name, image, species, status} = data
  const router = useRouter()
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div>
        <img src={image} alt={name + "'s image"} />
      </div>
      <ul>
        <li>{name}</li>
        <li>{species}</li>
        <li>
          <span style={
            status === 'Alive' ? {backgroundColor: 'green'} : {backgroundColor: 'brown'}
          }>{status}</span>
        </li>
        <li>
          <button onClick={() => router.back()}>Back to homepage</button>
        </li>
      </ul>
    </div>
  )
}

export default Character

const defaultURL = 'https://rickandmortyapi.com/api/character'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const res = await fetch(`${defaultURL}/${id}`)
  const data = await res.json()
  return { props: {data} }
}