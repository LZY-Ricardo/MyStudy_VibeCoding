'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { NavigationEvents } from './navigation-event'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function CacheLayout({ children }) { 
    const router = useRouter()
    return (
        <section className='p-5'>
            <nav className='flex items-center justify-center gap-10 text-blue-600 mb-6'>
                {/* <Link href='/about'>About</Link>
                <Link href='/settings'>Settings</Link> */}
                {/* <button onClick={() => {
                    router.push('/about')
                    router.refresh()
                }}>About</button>
                <button onClick={() => {
                    router.push('/settings')
                    router.refresh()
                }}>Settings</button> */}
            </nav>
            {children}
            <Suspense fallback={null}>
                <NavigationEvents />
            </Suspense>
        </section>
    )
}
