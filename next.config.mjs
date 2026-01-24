/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },

    // Environment variables that should be available on the client
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    },
};

export default nextConfig;
