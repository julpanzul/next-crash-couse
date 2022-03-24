import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'

type Character = {
  id: number
  name: string
  image: string
}

type DataProps = {
  data: {
    info: { next: string }
    results: Character[]
  }
}

function Index({ data }: DataProps) {
  const { info, results: defaultResult = [] } = data
  const [characters, updateCharacters] = useState(defaultResult)
  const [page, updatePage] = useState({
    ...info, current: baseURL
  })
  const { current } = page

  useEffect(() => {
    if(current === baseURL) return

    async function request() {
      const res = await fetch(current)
      const data = await res.json()

      updatePage({
        current, ...data.info 
      })

      if( !data.info?.prev ) {
        updateCharacters(data.results)
        return
      }

      updateCharacters(prev => {
        return [
          ...prev, ...data.results
        ]
      })

    }
    request()
  }, [current])

  const handleLoadMore = () => {
    updatePage(prev => {
      return {
        ...prev, current: page?.next
      }
    })
  }
  return (
    <>
      {characters.map((c, i) => (
        <li key={i}>{c.name}</li>
      ))}
      {data.info.next && 
        <button onClick={handleLoadMore}>Load more</button>
      }
    </>
  )
}

const baseURL = 'https://rickandmortyapi.com/api/character'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(baseURL)
  const data = await res.json()
  
  return { props: { data }}
}

export default Index