"use client";
import Image from "next/image";
import logo from "../assets/img/logo.png";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import loadingGif from "../assets/img/loading.gif";
import decodeBase64 from "../functions/base64/decode";
import encodeBase64 from "../functions/base64/encode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import WalletComponents from "../components/WalletComponents/main";
import Alert from "../components/Alert/Alert";
import getUserHaveEmailVerified from "../functions/api/getUserHaveEmailVerified";
import deleteAccount from "../functions/api/deleteAccount";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Wallet() {
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [userData, setUserData] = useState();
    const [modalitySelezionated, setSelezionatedModality] = useState("Wallet");
    const [error, setError] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [componentsFromPhoneSelezionated, setComponentsFromPhoneSelezionated] = useState(false);

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth <= 1340); };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            if (localStorage.getItem("SkuuBit | Account Saved")) {
                const userHaveSavedAccount = JSON.parse(decodeBase64(localStorage.getItem("SkuuBit | Account Saved")));
                const email = userHaveSavedAccount.email;
                const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"))
                const userSavedAccountIsValid = true;
                if (userSavedAccountIsValid) {
                    const userSavedAccountHaveVerifiedEmail = await getUserHaveEmailVerified(email, password);
                    if (userSavedAccountHaveVerifiedEmail.result) {
                        if (userSavedAccountHaveVerifiedEmail.isVerified) {
                            const userDataBase64 = encodeBase64(JSON.stringify(userSavedAccountHaveVerifiedEmail.data));
                            localStorage.setItem("SkuuBit | Account Saved", userDataBase64);
                            setUserData(userSavedAccountHaveVerifiedEmail.data);
                            document.title = "SkuuBit Wallet | " + userSavedAccountHaveVerifiedEmail.data.displayName
                        } else {
                            window.open("/verifyEmail", "_self");
                        }
                    } else {
                        setError(userSavedAccountHaveVerifiedEmail.error);
                    }
                } else {
                    localStorage.removeItem("SkuuBit | Account Saved");
                    window.open("/register", "_self");
                }
            } else {
                window.open("/register", "_self");
            }
            setLoadingScreen(false);
        }, 1000);
    }, [])

    return (
        <>
            {!loadingScreen ? (
                <>
                    <Navbar />

                    {!isMobile ? (
                        <>
                            <div className="SkuuBit-Wallet">
                                <div className="SkuuBit-Wallet-LateralMenu">
                                    <div className="w-full flex flex-col justify-center items-center gap-3">
                                        <Image src={logo} className="w-64" />
                                    </div>
                                    <div className="w-full h-auto flex flex-col gap-3 mt-5">
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => setSelezionatedModality("Wallet")}>
                                            <FontAwesomeIcon icon={faWallet} className="CyanColor" />
                                            <p>Wallet</p>
                                        </button>
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton">
                                            <FontAwesomeIcon icon={faCircleExclamation} className="CyanColor" />
                                            <p>Movimenti</p>
                                        </button>
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => setSelezionatedModality("WalletSettings")}>
                                            <FontAwesomeIcon icon={faGear} className="CyanColor" />
                                            <p>Impostazioni</p>
                                        </button>
                                        <div className="w-full h-0.5 bg-white mt-3"></div>
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton mt-3" onClick={() => {
                                            localStorage.removeItem("SkuuBit | Account Saved");
                                            localStorage.removeItem("SkuuBit | Account Metadata");
                                            window.open("/", "_self");
                                        }}>
                                            <FontAwesomeIcon icon={faExternalLink} className="text-red-500" />
                                            <p>Disconnettiti</p>
                                        </button>
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={
                                            async () => {
                                                const userHaveSavedAccount = JSON.parse(decodeBase64(localStorage.getItem("SkuuBit | Account Saved")));
                                                const email = userHaveSavedAccount.email;
                                                const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"))
                                                const resDelAc = await deleteAccount(email, password);
                                                if (resDelAc.result) {
                                                    localStorage.removeItem("SkuuBit | Account Saved");
                                                    localStorage.removeItem("SkuuBit | Account Metadata");
                                                    window.open("/", "_self");
                                                }
                                            }
                                        }>
                                            <FontAwesomeIcon icon={faDeleteLeft} className="text-red-500" />
                                            <p>Elimina Account</p>
                                        </button>
                                        <p className="text-white mt-3 text-sm text-center">Created By Onaliskuu and SkuuBit™</p>
                                    </div>
                                </div>
                                {modalitySelezionated ? (
                                    <div className="SkuuBit-Wallet-MainWindow">
                                        <WalletComponents componentName={modalitySelezionated} userData={userData} setError={setError} />
                                    </div>
                                ) : ""}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="SkuuBit-Wallet">
                                <div className="SkuuBit-Wallet-LateralMenu">
                                    {!componentsFromPhoneSelezionated ? (
                                        <>
                                            <div className="w-full flex flex-col justify-center items-center gap-3">
                                                <Image src={logo} className="w-64" />
                                            </div>
                                            <div className="w-full h-auto flex flex-col gap-3 mt-5">
                                                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => {
                                                    setSelezionatedModality("Wallet");
                                                    setComponentsFromPhoneSelezionated(true);
                                                }}>
                                                    <FontAwesomeIcon icon={faWallet} className="CyanColor" />
                                                    <p>Wallet</p>
                                                </button>
                                                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton">
                                                    <FontAwesomeIcon icon={faCircleExclamation} className="CyanColor" />
                                                    <p>Movimenti</p>
                                                </button>
                                                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => {
                                                    setSelezionatedModality("WalletSettings");
                                                    setComponentsFromPhoneSelezionated(true);
                                                }}>
                                                    <FontAwesomeIcon icon={faGear} className="CyanColor" />
                                                    <p>Impostazioni</p>
                                                </button>
                                                <div className="w-full h-0.5 bg-white mt-3"></div>
                                                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton mt-3" onClick={() => {
                                                    localStorage.removeItem("SkuuBit | Account Saved");
                                                    localStorage.removeItem("SkuuBit | Account Metadata");
                                                    window.open("/", "_self");
                                                }}>
                                                    <FontAwesomeIcon icon={faExternalLink} className="text-red-500" />
                                                    <p>Disconnettiti</p>
                                                </button>
                                                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={
                                                    async () => {
                                                        const userHaveSavedAccount = JSON.parse(decodeBase64(localStorage.getItem("SkuuBit | Account Saved")));
                                                        const email = userHaveSavedAccount.email;
                                                        const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"))
                                                        await deleteAccount(email, password);
                                                        if (resDelAc.ok) {
                                                            localStorage.removeItem("SkuuBit | Account Saved");
                                                            localStorage.removeItem("SkuuBit | Account Metadata");
                                                            window.open("/", "_self");
                                                        }
                                                    }
                                                }>
                                                    <FontAwesomeIcon icon={faDeleteLeft} className="text-red-500" />
                                                    <p>Elimina Account</p>
                                                </button>
                                                <p className="text-white mt-3 text-sm text-center">Created By Onaliskuu and SkuuBit™</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {modalitySelezionated ? (
                                                <>
                                                    <div className="flex flex-row items-center gap-2">
                                                        <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
                                                        <p className="text-white cursor-pointer" onClick={() => setComponentsFromPhoneSelezionated(false)}>Indietro</p>
                                                    </div>
                                                    <div className="SkuuBit-Wallet-MainWindow-noBorder">
                                                        <WalletComponents componentName={modalitySelezionated} userData={userData} setError={setError} />
                                                    </div>
                                                </>
                                            ) : ""}
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {error && <Alert type="error" message={error} setMessage={setError} />}

                    <Footer />
                </>
            ) : (
                <div className="w-full h-screen flex justify-center items-center">
                    <Image src={loadingGif} />
                </div>
            )}
        </>
    );
}