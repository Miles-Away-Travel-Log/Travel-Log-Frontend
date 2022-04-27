import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppData } from "../Context/DataStorage.js";
import Cookies from "js-cookie";

export default function AddProfilePicture() {
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState("");
    const { user, userId } = useAppData();

    useEffect(() => {
        console.log("state", avatarUrl);
    }, [avatarUrl]);

    function handlePictureUpload() {
        const url =
            "https://api.cloudinary.com/v1_1/milesaway/image/upload?upload_preset=pvsqrbgk";
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const files = document.querySelector("[type=file]").files;
            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append("file", file);
                formData.append(
                    "upload_preset",
                    "docs_upload_example_us_preset"
                );
                fetch(url, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        setAvatarUrl(JSON.parse(data).url);
                        console.log(data);
                    });
            }
        });
        console.log("test1");
    }

    async function updateUser() {
        console.log("avatarUrl", avatarUrl);
        const rawResponse = await fetch(
            `${process.env.NEXT_PUBLIC_FETCH_URL_USER}/${userId}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify({
                    // firstName: formValues.firstName,
                    // lastName: formValues.lastName,
                    // userName: formValues.userName,
                    // email: formValues.email,
                    // password: formValues.password,
                    // city: formValues.city,
                    // country: formValues.country,
                    // status: formValues.status,
                    avatar: avatarUrl,
                }),
            }
        );

        if (rawResponse.status === 200) {
            // falls erfolgreich, dann:
            router.push("/user/landingPageUser");
        } else {
            const err = await rawResponse.json();
            console.log("backend error", err);
        }
        console.log("test2");
    }
    //     useEffect(() => {
    //    updateUser()
    //     }, [handlePictureUpload]);

    console.log("addProfilePicture", user);

    return (
        <div className="flex justify-center mt-8">
            <div className="rounded-xl shadow-xl bg-gray-50 lg">
                <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">
                        Upload Image(jpg,png,svg,jpeg)
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Select a photo
                                </p>
                            </div>
                            <input type="file" className="opacity-0" />
                        </label>
                    </div>
                </div>

                <div className="flex justify-center p-2 space-x-4">
                    <button
                        className="px-4 py-2 text-white bg-[#942928] rounded-full shadow-xl"
                        onClick={() => router.replace("/user/landingPageUser")}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-[#90A5A9] rounded-full shadow-xl"
                        onClick={() => {
                            handlePictureUpload();
                        }}
                        type="submit"
                    >
                        Create
                    </button>

                    <button
                        className="px-4 py-2 text-white bg-[#90A5A9] rounded-full shadow-xl"
                        onClick={() => {
                            updateUser();
                        }}
                        type="submit"
                    >
                        test
                    </button>
                </div>
            </div>
        </div>
    );
}
