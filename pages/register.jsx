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
        registerFormValues,
        setRegisterFormValues,
        registerFormErrors,
        setRegisterFormErrors,
    } = useAppData();

    function handleChange(event) {
        const { name, value } = event.target;
        setRegisterFormValues({ ...registerFormValues, [name]: value });
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
        return errors;
    }

    useEffect(() => {
        setRegisterFormErrors(validate(registerFormValues));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerFormValues]);

    async function registerUser(e) {
        e.preventDefault();
        setIsSubmit(true);
        if (Object.keys(registerFormErrors).length === 0) {
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
                        firstName: registerFormValues.firstName,
                        lastName: registerFormValues.lastName,
                        userName: registerFormValues.userName,
                        email: registerFormValues.email,
                        password: registerFormValues.password,
                        mapStyle: {
                            name: "Basic",
                            link: "mapbox://styles/mapbox/streets-v9",
                            iconColor: "text-black",
                        },
                        home: {
                            longitude: -0.091998,
                            latitude: 51.515618,
                            city: "London",
                            country: "United Kingdom",
                        },
                    }),
                }
            );

            if (rawResponse.status === 201) {
                // falls erfolgreich, dann login
                router.replace("/user/login");
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
        <div className="bg-[url('../public/images/images-register/willian-justen-de-vasconcellos-T_Qe4QlMIvQ-unsplash.webp')] bg-cover min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form
                    className=" px-6 py-8 text-black w-full"
                    onSubmit={registerUser}
                >
                    <div className="flex justify-center w-full mb-8">
                        <Image
                            src={avatar}
                            alt="Avatar"
                            width={100}
                            height={100}
                        />
                    </div>

                    <h1 className="mb-8 text-3xl text-center text-white">
                        CREATE ACCOUNT
                    </h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                        name="firstName"
                        placeholder="First Name"
                        value={registerFormValues.firstName}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && registerFormErrors.firstName}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                        name="lastName"
                        placeholder="Last Name"
                        value={registerFormValues.lastName}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && registerFormErrors.lastName}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                        name="userName"
                        placeholder="User Name"
                        value={registerFormValues.userName}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && registerFormErrors.userName}
                    </p>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                        name="email"
                        placeholder="Email"
                        value={registerFormValues.email}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-red-600 mb-4">
                        {isSubmit && registerFormErrors.email}
                    </p>
                    <div className="relative">
                        <input
                            type={passwordInputType}
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="password"
                            placeholder="Password"
                            value={registerFormValues.password}
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
                            className="absolute right-[15px] top-[15px] text-[20px] text-black"
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
                        {isSubmit && registerFormErrors.password}
                    </p>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={registerFormValues.confirm_password}
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
                        {isSubmit && registerFormErrors.confirm_password}
                    </p>
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    >
                        Create Account
                    </button>
                    <div className="text-center text-sm text-white mt-4">
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

                <div className="text-white mt-3">
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
