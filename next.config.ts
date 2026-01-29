/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dbuqawdawqgnbijtnmll.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
}

export default nextConfig

