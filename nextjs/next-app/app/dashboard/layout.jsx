import React from 'react'

export default function layout({children}) {
  return (
      <div>
          <nav>Nav</nav>
          <div>
              {children}
          </div>
    </div>
  )
}
