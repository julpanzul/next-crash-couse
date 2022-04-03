import { GetServerSideProps } from 'next'
import Link from 'next/link'

type Item = {
  id: number
  name: string
}

type DataProps = {
  info: { next: string }
  results: Item[]
  current: number
  error?: string
}

function Cart({ data }: {data: DataProps}) {
  if(data.error) return
  const items = data?.results
  const {current} = data
  return (
    <div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
      <Link href={`/cart?page=${current + 1}`}>
        <a>Next</a>
      </Link>
    </div>
  )
}

export default Cart

const defaultURL = 'https://rickandmortyapi.com/api/character'

export const  getServerSideProps: GetServerSideProps = async ({query}) => {
  const {page = 1} = query
  try {
    const res = await fetch(defaultURL + `?page=${page}`)
    const data = await res.json()
  
    return {
      props: {
        data: { ...data, current: +page }
      }
    }
  } catch (error) {
    return { props: { data: error }}    
  }
}