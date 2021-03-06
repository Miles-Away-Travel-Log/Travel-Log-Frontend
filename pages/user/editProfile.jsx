import { useRouter } from "next/router";
import { useAppData } from "../../Context/DataStorage.js";
import { useEffect, useState } from "react";
import { ImEyeBlocked, ImEye } from "react-icons/im";
import AddProfilePicture from "../../components/AddProfilePicture.jsx";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

export default function EditProfile() {
    const router = useRouter();
    const {
        userId,
        user,
        accountPhoto,
        handleGetUser,
        newHome,
        setNewHome,
        defaultMapStyle,
        setDefaultMapStyle,
    } = useAppData();
    // console.log(user);
    const userInitialValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirm_password: "",
        city: "",
        country: "",
        status: "",
        avatar: "",
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
    };

    const [isSubmit, setIsSubmit] = useState(false);
    const [formValues, setFormValues] = useState(userInitialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isVisible, setIsVisible] = useState();

    // Show Passwort and hide it
    const [passwordInputType, setPasswordInputType] = useState("password");

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
        return errors;
    }

    useEffect(() => {
        setFormErrors(validate(formValues));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);

    useEffect(() => {
        if (!user) {
            return;
        }
        setFormValues({
            ...user,
            password: "",
            confirm_password: "",
        });
    }, [user]);

    async function updateUser(e) {
        e.preventDefault();
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0) {
            const home = newHome ? newHome : user.home;
            const mapStyle = defaultMapStyle ? defaultMapStyle : user.mapStyle;
            // user erstellen
            const rawResponse = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_USER + `${userId}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                    body: JSON.stringify({
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
                        userName: formValues.userName,
                        email: formValues.email,
                        password: formValues.password,
                        status: formValues.status,
                        visible: isVisible,
                        avatar: accountPhoto,
                        mapStyle: {
                            name: mapStyle.name,
                            link: mapStyle.link,
                            iconColor: mapStyle.iconColor,
                        },
                        home: {
                            longitude: home.longitude,
                            latitude: home.latitude,
                            city: home.city,
                            country: home.country,
                        },
                    }),
                }
            );

            if (rawResponse.status === 200) {
                // falls erfolgreich, dann:
                setNewHome(false);
                setDefaultMapStyle(false);
                handleGetUser();
                router.replace(`/user/${user.userName}`);
            } else {
                const err = await rawResponse.json();
                //console.log("backend error", err);
            }
        }
    }

    function handleShowPasswordButton() {
        setPasswordInputType(
            passwordInputType === "password" ? "text" : "password"
        );
    }
    const [showUploader, setShowUploader] = useState(false);

    function handlePictureUploader() {
        if (!showUploader) {
            setShowUploader(true);
        } else {
            setShowUploader(false);
        }
    }

    function handleChangeVisibility(event) {
        const valueVisibility = event.target.value;

        if (valueVisibility === "yes") {
            setIsVisible(true);
        } else if (valueVisibility === "no") {
            setIsVisible(false);
        }
    }

    function handleMapStyleSubmit(event) {
        event.preventDefault();
        newHome ? newHome : setNewHome(user.home);
        defaultMapStyle ? defaultMapStyle : setDefaultMapStyle(user.mapStyle);
        router.replace("/user/setHome");
    }

    return (
        <div className="bg-[url('../public/images/images-register/willian-justen-de-vasconcellos-T_Qe4QlMIvQ-unsplash.webp')] bg-cover min-h-screen flex flex-col">
            {/*  solange user noch nicht geladen ist, wird der PreLoader angezeigt */}
            {!user.userName && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {/* danach kommt dann die eigentliche Seite */}
            {user.userName && (
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form
                        className=" px-6 py-8 text-black w-full"
                        onSubmit={updateUser}
                    >
                        <div className="flex flex-col justify-center w-full mb-8 text-white text-center">
                            <p
                                className="hover:text-[#942928]"
                                onClick={handlePictureUploader}
                            >
                                Add a Picture
                            </p>
                            <div
                                className={
                                    showUploader === true ? "visible" : "hidden"
                                }
                            >
                                <AddProfilePicture />
                            </div>
                        </div>

                        <h1 className="mb-8 text-3xl text-center text-white">
                            EDIT YOUR PROFILE
                        </h1>
                        <label className="text-white">User Name</label>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="userName"
                            placeholder={user.userName}
                            value={formValues.userName}
                            onChange={handleChange}
                        />
                        <p className="text-sm text-red-600 mb-4">
                            {isSubmit && formErrors.userName}
                        </p>
                        <label className="form-label inline-block mb-2 text-white">
                            Your Status
                        </label>
                        <textarea
                            className="
                            px-8 mb-3 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                            bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition
                            ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="status"
                            placeholder="Text"
                            value={formValues.status}
                            onChange={handleChange}
                        ></textarea>
                        <label className="text-white">Email</label>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="email"
                            placeholder={user.email}
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <p className="text-sm text-red-600 mb-4">
                            {isSubmit && formErrors.email}
                        </p>
                        <div className="relative">
                            <input
                                type={passwordInputType}
                                className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                                name="password"
                                placeholder="New Password"
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
                            {isSubmit && formErrors.password}
                        </p>
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="confirm_password"
                            placeholder="Confirm New Password"
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
                        <label className="text-white">City</label>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="city"
                            placeholder={
                                newHome ? newHome.city : user.home.city
                            }
                            value={newHome ? newHome.city : user.home.city}
                            disabled
                        />
                        <p className="text-sm text-red-600 mb-4">
                            {isSubmit && formErrors.city}
                        </p>
                        <label className="text-white">Country</label>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="country"
                            placeholder={
                                newHome ? newHome.country : user.home.country
                            }
                            value={
                                newHome ? newHome.country : user.home.country
                            }
                            disabled
                        />
                        <p className="text-sm text-red-600 mb-4">
                            {isSubmit && formErrors.country}
                        </p>
                        <label className="text-white">Default Map-Style</label>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded-full mb-1 text-black"
                            name="mapStyle"
                            placeholder={
                                defaultMapStyle
                                    ? defaultMapStyle.name
                                    : user.mapStyle.name
                            }
                            value={
                                defaultMapStyle
                                    ? defaultMapStyle.name
                                    : user.mapStyle.name
                            }
                            disabled
                        />
                        <button
                            onClick={handleMapStyleSubmit}
                            className="w-full text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                        >
                            Set Home-Location and Map-Style
                        </button>
                        <div className="flex flex-col ">
                            <label htmlFor="visibility" className="text-white">
                                Visible for other users
                            </label>
                            <select
                                name="visibility"
                                id="visibility"
                                className="border border-grey-light w-full rounded-full p-3 mb-4"
                                onChange={handleChangeVisibility}
                            >
                                <option value="empty">-</option>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                        >
                            Update Account
                        </button>
                        <button
                            type="submit"
                            onClick={() =>
                                router.replace(`/user/${user.userName}`)
                            }
                            className="w-full text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                        >
                            Back
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
