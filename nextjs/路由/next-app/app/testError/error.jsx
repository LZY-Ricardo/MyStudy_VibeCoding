'use client'

import React, { useEffect } from 'react'

export default function error({error, reset}) {
    useEffect(() => {
        console.log(error);
    }, [error])
  return (
      <div>
          <h2>Something went wrong!</h2>
          <button
              onClick={
                  // 尝试恢复
                  () => reset()
              }
          >
              try again
          </button>
    </div>
  )
}
