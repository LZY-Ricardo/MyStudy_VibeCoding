import Link from 'next/link'

export default function DashboardLayout({ children }) {
    return (
        <section>
            <nav className='flex items-center justify-center gap-10 text-blue-500 mb-6'>
                <Link href="/about">About</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/team">Team</Link>
            </nav>
            {children}
        </section>
    )
}