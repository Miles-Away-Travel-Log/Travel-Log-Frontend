import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar.jsx";
import Image from "next/image";
import avatar from "../public/images/images-register/avatar.svg";
import { useAppData } from "../Context/DataStorage.js";

export default function Login() {
    const router = useRouter();

    const {
        setUserId,
        setSeedMoney,
        setUser,
        setHomeCurrency,
        setList_Friends_FriendRequests,
    } = useAppData();

    async function submit(e) {
        e.preventDefault();
        const rawResponse = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_USER + "/login",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: e.target.username.value,
                    password: e.target.password.value,
                }),
            }
        );

        if (rawResponse.status === 200) {
            const data = await rawResponse.json();
            sessionStorage.token = data.token;
            Cookies.set(
                "token",
                data.token,
                { expires: 1 },
                { sameSite: "none" }
            );
            Cookies.set(
                "user",
                data.user.id,
                { expires: 1 },
                { sameSite: "none" }
            );
            setUser(data.user);
            setUserId(data.user.id);
            setSeedMoney(data.user.seedMoney);
            setList_Friends_FriendRequests(data.user.friends);
            router.replace("/user/landingPageUser");
        } else {
            alert("Invalid login credentials");
        }
    }

    return (
        <div className="bg-[url('../public/images/images-login/pawel-czerwinski-6lQDFGOB1iw-unsplash.jpg')] bg-cover min-h-screen">
            <form
                className="r px-8 pt-6 pb-8 mb-4 flex flex-col text-[30px] max-w-sm mx-auto"
                onSubmit={submit}
            >
                <div className="flex justify-center w-full mb-8">
                    <Image src={avatar} alt="Avatar" width={100} height={100} />
                </div>
                <h1 className="mb-8 text-3xl text-center text-white">
                    MEMBER LOGIN
                </h1>

                <div className="mb-4">
                    <label
                        className="block text-white text-sm font-bold mb-2 "
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded-full w-full px-3 text-grey-darker"
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded-full w-full px-3 text-grey-darker mb-3"
                        id="password"
                        type="password"
                        placeholder="******************"
                        name="password"
                    />
                    <p className="text-white text-xs italic">
                        Please choose a password.
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-[#90A5A9] hover:bg-[#C4C4C4] text-white font-bold px-4 rounded-full"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
            <Navbar />
        </div>
    );
}
