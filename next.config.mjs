/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: [], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
    images: {
        domains: ['127.0.0.1'],
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    async rewrites() {
        let base_url = process.env.BASE_URL || 'http://localhost:8000/api/v1/'
        return [
            {
                source: '/videos/:path*',
                destination: `${base_url}/videos/:path*`
            },
            {
                source: '/user/:path*',
                destination: `${base_url}/users/:path*`
            },
            {
                source: '/subscriptions/:path*',
                destination: `${base_url}/subscriptions/:path*`
            },
            {
                source: '/comments/:path*',
                destination: `${base_url}/comments/:path*`
            },
            {
                source: '/likes/:path*',
                destination: `${base_url}/likes/:path*`
            },
            {
                source: '/dislikes/:path*',
                destination: `${base_url}/dislikes/:path*`
            },
            {
                source: '/subscriptions/:path*',
                destination: `${base_url}/subscriptions/:path*`
            },
            {
                source: '/playlist/:path*',
                destination: `${base_url}/playlist/:path*`
            }

        ]
    },
}

export default nextConfig;
