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
        let base_url = process.env.BASE_URL || 'http://localhost:8000'
        return [
            {
                source: '/videos',
                destination: `${base_url}/api/v1/videos/`
            },

        ]
    },
}

export default nextConfig;
