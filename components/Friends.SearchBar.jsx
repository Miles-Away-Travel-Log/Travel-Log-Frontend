import React from "react";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useAppData } from "../Context/DataStorage.js";

function SearchBar() {
    const { addToFriends } = useAppData();

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
        <div className="flex flex-col justify-center items-center w-full">
            <form className="flex border-2 rounded-lg text-sm mr-[27px] mt-2">
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
                <div className=" mt-1 w-full">
                    <div className="border-2 rounded-lg text-sm w-[200px] ml-12">
                        {searchStringFriends.slice(0, 10).map((user) => {
                            return (
                                <p
                                    key={user.id}
                                    className="pl-2 cursor-pointer"
                                    onClick={() => addToFriends(user.id)}
                                >
                                    {user.userName}
                                </p>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* ::webkit-scrollbar */}
        </div>
    );
}

export default SearchBar;
