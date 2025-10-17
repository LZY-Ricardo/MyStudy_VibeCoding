// app/layout.js
import Link from "next/link";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div>
                    <Link href="/a">Link to /a</Link>
                    <br />
                    <Link href="/b">Link to /b</Link>
                </div>
                {children}
            </body>
        </html>
    )
}