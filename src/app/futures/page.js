"use client";
import Image from "next/image";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Chart from "../components/FuturesComponents/Chart/Chart";
import OrderBook from "../components/FuturesComponents/OrderBook/OrderBook"
import CryptoRealtimeFuturesInfo from "../components/FuturesComponents/CryptoRealtimeFuturesInfo/CryptoRealtimeFuturesInfo";
import { useState, useEffect } from "react";
import Alert from "../components/Alert/Alert";
import FuturesBuySellComponents from "../components/FuturesComponents/FuturesBuySellComponents/main";
import loadingGif from "../assets/img/loading.gif";
import decodeBase64 from "../functions/base64/decode";
import getUserHaveEmailVerified from "../functions/api/getUserHaveEmailVerified";
import encodeBase64 from "../functions/base64/encode";
import OrderOverview from "../components/FuturesComponents/OrderOverview/OrderOverview";

export default function Futures() {
    const [cryptoSelezionated, setCryptoSelezionated] = useState("BTC");
    const [error, setError] = useState("");
    const [userData, setUserData] = useState();
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [selectedSide, setSelectedSide] = useState("Limit");
    const [orderCategory, setOrderCategory] = useState("Isolated");
    const [orderLeverage, setOrderLeverage] = useState(1);
    const [leverageShowContainer, setLeverageShowContainer] = useState(false);

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

                    <div className="w-full h-auto flex flex-row flex-phone justify-center gap-6 p-6">
                        <div className="flex flex-col w-10/12 phoneFull h-full gap-3">
                            <Chart cryptoSelezionated={cryptoSelezionated} />
                            <OrderOverview userData={userData} />
                        </div>
                        <div className="flex flex-row flex-phone gap-4">
                            <div className="flex flex-col flex-phone gap-3 w-full">
                                <CryptoRealtimeFuturesInfo setCryptoSelezionated={setCryptoSelezionated} cryptoSelezionated={cryptoSelezionated} />
                                <OrderBook cryptoSelezionated={cryptoSelezionated} />
                            </div>
                            <div className="flex flex-col flex-phone w-full gap-3">
                                <div className="w-full h-auto flex flex-col gap-4 items-center SkuuBit-DefaultContainer-noPadding p-3">
                                    <div className="w-full flex flex-row gap-2 justify-center items-center">
                                        <select id="baseSelector" value={orderCategory} onChange={(e) => setOrderCategory(e.target.value)} className='rounded-xl' style={{ backgroundColor: "rgb(30, 30, 30)", padding: "5px" }}>
                                            <option value={"Isolated"}>Isolated</option>
                                            <option value={"Cross"}>Cross</option>
                                        </select>
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton-noPadding" onClick={() => setLeverageShowContainer(!leverageShowContainer)}>
                                            Leverage {orderLeverage}x
                                        </button>
                                    </div>
                                    {leverageShowContainer ? (
                                        <>
                                            <div className="w-full p-3">
                                                <h1>Order Leverage</h1>
                                                <div className="flex flex-row gap-4 mt-2">
                                                    <input type="range" min={0} max={125} onChange={(e) => setOrderLeverage(e.target.value)} class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                                                    [&::-webkit-slider-thumb]:w-2.5
                                                    [&::-webkit-slider-thumb]:h-2.5
                                                    [&::-webkit-slider-thumb]:-mt-0.5
                                                    [&::-webkit-slider-thumb]:appearance-none
                                                    [&::-webkit-slider-thumb]:bg-white
                                                    [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(0,255,255,1)]
                                                    [&::-webkit-slider-thumb]:rounded-full
                                                    [&::-webkit-slider-thumb]:transition-all
                                                    [&::-webkit-slider-thumb]:duration-150
                                                    [&::-webkit-slider-thumb]:ease-in-out
                                                    [&::-webkit-slider-thumb]:dark:bg-neutral-700

                                                    [&::-moz-range-thumb]:w-2.5
                                                    [&::-moz-range-thumb]:h-2.5
                                                    [&::-moz-range-thumb]:appearance-none
                                                    [&::-moz-range-thumb]:bg-white
                                                    [&::-moz-range-thumb]:border-4
                                                    [&::-moz-range-thumb]:border-blue-600
                                                    [&::-moz-range-thumb]:rounded-full
                                                    [&::-moz-range-thumb]:transition-all
                                                    [&::-moz-range-thumb]:duration-150
                                                    [&::-moz-range-thumb]:ease-in-out

                                                    [&::-webkit-slider-runnable-track]:w-full
                                                    [&::-webkit-slider-runnable-track]:h-2
                                                    [&::-webkit-slider-runnable-track]:bg-gray-100
                                                    [&::-webkit-slider-runnable-track]:rounded-full
                                                    [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

                                                    [&::-moz-range-track]:w-full
                                                    [&::-moz-range-track]:h-2
                                                    [&::-moz-range-track]:bg-gray-100
                                                    [&::-moz-range-track]:rounded-full" id="basic-range-slider-usage" />
                                                    <div className="w-12 rounded-full text-white flex justify-center items-center px-10" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
                                                        <p>{orderLeverage}x</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : ""}
                                    <div className="w-full gap-2 flex justify-center items-center">
                                        <button style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="w-full px-10 py-1 rounded-xl">
                                            <h1 className={(selectedSide === "Limit" ? "CyanColor" : "text-white")} onClick={() => setSelectedSide("Limit")}>Limit</h1>
                                        </button>
                                        <button style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="w-full px-10 py-1 rounded-xl">
                                            <h1 className={(selectedSide === "Market" ? "CyanColor" : "text-white")} onClick={() => setSelectedSide("Market")}>Market</h1>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <FuturesBuySellComponents componentName={selectedSide + "Buy"} userData={userData} setError={setError} otherInfo={cryptoSelezionated} orderLeverage={orderLeverage} />
                                </div>
                                <div className="w-full">
                                    <FuturesBuySellComponents componentName={selectedSide + "Sell"} userData={userData} setError={setError} otherInfo={cryptoSelezionated} orderLeverage={orderLeverage} />
                                </div>
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