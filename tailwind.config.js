module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "register-img":
                    "url('../public/images/images-register/willian-justen-de-vasconcellos-T_Qe4QlMIvQ-unsplash.jpg')",
                "login-img":
                    "url('../public/images/images-register/pawel-czerwinski-6lQDFGOB1iw-unsplash.jpg')",
            },
        },
    },
    plugins: [],
};
