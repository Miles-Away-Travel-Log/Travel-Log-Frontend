import { useRouter } from "next/router";
import Image from 'next/image';
import avatar from "../public/images/images-register/avatar.svg"

export default function Register() {
    const router = useRouter();
    async function registerUser(e) {
        e.preventDefault();

        // passwort mit confirm passwort vergleichen
        if (e.target.password.value !== e.target.confirm_password.value) {
            alert("Passwords do not match");
            return;
        }

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
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                    userName: e.target.userName.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    city: e.target.city.value,
                    country: e.target.country.value,
                }),
            }
        );

        if (rawResponse.status === 201) {
            // falls erfolgreich, dann login
            router.replace("/login");
        } else {
            console.error("failed");
        }
    }
    return (
        <div className="bg-[url('../public/images/images-register/mado-el-khouly-MA8YoAoKpfY-unsplash.jpg')] bg-cover min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form
                    className=" px-6 py-8 text-white w-full"
                    onSubmit={registerUser}
                >
                    <div className="flex justify-center w-full">
                   <Image
                    src={avatar} alt="Avatar" width={100} height={100}
                   />
                   
                    </div>
                   

                    <h1 className="mb-8 text-3xl text-center">CREATE ACCOUNT</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="firstName"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="lastName"
                        placeholder="Last Name"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="userName"
                        placeholder="User Name"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="city"
                        placeholder="City"
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded-full mb-4"
                        name="country"
                        placeholder="Country"
                    />
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    >
                        Create Account
                    </button>

                    <div className="text-center text-sm text-grey-dark mt-4">
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

                <div className="text-white mt-6">
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
