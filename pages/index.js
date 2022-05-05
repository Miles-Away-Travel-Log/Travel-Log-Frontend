import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useAppData } from "../Context/DataStorage.js";

export default function Home() {
    const router = useRouter();

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
            <div className={styles.landingpageContainerAbout}>
                <div className={styles.landingpageAboutText}>
                    ARE YOU GOING ON A TRIP ?<br></br>
                    <p>
                        <b>miles away</b> is exactly the right thing for you
                        Record your most beautiful experiences in a diary and
                        share them with your friends or with the whole wide
                        world. With <b>miles away</b> you can always keep an eye
                        on your budget as well as your experiences.
                    </p>
                </div>
                <div className={styles.landingpageContainerGlobe}>
                    <div className={styles.landingpageGlobe}>
                        <img src="./images/images-landingpage/logo.svg" />
                    </div>
                </div>
                {!user ? (
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
                                className="bg-[#90A5A9] hover:bg-[#C4C4C4] text-white font-bold py-2 px-4 rounded-full"
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
                            className="bg-[#90A5A9] hover:bg-[#C4C4C4] text-white font-bold py-2 px-4 rounded-full"
                        >
                            My profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
