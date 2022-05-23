import React from "react";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useAppData } from "../Context/DataStorage.js";

function SearchBar() {
    const { handleGetUser, userId } = useAppData();

    const [searchStringFriends, setSearchStringFriends] = useState([]);
    const [filteredDataUsers, setFilteredDataUsers] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_FETCH_URL_USER)
            .then((res) => res.json())
            .then((data) => {
                setFilteredDataUsers(data.users);
            });
    }, []);

    async function sendFriendRequest(id) {
        const rawResponse = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_FRIEND,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sentRequest: userId,
                    receivedRequest: id,
                    status: false,
                }),
            }
        );
        if (rawResponse.status === 200) {
            handleGetUser();
            setSearchStringFriends([]);
            setWordEntered("");
        }
    }

    function handleChangeSearchBar(event) {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = filteredDataUsers.filter((user) => {
            return user.userName
                .toLowerCase()
                .includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setSearchStringFriends([]);
        } else {
            setSearchStringFriends(newFilter);
        }
    }

    function handleDeleteSearchWord(event) {
        event.preventDefault();
        setSearchStringFriends([]);
        setWordEntered("");
    }

    return (
        <div className="flex flex-col justify-center items-center w-full mt-3 relative">
            <form className="flex border-2 rounded-lg text-sm mr-[27px] mt-2 relative">
                <input
                    type="text"
                    className="px-4 py-2 w-[200px]"
                    placeholder="Search..."
                    name="searchBar"
                    onChange={handleChangeSearchBar}
                    value={wordEntered}
                />
                <button
                    className="flex items-center justify-center px-4"
                    htmlFor="searchBar"
                >
                    {searchStringFriends.length === 0 ? (
                        <BsSearch className="text-[18px]" />
                    ) : (
                        <AiOutlineClose
                            className="text-[18px]"
                            onClick={handleDeleteSearchWord}
                        />
                    )}
                </button>
            </form>

            {searchStringFriends.length != 0 && (
                <div className=" mt-1 w-full lg:flex lg:justify-center absolute z-10 top-[98%] left-[0%]">
                    <div className="scrollbarHidden border-2 rounded-lg text-sm w-[200px] ml-12 overflow-hidden lg:ml-[-80px] bg-white">
                        {searchStringFriends.slice(0, 10).map((user) => {
                            return (
                                <p
                                    key={user.id}
                                    className="pl-2 cursor-pointer hover:bg-[#C4C4C4] hover:text-white"
                                    onClick={() => sendFriendRequest(user.id)}
                                >
                                    {user.userName}
                                </p>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
