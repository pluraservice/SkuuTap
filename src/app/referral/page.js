"use client";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import decodeBase64 from "../functions/base64/decode";
import encodeBase64 from "../functions/base64/encode";
import getUserHaveEmailVerified from "../functions/api/getUserHaveEmailVerified";
import Alert from "../components/Alert/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import copyToClipboard from "../functions/copyToClipboard/copyToClipboard";
import getUserReferrals from "../functions/api/getUserReferrals";
import loginAccount from "../functions/api/loginAccount";
import Image from "next/image";
import loadingGif from "../assets/img/loading.gif";
import noPhotoURL from "../assets/img/noPhotoURL.png";
import { removeReferral } from "../functions/api/removeReferral";

export default function Referral() {
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [error, setError] = useState("");
    const [referralURL, setReferralURL] = useState("");
    const [userData, setUserData] = useState();
    const [referralsData, setReferralsData] = useState([]);

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
                            setReferralURL(`https://www.skuubit.com/register?refCode=${userSavedAccountHaveVerifiedEmail.data.uid}`);
                            document.title = "SkuuBit Referral | " + userSavedAccountHaveVerifiedEmail.data.displayName + " | Referral Code: " + userSavedAccountHaveVerifiedEmail.data.uid
                            const referrals = await getUserReferrals(userSavedAccountHaveVerifiedEmail.data.uid);
                            let referralDataArray = [];
                            await Promise.all(
                                Object.values(referrals).map((item) => {
                                    if (item) {
                                        return Promise.all(Object.values(item).map(async (itemUid) => {
                                            const getUserInfo = await loginAccount(itemUid.email, itemUid.password);
                                            referralDataArray.push(getUserInfo.data);
                                        }));
                                    }
                                })
                            );
                            setReferralsData(referralDataArray);
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

                    <div className="w-full h-auto flex flex-col gap-4 justify-center items-center p-4">
                        <div className="w-full flex flex-row flex-phone gap-4">
                            <div className="w-full h-auto p-3 rounded-xl" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                                <div className="w-full p-3">
                                    <h1 className="text-white font-semibold text-xl">Account Overview</h1>
                                </div>
                                <div className="w-full flex flex-row px-3 py-2">
                                    <div className="w-full">
                                        <label className="text-gray-400">Clients Trading Volume</label>
                                        <p className="text-4xl text-white">0 <span className="text-sm text-gray-400">USDT</span></p>
                                    </div>
                                    <div className="w-full">
                                        <label className="text-gray-400">Clients who Traded</label>
                                        <p className="text-4xl text-white">0</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-auto p-3 rounded-xl" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                                <div className="w-full p-3">
                                    <h1 className="text-white font-semibold text-xl">Account Balance</h1>
                                </div>
                                <div className="w-full flex flex-row px-3 py-2">
                                    <div className="w-full">
                                        <p className="text-7xl text-white">0<span className="text-xl ms-2 text-gray-400">USDT</span></p>
                                    </div>
                                    <div className="w-full flex justify-end items-center">
                                        <button className="CyanBackgroundColor text-white rounded-xl px-10 py-3">Withdraw</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row flex-phone gap-4">
                            <div className="w-full h-auto p-3 rounded-xl" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                                <div className="w-full p-3">
                                    <h1 className="text-white font-semibold text-xl">My Promotion Tools</h1>
                                </div>
                                <div className="w-full flex flex-row px-3 py-2">
                                    <div className="w-full flex flex-row gap-3 items-center">
                                        <p className="text-white">{referralURL}</p>
                                        <FontAwesomeIcon icon={faClipboard} className="CyanColor hover:text-gray-400" onClick={() => copyToClipboard(referralURL)} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-auto p-3 rounded-xl" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                                <div className="w-full p-3">
                                    <h1 className="text-white font-semibold text-xl">My Commission Tier</h1>
                                </div>
                                <div className="w-full flex flex-col gap-2 px-3 py-2 text-white">
                                    <h1>Profits From Your Clients' Trades: 1%</h1>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto p-3 rounded-xl" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                            <div className="w-full p-3">
                                <h1 className="text-white font-semibold text-xl">Recent SignUps</h1>
                            </div>
                            <div className="w-full flex flex-col gap-2 px-3 py-2 text-white">
                                {referralsData.length > 0 ? (
                                    referralsData.map((item, index) => (
                                        <div key={index} className="w-full h-auto bg-black rounded-xl p-3 flex flex-phone flex-row gap-5 items-center">
                                            <Image src={item.photoURL ? item.photoURL : noPhotoURL} width={100} height={100} className="h-16 w-auto rounded-xl" />
                                            <div className="flex flex-col gap-1">
                                                <h1 className="text-xl font-semibold CyanColor">{item.displayName}</h1>
                                                <p>{item.email}</p>
                                            </div>
                                            <div className="w-full flex flex-phone justify-end items-center" onClick={
                                                async () => {
                                                    const remRefPromise = await removeReferral(userData.uid, item.uid);
                                                    if (remRefPromise.result) {
                                                        location.reload();
                                                    } else {
                                                        setError(remRefPromise.error);
                                                    }
                                                }
                                            }>
                                                <button className="py-3 px-6 rounded-xl" style={{ boxShadow: '0px 0px 0px 1.2px red' }}>
                                                    Rimuovi
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full flex justify-center items-center">
                                        No SignUps
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