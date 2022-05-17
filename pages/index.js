import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useAppData } from "../Context/DataStorage.js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const [isCookie, setIsCookie] = useState(false);

    useEffect(() => {
        if (Cookies.get("token")) {
            setIsCookie(true);
        }
    }, []);

    const { user } = useAppData();

    function switchToRegister() {
        router.replace("/register");
    }
    function switchToLogin() {
        router.replace("/login");
    }
    function switchToMenu() {
        router.replace("/menu");
    }

    return (
        <div className={styles.landingpageContainer}>
            <img src="./images/images-landingpage/dan-freeman-wAn4RfmXtxU-unsplash.webp" />
            <div className={styles.landingpageContainerLogo}>
                <div className={styles.landingpageLogo}>
                    <img src="./images/images-landingpage/logo.svg" />
                </div>
            </div>
            <div className="bg-[#c4c4c4] text-white m-3 rounded-lg h-min-screen">
                {/* <div> */}
                    <h1 className="text-6xl text-center mt-3 pt-12">
                        WELCOME TO MILES AWAY
                    </h1>
                    <div className="text-center text-2xl mt-6 flex flex-col items-center w-full">
                        <h2>ARE YOU GOING ON A TRIP ?</h2>
                        <br></br>
                        <div className="text-center w-3/4">
                            <b>miles away</b> is exactly the right thing for
                            you! Record your most beautiful experiences in a
                            diary and share them with your friends or with the
                            whole wide world. With <b>miles away</b> you can
                            always keep an eye on your budget as well as your
                            experiences.
                        </div>
                    </div>
                {/* </div> */}
                <div className={styles.landingpageContainerGlobe}>
                    <div className={styles.landingpageGlobe}>
                        <img src="./images/images-landingpage/logo.svg" />
                    </div>
                </div>
                {!isCookie ? (
                    <div>
                        <div className={styles.landingpageContainerButton}>
                            <button
                                onClick={switchToRegister}
                                className="bg-[#90A5A9] hover:bg-[#C4C4C4] text-white font-bold py-2 px-4 rounded-full"
                            >
                                REGISTER NOW
                            </button>
                        </div>
                        <div className={styles.landingpageContainerButtonLogin}>
                            <button
                                onClick={switchToLogin}
                                className="bg-[#90A5A9] hover:bg-[#C4C4C4] text-white font-bold py-2 px-4 rounded-full mb-3"
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.landingpageContainerButtonLogin}>
                        <button
                            onClick={() =>
                                router.replace(`/user/${user.userName}`)
                            }
                            className="bg-[#90A5A9] hover:bg-[#C4C4C4] text-white font-bold py-2 px-4 rounded-full mb-3"
                        >
                            My profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
