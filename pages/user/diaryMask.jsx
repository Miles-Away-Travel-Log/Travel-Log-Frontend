import { useRouter } from "next/router";
import { useState } from "react";
import Axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

export default function DiaryMask() {
    const router = useRouter();
    const [imagesUrl, setImagesUrl] = useState([]);
    const [titleImageUrl, setTitleImageUrl] = useState("");
    const [textData, setTextData] = useState("");
    const [date, setDate] = useState("");
    const [diaryName, setDiaryName] = useState("");
    const [author, setAuthor] = useState("");
    const [titleImageFromCloud, setTitleImageFromCloud] = useState("");
    const[imagesFromCloud, setImagesFromCloud] = useState([])

    async function uploadDiaryEntry(e) {
        e.preventDefault();
        const formDataTitleImage = new FormData();
        formDataTitleImage.append("file", titleImageUrl);
        formDataTitleImage.append("upload_preset", "pvsqrbgk");

        Axios.post(
            "https://api.cloudinary.com/v1_1/milesaway/image/upload",
            formDataTitleImage
        ).then((response) => {
            setTitleImageFromCloud(response.data.url);
        });

        const formDataImages = new FormData();
        formDataImages.append("file", imagesUrl);
        formDataImages.append("upload_preset", "pvsqrbgk");

        Axios.post(
            "https://api.cloudinary.com/v1_1/milesaway/image/upload",
            formDataImages
        )
        .then((response) => {
            setImagesFromCloud(response.data.url);
        });

        // setIsSubmit(true);
        // if (Object.keys(registerFormErrors).length === 0) {
            // user erstellen
            const rawResponse = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_DIARY,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                    body: JSON.stringify({
                        author: author,
                        diaryName: diaryName,
                        date: date,
                        description: textData,
                        visible: false,
                        images: imagesFromCloud,
                        titleImage: titleImageFromCloud,
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
                router.replace("/user/diary");
            } else {
                const err = await rawResponse.json();
                console.log("backend error", err);
            }
        // }
    }

    return (
        <div className="bg-[url('../public/images/images-diary/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg')] bg-cover min-h-screen flex flex-col">
            <form>
                <div className="flex flex-col items-center">
                    <h3 className="text-white mt-3">
                        CREATE YOUR DIARY ENTRY
                    </h3>

                    <div className="flex w-1/2 mt-3">
                        <div className="flex w-2/3 flex-wrap">
                            <label className="text-white">
                                AUTHOR
                                <input
                                    type="text"
                                    className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                    name="userName"
                                    placeholder="user"
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </label>
                            <label className="text-white">
                                TITLE
                                <input
                                    type="text"
                                    className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                    name="title"
                                    placeholder="title"
                                    onChange={(e) =>
                                        setDiaryName(e.target.value)
                                    }
                                />
                            </label>
                            <label className="text-white">
                                DATE
                                <input
                                    type="text"
                                    className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                    name="date"
                                    placeholder="day"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="flex w-1/3 ">
                            <label className="text-white flex flex-col items-end">
                                LOCATION
                                <input
                                    type="text"
                                    className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                    name="location"
                                    placeholder="location"
                                    // value=""
                                />
                                <input
                                    type="text"
                                    className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                    name="location"
                                    placeholder="location"
                                    // value=""
                                />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-xl shadow-xl bg-gray-50 w-1/2 mt-3 mb-3">
                        <div className="m-4">
                            <label className="inline-block mb-2 text-gray-500">
                                UPLOAD TITLE-IMAGE(jpg,png,svg,jpeg)
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center">
                                        {/* {titleImageUrl ? (
                                            <Image
                                                className="m-3 rounded-lg bg-cover"
                                                src={titleImageUrl}
                                                alt="Title Image"
                                                width={"100vw"}
                                                height={"20vh"}
                                            />
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                // onClick={uploadImage()}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )} */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                // onClick={uploadImage()}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                    </div>
                                    <input
                                        type="file"
                                        className="opacity-0"
                                        onChange={(event) => {
                                            setTitleImageUrl(
                                                event.target.files[0]
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <label className="block text-left w-1/2 mb-3">
                        <span className="text-white">TEXTAREA</span>
                        <textarea
                            className="form-textarea mt-1 block w-full rounded-lg p-2 text-black"
                            rows="10"
                            placeholder="Enter your story."
                            // value={entryFormValues.description}
                            onChange={(e) => setTextData(e.target.value)}
                        ></textarea>
                    </label>
                    <div className="flex flex-wrap justify-center">
                        <div
                            action="/file-upload"
                            className="dropzone border-white solid-2 text-white flex flex-col items-center"
                        >
                            <span className="text-white">IMAGES UPLOADER</span>
                            <div className="fallback hover:bg-[#942928]">
                                <input
                                    name="file"
                                    type="file"
                                    multiple
                                    onChange={(e) =>
                                        setImagesUrl(e.target.files)
                                    }
                                />
                            </div>
                            {/* <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            Drop files here or click to upload.
                        </div>
                    </div> */}
                        </div>
                        <div className="flex flex-wrap">
                            <button
                                type="submit"
                                className="p-3 text-center rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                                onClick={uploadDiaryEntry}
                            >
                                Create
                            </button>
                            <button
                                type="submit"
                                onClick={() =>
                                    router.replace(`/user/${user.userName}`)
                                }
                                className="pl-5 pr-5 ml-3 text-center rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
