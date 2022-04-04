import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
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
            router.replace("/landingPageUser");
        } else {
            alert("Invalid login credentials");
        }
    }

    return (
        <form
            className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col text-[30px]"
            onSubmit={submit}
        >
            <div className="mb-4">
                <label
                    className="block text-grey-darker text-sm font-bold mb-2 text-[30px]"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="username"
                    type="text"
                    placeholder="Username"
                    name="username"
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                    id="password"
                    type="password"
                    placeholder="******************"
                    name="password"
                />
                <p className="text-red text-xs italic">
                    Please choose a password.
                </p>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}
