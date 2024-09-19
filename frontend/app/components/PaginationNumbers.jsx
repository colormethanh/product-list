import React from 'react'

export default function PaginationNumbers({pageData}) {

  const { current_page, max_page, product_count } = pageData;

  return (
    <div className=''>
      {current_page} / {max_page}
    </div>
  )
}
