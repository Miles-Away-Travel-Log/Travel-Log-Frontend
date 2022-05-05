import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();
    function switchToFrontPage() {
        router.replace("/");
    }

    return (
        <div className="h-screen w-screen bg-[url('../public/images/images-404/404-cat.webp')] bg-cover min-h-screen">
            <h1
                className="text-center text-6xl text-red-700 font-bold pt-[0.75em]"
                style={{ textShadow: `2px 2px 3px black` }}
            >
                404 - Page Not Found
            </h1>
            <div className="mt-[3.2em] flex justify-center">
                <button
                    onClick={switchToFrontPage}
                    className="bg-[#e7e7e7] hover:bg-[#C4C4C4] text-black font-bold text-2xl py-3 px-6 rounded-full"
                >
                    Back to Frontpage
                </button>
            </div>
        </div>
    );
}
