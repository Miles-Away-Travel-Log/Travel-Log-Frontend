module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "register-img":
                    "url('../public/images/images-register/mado-el-khouly-MA8YoAoKpfY-unsplash.jpg')",
                "login-img":
                    "url('../public/images/images-register/pawel-czerwinski-6lQDFGOB1iw-unsplash.jpg')",
            },
        },
    },
    plugins: [],
};
