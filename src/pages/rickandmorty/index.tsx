import { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

type Character = {
  name: string
  image: string
  status: string
}

type DataProps = {
  info: { next: string, prev?: string }
  results: Character[]
}


const Index = ({ data }: {data: DataProps}) => {
  const [characters, setCharacters] = useState(data.results)
  const [page, setPage] = useState({...data.info, current: defaultURL})
  const { current } = page
  useEffect(() => {
    if(current === defaultURL) return
    
    async function request() {
      const res = await fetch(current)
      const data: DataProps = await res.json()

      if(!data.info?.prev) return

      setPage({...data.info, current})
      setCharacters([...characters, ...data.results])
    }
    
    request()
  }, [current])

  const handleLoadMore = () => {
    setPage(prev => ({...prev, current: page?.next}))
  }
  
  const handleSubmitSearch = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      query: { value: string }
    }
    const value = target.query.value || ''

    // const { currentTarget: {} } = e
    // const fields = Array.from(currentTarget?.elements)
    // const fieldQuery = fields.find(field => field.name === 'query')

    // const value = fieldQuery.value || ''
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

    setPage(prev => ({...prev, current: endpoint}))
    console.log(page)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmitSearch}>
        <input name='query' type='search' />
        <button>Search</button>
      </form>
      <ul className={styles.grid}>
        {characters.map(({name, image}, i) => (
          <li key={i} className={styles.card}>
            <h2>{name}</h2>
            <img src={image} alt={name} />
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load more</button>
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