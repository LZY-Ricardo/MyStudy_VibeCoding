import React from 'react'
import { notFound } from 'next/navigation'

export default function Page() {
    notFound() // 触发not-found.jsx组件
  return (
    <div>BlogPage</div>
  )
}
