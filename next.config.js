/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    nextConfig,
    images: {
        domains: ["res.cloudinary.com", "openweathermap.org"],
    },
    distDir: "build",
};
