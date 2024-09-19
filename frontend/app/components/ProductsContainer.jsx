import React from 'react'

export default function ProductsContainer({children}) {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-3/4 grid auto-rows-max grid-cols-3 gap-3'>
        {children}
      </div>
    </div>
  )
}
