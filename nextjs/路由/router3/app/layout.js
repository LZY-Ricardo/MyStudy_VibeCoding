// app/layout.js
import Link from "next/link";

export default function RootLayout({ children, analytics }) {
    return (
        <html>
            <body>
                <nav>
                    <Link href="/">Home</Link>
                    <br />
                    <Link href="/page-views">Page Views</Link>
                    <br />
                    <Link href="/visitors">Visitors</Link>
                </nav>
                <h1>root layout</h1>
                {analytics}
                {children}
            </body>
        </html>
    );
}
