'use client'

import React from 'react'
import {useSearchParams} from 'next/navigation'

export default function SortProducts() {
    const searchParams = useSearchParams()
    console.log(searchParams)

    function updateSorting(sortOrder) {
        const params = new URLSearchParams(searchParams.toString())
        console.log(params)
        params.set('sort', sortOrder)
        window.history.pushState(null, '', `?${params.toString()}`)
    }
  return (
      <>
          <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
          <button onClick={() => updateSorting('desc')}>Sort Descending</button>
      </>
  )
}
