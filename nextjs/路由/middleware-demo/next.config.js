const { sources } = require("next/dist/compiled/webpack/webpack")
const { Sour_Gummy } = require("next/font/google")
const { after } = require("next/server")

module.exports = {
    async redirects() {
        return [
            {
                source: '/blog/yayu',
                destination: '/blog/yayu-redirects',
                permanent: true
            }
        ]
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/blog/yayu',
                    destination: '/blog/yayu-beforeFiles'
                }
            ],
            afterFiles: [
                {
                    source: '/blog/yayu',
                    destination: '/blog/yayu-afterFiles'
                }
            ],
            fallback: [
                {
                    source: '/blog/yayu',
                    destination: `/blog/yayu-fallback`
                }
            ]
        }
    }
}