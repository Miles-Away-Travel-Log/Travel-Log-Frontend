/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
};

module.exports = {
    nextConfig,
    images: {
        domains: ["res.cloudinary.com", "openweathermap.org", "pexels.com"],
    },
    distDir: "build",
};
