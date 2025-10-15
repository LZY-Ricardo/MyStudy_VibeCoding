'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function LocaleSwitcher() {
    const pathname = usePathname()
    console.log(pathname)

    function switchLocale(locale) {
        // e.g. '/en/about' or '/fr/contact'
        const newPath = `/${locale}${pathname}`
        window.history.replaceState(null, '', newPath)
    }

  return (
      <>
          <button onClick={() => switchLocale('en')}>English</button>
          <button onClick={() => switchLocale('fr')}>French</button>
      </>
  )
}
