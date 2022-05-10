export default function DiaryMask() {
    return (
        <div className="bg-[url('../public/images/images-diary/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg')] bg-cover min-h-screen flex flex-col">
            <div className="flex flex-col items-center">
                <h3 className="text-white mt-3">CREATE YOUR DIARY ENTRY </h3>
                <div className="flex w-1/2 mt-3">
                    <div className="flex w-2/3 flex-wrap">
                        <label className="text-white">
                            AUTHOR
                            <input
                                type="text"
                                className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                name="userName"
                                placeholder="user"
                                value=""
                            />
                        </label>
                        <label className="text-white">
                            TITLE
                            <input
                                type="text"
                                className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                name="title"
                                placeholder="title"
                                value=""
                            />
                        </label>
                        <label className="text-white">
                            DATE
                            <input
                                type="text"
                                className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                name="date"
                                placeholder="day"
                                value=""
                            />
                        </label>
                        <label className="text-white">
                            SELECT A TRIP
                            <input
                                type="text"
                                className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                name="date"
                                placeholder="trip"
                                value=""
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
                                value=""
                            />
                            <input
                                type="text"
                                className="block border border-grey-light w-1/2 rounded-lg mb-1 text-black"
                                name="location"
                                placeholder="location"
                                value=""
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
                                    {/* {accountPhoto ? (
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
                                )} */}
                                </div>
                                <input
                                    type="file"
                                    className="opacity-0"
                                    // onChange={(event) => {
                                    //     setAvatarUrl(event.target.files[0]);
                                    // }}
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
                    ></textarea>
                </label>
                <div className="flex flex-wrap justify-center">
                    <form
                        action="/file-upload"
                        className="dropzone border-white solid-2 text-white flex flex-col items-center"
                    >
                        <span className="text-white">IMAGES UPLOADER</span>
                        <div className="fallback hover:bg-[#942928]">
                            {" "}
                            <input name="file" type="file" multiple />{" "}
                        </div>
                        {/* <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            Drop files here or click to upload.
                        </div>
                    </div> */}
                    </form>
                    <div className="flex flex-wrap">
                        <button
                            type="submit"
                            className="p-3 text-center rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
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
        </div>
    );
}
