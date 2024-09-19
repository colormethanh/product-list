import React from 'react'

export default function ProductCard({product}) {


  return (
    <div className='flex flex-col border'>
      <p> {product.name} </p>
      <p> {product.category} </p>
      <p> {product.price} </p>
    </div>
  )
}
