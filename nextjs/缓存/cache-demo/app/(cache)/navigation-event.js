'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [pathname, searchParams])

    return null
}