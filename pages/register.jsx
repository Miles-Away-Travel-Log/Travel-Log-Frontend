import { useRouter } from "next/router";
import Image from "next/image";
import avatar from "../public/images/images-register/avatar.svg";
import { useAppData } from "../Context/DataStorage.js";
import { useEffect, useState } from "react";
import { ImEyeBlocked, ImEye } from "react-icons/im";

export default function Register() {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);

    // Show Passwort and hide it
    const [passwordInputType, setPasswordInputType] = useState("password");

    const {
        initialValues,
        formValues,
        setFormValues,
        formErrors,
        setFormErrors,
    } = useAppData();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    function validate(values) {
        const errors = {};
        // First Name
        if (!values.firstName) {
            errors.firstName = "First name is required";
        } else if (
            values.firstName.length < 3 ||
            values.firstName.length > 20
        ) {
            errors.firstName = "First name must be between 3 and 20 characters";
        } else if (!/^[a-zA-Z]+$/.test(values.firstName)) {
            errors.firstName = "First name must contain only letters";
        }
        // Last Name
        if (!values.lastName) {
            errors.lastName = "Last name is required";
        } else if (values.lastName.length < 3 || values.lastName.length > 20) {
            errors.lastName = "Last name must be between 3 and 20 characters";
        } else if (!/^[a-zA-Z]+$/.test(values.lastName)) {
            errors.lastName = "Last name must contain only letters";
        }
        // User Name
        if (!values.userName) {
            errors.userName = "User name is required";
        } else if (values.userName.length < 3 || values.userName.length > 10) {
            errors.userName = "Last name must be between 3 and 10 characters";
        } else if (!/^[a-zA-Z0-9]+$/.test(values.userName)) {
            errors.userName = "Last name must contain only letters and numbers";
        }
        // Email
        if (!values.email) {
            errors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }
        // Password
        if (!values.password) {
            errors.password = "Password is required";
        } else if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
                values.password
            )
        ) {
            errors.password =
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
        }
        if (!values.confirm_password) {
            // Confirm Password
            errors.confirm_password = "Confirm password is required";
        } else if (values.password !== values.confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }
        // City
        if (!values.city) {
            errors.city = "City is required";
        } else if (values.city.length < 3 || values.city.length > 30) {
            errors.city = "City must be between 3 and 30 characters";
        } else if (!/^[a-zA-Z]+$/.test(values.city)) {
            errors.city = "City must contain only letters";
        }
        // Country
        if (!values.country) {
            errors.country = "Country is required";
        } else if (values.country.length < 3 || values.country.length > 30) {
            errors.country = "Country must be between 3 and 30 characters";
        } else if (!/^[a-zA-Z]+$/.test(values.country)) {
            errors.country = "Country must contain only letters";
        }
        return errors;
    }

    useEffect(() => {
        setFormErrors(validate(formValues));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    async function registerUser(e) {
        e.preventDefault();
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0) {
            // user erstellen
            const rawResponse = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_USER + "/register",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
                        userName: formValues.userName,
                        email: formValues.email,
                        password: formValues.password,
                        city: formValues.city,
                        country: formValues.country,
                    }),
                }
            );

            if (rawResponse.status === 201) {
                // falls erfolgreich, dann login
                router.replace("/login");
            } else {
                const err = await rawResponse.json();
                console.log("backend error", err);
            }
        }
    }

    function handleShowPasswordButton() {
        setPasswordInputType(
            passwordInputType === "password" ? "text" : "password"
        );
    }

    return (
        <div className="bg-[url('../public/images/images-register/mado-el-khouly-MA8YoAoKpfY-unsplash.jpg')] bg-cover min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form
                    className=" px-6 py-8 text-black w-full"
                    onSubmit={registerUser}
                >
                    <div className="flex justify-center w-full">
                        <Image
                            src={avatar}
                            alt="Avatar"
                            width={100}
                            height={100}
                        />
                    </div>

                    <h1 className="mb-8 text-3xl text-center">
                        CREATE ACCOUNT
                    </h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="firstName"
                        placeholder="First Name"
                        value={formValues.firstName}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.firstName}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="lastName"
                        placeholder="Last Name"
                        value={formValues.lastName}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.lastName}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="userName"
                        placeholder="User Name"
                        value={formValues.userName}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.userName}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.email}
                    </p>
                    <div className="relative">
                        <input
                            type={passwordInputType}
                            className="block border border-grey-light w-full p-3 rounded-full mb-1"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                            onPaste={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                            onCopy={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                        />
                        <span
                            className="absolute right-[5px] top-[15px] text-[20px]"
                            onClick={handleShowPasswordButton}
                        >
                            {passwordInputType === "password" ? (
                                <ImEye />
                            ) : (
                                <ImEyeBlocked />
                            )}
                        </span>
                    </div>
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.password}
                    </p>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formValues.confirm_password}
                        onChange={handleChange}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                        onCopy={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.confirm_password}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="city"
                        placeholder="City"
                        value={formValues.city}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.city}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1"
                        name="country"
                        placeholder="Country"
                        value={formValues.country}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && formErrors.country}
                    </p>
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    >
                        Create Account
                    </button>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a
                            className="no-underline border-b border-grey-dark text-grey-dark"
                            href="#"
                        >
                            Terms of Service
                        </a>{" "}
                        and
                        <a
                            className="no-underline border-b border-grey-dark text-grey-dark"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </form>

                <div className="text-white mt-6">
                    Already have an account?
                    <a
                        className="no-underline border-b border-blue text-blue"
                        href="../login/"
                    >
                        Log in
                    </a>
                    .
                </div>
            </div>
        </div>
    );
}
