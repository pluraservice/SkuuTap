"use client";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import decodeBase64 from "../functions/base64/decode";
import encodeBase64 from "../functions/base64/encode";
import getUserHaveEmailVerified from "../functions/api/getUserHaveEmailVerified";
import getUserHaveCopyTrading from "../functions/api/getUserHaveCopyTrading";
import getUserCopyTradingWallet from "../functions/api/getUserCopyTradingWallet";
import Alert from "../components/Alert/Alert";
import createCopyTradingAccount from "../functions/api/createCopyTradingAccount";
import noPhotoUrl from "@/src/app/assets/img/noPhotoURL.png";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import loadingGif from "@/src/app/assets/img/loading.gif";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AllMasterTraderList from "../components/CopyTradingComponents/AllMasterTraderList/AllMasterTraderList";
import CopyTradingOverviewFromUid from "../components/CopyTradingComponents/CopyTradingOverviewFromUid/CopyTradingOverviewFromUid";

export default function CopyTrading() {
    const [userData, setUserData] = useState();
    const [userHaveCopytrading, setUserHaveCopytrading] = useState(false);
    const [copyTradingUserInfo, setCopyTradingUserInfo] = useState();
    const [creatingCopyTradingWallet, setCreatingCopyTradingWallet] = useState(false);
    const [creatingCopyTradingWalletSelectName, setCreatingCopyTradingWalletSelectName] = useState("");
    const [error, setError] = useState("");
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [changePhotoUrlIsLoading, setChangePhotoUrlIsLoading] = useState(false);
    const [creatinCTAccountLoading, setCreatingCTAccountLoading] = useState(false);
    const [createCopyTradingAccountPhotoURL, setCreatingCopyTradingWalletPhotoURL] = useState("");
    const [showCopyTradingUser, setShowCopyTradingUser] = useState(false);
    const [showCTUserUID, setShowCTUserUID] = useState("");

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
                            const userHaveCopytrading = await getUserHaveCopyTrading(userSavedAccountHaveVerifiedEmail.data.uid);
                            if (userHaveCopytrading.result) {
                                setUserHaveCopytrading(userHaveCopytrading.haveCopy);
                                if (userHaveCopytrading.haveCopy) {
                                    const getUserCopyTradingInfo = await getUserCopyTradingWallet(userSavedAccountHaveVerifiedEmail.data.uid);
                                    if (getUserCopyTradingInfo.result) {
                                        setCopyTradingUserInfo(getUserCopyTradingInfo.data);
                                    } else {
                                        setError(getUserCopyTradingInfo.error)
                                    }
                                }
                            } else {
                                setError(userHaveCopytrading.error);
                            }
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
    }, []);

    const changePhotoUrl = async (e) => {
        setChangePhotoUrlIsLoading(true);
        const file = e.target.files[0];
        if (file) {
            const maxSizeInBytes = 1 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                setChangePhotoUrlIsLoading(false);
                setError("Il file è troppo grande. La dimensione massima consentita è 1 MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = async () => {
                setCreatingCopyTradingWalletPhotoURL(reader.result)
                setChangePhotoUrlIsLoading(false);
            };
            reader.onerror = async () => {
                setError("Errore nel Caricamento dell'Immagine, Riprovare")
            }
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {!loadingScreen ? (
                <>
                    <Navbar />

                    {!showCopyTradingUser ? (
                        <>
                            <div className="w-full h-auto flex flex-row flex-phone">
                                <div className="w-full h-auto flex flex-row flex-phone" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                                    <div className="w-full flex flex-col gap-4 justify-center p-10 items-center">
                                        <h1 className="CyanColor text-3xl font-semibold">SkuuBit Copy Trading</h1>
                                        <p className="text-white">Crea il Tuo CopyTrading e Guadagna</p>
                                        {!userHaveCopytrading && !creatingCopyTradingWallet ? (
                                            <button className="px-6 py-2 rounded-xl CyanBackgroundColor text-white" onClick={() => setCreatingCopyTradingWallet(true)}>Crea CopyTrading</button>
                                        ) : ""}
                                    </div>
                                    {creatingCopyTradingWallet ? (
                                        <div className="w-full h-auto flex flex-col justify-center items-center gap-4 p-5">
                                            <div className="w-auto flex flex-row flex-phone phoneFull gap-10 rounded-xl p-4 justify-center items-center bg-black h-auto">
                                                <div className="relative group">
                                                    <Image src={createCopyTradingAccountPhotoURL ? createCopyTradingAccountPhotoURL : noPhotoUrl} width={200} height={200} className="h-24 w-auto rounded-full" />
                                                    {!changePhotoUrlIsLoading ? (
                                                        <div className="w-24 absolute inset-0 cursor-pointer flex flex-col gap-2 justify-center items-center whitespace-nowraè bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <FontAwesomeIcon icon={faImages} className="text-3xl text-white" />
                                                            <span className="text-white text-xs font-semibold">Modifica Foto</span>
                                                            <input type="file" accept="image/*" className="absolute w-full h-full cursor-pointer" style={{ opacity: 0 }} onChange={(e) => changePhotoUrl(e)} />
                                                        </div>
                                                    ) : (
                                                        <div className="absolute inset-0 cursor-pointer flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50 rounded-full">
                                                            <FontAwesomeIcon icon={faSpinner} className="text-3xl text-white" />
                                                            <span className="text-white text-lg font-semibold">Modificando Foto...</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-auto phoneFull flex flex-col gap-4 text-white whitespace-nowrap">
                                                    <label htmlFor="SkuuBit-SelectCopyTradingName">Inserisci il Nome del Tuo CopyTrading</label>
                                                    <input className="SkuuBit-default-Input" id="SkuuBit-SelectCopyTradingName" value={creatingCopyTradingWalletSelectName} onChange={(e) => setCreatingCopyTradingWalletSelectName(e.target.value)} />
                                                </div>
                                                <div className="flex flex-col phoneFull gap-3">
                                                    <button className="rounded-xl whitespace-nowrap p-3 h-auto flex flex-row gap-3 justify-center items-center text-white CyanBackgroundColor" onClick={
                                                        async () => {
                                                            setCreatingCTAccountLoading(true);
                                                            if (creatingCopyTradingWalletSelectName) {
                                                                const createCTAccount = await createCopyTradingAccount(userData.uid, {
                                                                    name: creatingCopyTradingWalletSelectName,
                                                                    photoURL: createCopyTradingAccountPhotoURL
                                                                });

                                                                if (createCTAccount.result) {
                                                                    location.reload();
                                                                } else {
                                                                    setCreatingCTAccountLoading(false);
                                                                    setError(createCTAccount.error);
                                                                }
                                                            } else {
                                                                setCreatingCTAccountLoading(false);
                                                                setError("Inserisci il Nome del Tuo Copy Trading");
                                                            }
                                                        }
                                                    }>
                                                        <FontAwesomeIcon icon={faNewspaper} />
                                                        <p>{(creatinCTAccountLoading ? "Caricamento..." : "Crea CopyTrading")}</p>
                                                    </button>
                                                    <button className="rounded-xl whitespace-nowrap p-3 h-auto flex flex-row gap-3 justify-center items-center text-white bg-red-600" onClick={() => setCreatingCopyTradingWallet(false)}>
                                                        <FontAwesomeIcon icon={faXmark} />
                                                        <p>Annulla</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ""}
                                </div>
                                {userHaveCopytrading ? (
                                    <>
                                        <div className="w-full flex flex-row justify-center p-10 items-center cursor-pointer" style={{ backgroundColor: 'rgb(30, 30, 30)' }} onClick={() => {
                                            setShowCopyTradingUser(true);
                                            setShowCTUserUID(userData.uid);
                                        }}>
                                            <div className="w-auto h-auto bg-black flex flex-col gap-3 rounded-xl p-3">
                                                <div className="flex flex-row gap-2 text-white items-center">
                                                    <h1>My Copy Trading</h1>
                                                    <FontAwesomeIcon icon={faEyeLowVision} />
                                                </div>
                                                <div className="flex flex-row gap-10 text-white">
                                                    <div className="flex flex-col gap-2 justify-center">
                                                        <label htmlFor="lbTassets" className="text-gray-400">Total assets</label>
                                                        <p id="lbTassets">{copyTradingUserInfo.totalAssets} USDT</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 justify-center">
                                                        <label htmlFor="lbCtPL" className="text-gray-400">Copy Trading P&L</label>
                                                        <p id="lbCtPL">{copyTradingUserInfo.copyTradingPL} USDT</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : ""}
                            </div>
                            <div className="w-full flex justify-center items-center p-3 mt-10">
                                <div className="w-9/12 phoneFull h-auto flex flex-col justify-start gap-3">
                                    <div className="flex justify-start">
                                        <h1 className="text-white CyanBackgroundColor px-10 py-3 rounded-xl cursor-pointer">All Master Traders</h1>
                                    </div>
                                    <div className="w-full h-96 overflow-scroll flex flex-col gap-2">
                                        <AllMasterTraderList setError={setError} setShowCopyTradingUser={setShowCopyTradingUser} setShowCTUserUID={setShowCTUserUID} />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <CopyTradingOverviewFromUid uid={showCTUserUID} setError={setError} setShowCopyTradingUser={setShowCopyTradingUser} />
                        </>
                    )}

                    {error && <Alert type="error" message={error} setMessage={setError} />}

                    <Footer />
                </>
            ) : (
                <>
                    <div className="w-full h-screen flex justify-center items-center">
                        <Image src={loadingGif} />
                    </div>
                </>
            )
            }
        </>
    );
}