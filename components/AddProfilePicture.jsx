import { useRouter } from "next/router";
import { useState } from "react";
import { useAppData } from "../Context/DataStorage.js";
import Axios from "axios";
import Image from "next/image";

export default function AddProfilePicture() {
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState("");
    const { accountPhoto, setAccountPhoto } = useAppData();

    function uploadImage() {
        const formData = new FormData();
        formData.append("file", avatarUrl);
        formData.append("upload_preset", "pvsqrbgk");

        Axios.post(
            "https://api.cloudinary.com/v1_1/milesaway/image/upload",
            formData
        ).then((response) => {
            setAccountPhoto(response.data.url);
        });
    }

    return (
        <div className="flex justify-center mt-8">
            <div className="rounded-xl shadow-xl bg-gray-50 lg">
                <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">
                        Upload Image(jpg,png,svg,jpeg)
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center">
                                {accountPhoto ? (
                                    <Image
                                        className="p-4 mb-3 rounded-full shadow-lg"
                                        src={accountPhoto}
                                        alt="User Image"
                                        width={100}
                                        height={100}
                                    />
                                ) : (
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
                                        <p className="pt-1 mb-2 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                            Select a photo
                                        </p>
                                    </svg>
                                )}
                            </div>
                            <input
                                type="file"
                                className="opacity-0"
                                onChange={(event) => {
                                    setAvatarUrl(event.target.files[0]);
                                }}
                            />
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
                        onClick={uploadImage}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
