import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { GetServerSideProps } from 'next'

type ProductType = {
  id: number
  name: string
  price?: number
}

const list_products : ProductType[] = [
  { id: 0, name: 'IPhone', price: 1500 },
  { id: 1, name: 'Macbook', price: 2200 },
  { id: 2, name: 'AndroidPhone', price: 750 },
  { id: 3, name: 'AirBuds', price: 350 }
]

function Products({data}: {data: ProductType}) {
  const [search, setSearch] = useState('')
  console.log(data)
  return (
    <div>
      <div className="search">
        <form action={`/products/?name=${search}`} method="POST">
          <input type="text" placeholder="Search Item" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </form>
      </div>
      <p>Results: <span>...</span></p>
    </div>
  )
}

export default Products

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {name} = ctx.query
  const data = list_products.find((item) => item.name === name)
  console.log(list_products)
  return { props: { data: data || {} }}
}