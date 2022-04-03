import { GetServerSideProps, GetStaticProps } from 'next'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'

type Product = {
  id: number
  name: string
}

type DataProps = {
  info: { next: string }
  results: Product[]
}

function Index({ data }: { data: DataProps}) {
  const [products, setProducts] = useState(data.results)
  const router = useRouter()
  const {page} = router.query

  let current = page? +page : 1
  
  useEffect(() => {
    async function request() {
      const res = await fetch(defaultURL + `?page=${current}`)
      const data = await res.json()
      
      setProducts(data.results)
    }

    request()
  }, [page])
  const handleNextPage = (x: number) => {
    router.push(`/products?page=${x + 1}`)
  }
  return (
    <div>
      <div className="product_list">
        {products.map((product, i) => (
          <div key={i}>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index

const defaultURL = 'https://rickandmortyapi.com/api/character'

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const res = await fetch(defaultURL + `?page=${query.page}`)
  const data = await res.json()

  return { props: { data } }
}