import { useRouter } from "next/router"
import React from 'react'

function Product() {
  const router = useRouter()
  console.log(router.query)
  return (
    <div>Product</div>
  )
}

export default Product