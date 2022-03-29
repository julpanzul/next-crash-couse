import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Character = {
  id: number
  name: string
  image: string
}

type DataProps = {
  info: { next: string }
  results: Character[]
}

const Index = ({ data }: { data: DataProps }) => {
  const {info, results = []} = data
  const [characters, setCharacters] = useState(results)
  const [page, setPage] = useState({...info, current: defaultURL})
  const {current} = page

  useEffect(() => {
    if(current === defaultURL) return
    async function request() {
      const res = await fetch(current)
      const data = await res.json()
      
      setPage({...data.info, current})

      if(!data.info?.prev) {
        setCharacters(data.results)
        return
      }
      setCharacters([...characters, ...data.results])
    }

    request()
  }, [current])

  const handleSubmitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      query: { value: string }
    }
    const value = target.query.value || ''
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

    setPage(prev => ({...prev, current: endpoint}))
  }

  const handleLoadMore = () => {
    setPage(prev => {
      return {
        ...prev, current: page?.next
      }
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmitSearch}>
        <input type="search" name="query" />
        <button>Search</button>
      </form>
      <ul>
        {characters.map(({id, name}, i) => (
          <li key={i}>
            <Link href='/rickandmorty/character/[id]' as={`/rickandmorty/character/${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  )
}

export default Index

const defaultURL = 'https://rickandmortyapi.com/api/character'

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(defaultURL)
  const data = await res.json()
  
  return { props: { data }}
}