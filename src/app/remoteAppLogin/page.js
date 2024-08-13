"use client";
import { useEffect, useState, Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import logo from "../assets/img/logo.png";
import loadingGif from "../assets/img/loading.gif";
import Image from "next/image";
import decodeBase64 from "../functions/base64/decode";
import { useSearchParams } from "next/navigation";
import noPhotoUrl from "../assets/img/noPhotoURL.png";
import getOtpCodeIsCorrect from "../functions/api/getOtpCodeIsCorrect";
import Alert from "../components/Alert/Alert";
import newRemoteAppLogin from "../functions/api/newRemoteAppLogin";

function RemoteAppLoginComponent() {
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [otpCodeInserted, setOtpCodeInserted] = useState("");
    const [loginCompleted, setLoginCompleted] = useState(false);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const appName = searchParams.get('appName');
    const sessionId = searchParams.get('sessionId');



    useEffect(() => {
        if (localStorage.getItem("SkuuBit | Account Saved")) {
            const userHaveSavedAccount = JSON.parse(decodeBase64(localStorage.getItem("SkuuBit | Account Saved")));
            setLoadingScreen(false);
            setUserData(userHaveSavedAccount);
        } else {
            window.open("/register", "_self");
        }
    }, [])

    return (
        <>
            {!loadingScreen ? (
                <>
                    <Navbar />

                    <div className="w-full h-full p-10 flex justify-center items-center gap-3">
                        <div className="SkuuBit-RemoteAppLogin flex-phone">
                            <div className="w-auto h-full flex justify-center items-center">
                                <Image src={logo} />
                            </div>
                            <div className="h-full flex justify-center flex-col p-5 SkuuBit-DefaultContainer">
                                {!loginCompleted ? (
                                    <>
                                        <h1 className="font-bold text-3xl">Benvenuto su SkuuBit</h1>
                                        <p className="text-sm text-gray-400 mt-3 text-center">{`Per Accedere a ${appName} con il Tuo Account devi Inserire l'Otp Code che trovi sull'App di Google Authenticator`}</p>
                                        <div className="flex flex-col gap-3 h-auto mt-5 SkuuBit-DefaultContainer">
                                            <h1 className="text-2xl font-semibold">Informazioni Account</h1>
                                            <div className="flex flex-row h-12 gap-3 mt-1">
                                                <Image src={userData.photoURL ? userData.photoURL : noPhotoUrl} width={10} height={10} className="rounded-full h-full w-auto" />
                                                <div className="flex flex-col justify-center overflow-hidden gap-1">
                                                    <h1 className="text-xl">{userData.displayName}</h1>
                                                    <p className="text-sm">{userData.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label htmlFor="SkuuBit-OtpCode">Inserisci l'Otp Code</label>
                                            <div className="flex flex-row items-center flex-phone gap-3">
                                                <input id="SkuuBit-OtpCode" className="SkuuBit-default-Input text-center mt-3" maxLength={6} onChange={(e) => setOtpCodeInserted(e.target.value)} type="text" />
                                                <button className="SkuuBit-Wallet-Settings-DefaultButton mt-3" onClick={
                                                    async () => {
                                                        setIsLoading(true);
                                                        const resOtpCodeIsValid = await getOtpCodeIsCorrect(userData.uid, otpCodeInserted);
                                                        if (resOtpCodeIsValid.result) {
                                                            if (resOtpCodeIsValid.isValidCode) {
                                                                setIsLoading(false);
                                                                const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"))
                                                                const resNewRemoteAppLogin = await newRemoteAppLogin(userData.email, password, sessionId);
                                                                if (resNewRemoteAppLogin.result) {
                                                                    setLoginCompleted(true);
                                                                } else {
                                                                    setError(resNewRemoteAppLogin.error);
                                                                }
                                                            } else {
                                                                setIsLoading(false);
                                                                setError("Otp Code is Not Valid")
                                                            }
                                                        } else {
                                                            setIsLoading(false);
                                                            setError(resOtpCodeIsValid.error)
                                                        }
                                                    }
                                                }>
                                                    <p>{(isLoading ? "Caricamento..." : `Conferma l'Accesso per ${appName}`)}</p>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-3 justify-center items-center text-center">
                                        <svg className="w-24 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h1 className="text-2xl font-semibold">Login per {appName} Completato Correttamente!</h1>
                                        <p className="text-sm text-gray-400">Puoi Chiudere questa Pagina.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

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

export default function RemoteAppLogin() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Image src={loadingGif} /></div>}>
            <RemoteAppLoginComponent />
        </Suspense>
    );
}