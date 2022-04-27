/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    nextConfig,
    /* env: {
        NEXT_PUBLIC_FETCH_URL_USER: "http://localhost:4000/users",
    }, */
};
module.exports = {
    images: {
        domains: [
          'res.cloudinary.com'
        ],
    },
  }