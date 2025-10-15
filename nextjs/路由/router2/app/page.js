'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
  return (
      <div>
          <h1>
              根页面
          </h1>
          <div>
              <Link href="/dashboard" scroll={false}>Dashboard</Link>
          </div>
          <div>
              <button type="button" onClick={() => router.push('/dashboard')}>
                  Dashboard
              </button>
          </div>
    </div>
  )
}
