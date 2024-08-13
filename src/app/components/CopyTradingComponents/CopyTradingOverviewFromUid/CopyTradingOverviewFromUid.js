import { useEffect, useState } from "react";
import Image from "next/image";
import noPhotoURL from "@/src/app/assets/img/noPhotoURL.png";
import getUserCopyTradingWallet from "@/src/app/functions/api/getUserCopyTradingWallet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import daysBetweenDates from "@/src/app/functions/date/daysBetweenDates";

export default function CopyTradingOverviewFromUid({ uid, setError, setShowCopyTradingUser }) {
    const [userCTInfo, setUserCTInfo] = useState();
    const [loadingScreen, setLoadingScreen] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const userCTWallet = await getUserCopyTradingWallet(uid);
            if (userCTWallet.result) {
                setUserCTInfo(userCTWallet.data);
                console.log(userCTWallet.data)
            } else {
                setError(userCTWallet.error);
            }
            setLoadingScreen(false);
        }

        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {!loadingScreen ? (
                <div className="w-full h-auto p-5">
                    <h1 className="text-white flex flex-row gap-2 items-center cursor-pointer" onClick={() => setShowCopyTradingUser(false)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <p>Indietro</p>
                    </h1>
                    <div className="w-full flex flex-row flex-phone gap-5 justify-center items-center">
                        <Image src={userCTInfo.photoURL !== "noPhotoURL" ? userCTInfo.photoURL : noPhotoURL} width={200} height={200} className="rounded-full w-48" />
                        <div className="flex flex-col gap-5">
                            <h1 className="text-white text-2xl">{userCTInfo.name}</h1>
                            <div className="flex flex-row gap-3">
                                <div style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="p-3 rounded-xl">
                                    <label className="text-gray-400">Follower(s)</label>
                                    <p className="text-white">{userCTInfo.followers}</p>
                                </div>
                                <div style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="p-3 rounded-xl">
                                    <label className="text-gray-400">Trading Days</label>
                                    <p className="text-white">{daysBetweenDates(userCTInfo.creationDate)}</p>
                                </div>
                                <button className="p-3 rounded-xl text-white CyanBackgroundColor">Copy</button>
                            </div>
                            <div className="flex flex-row gap-3">
                                <div style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="p-3 flex gap-3 rounded-xl">
                                    <label className="text-gray-400">AUM</label>
                                    <p className="text-white">0 USDT</p>
                                </div>
                                <div style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="p-3 flex gap-3 rounded-xl">
                                    <label className="text-gray-400">Total Assets</label>
                                    <p className="text-white">{userCTInfo.totalAssets} USDT</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2">
                                {userCTInfo.badge.veteran ? (<span className="items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">Veteran</span>) : ""}
                                {userCTInfo.badge.highprofit ? (<span class="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">High Profit</span>) : ""}
                                {userCTInfo.badge.highfrequency ? (<span class="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-white/10 text-white">High Frequency</span>) : ""}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row flex-phone gap-10 mt-8 p-3">
                        <div className="w-3/12 phoneFull rounded-xl text-white p-3" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                            <div className="w-full h-auto border-b p-3 flex flex-row justify-center items-center">
                                <div className="w-full">
                                    <h1>Performance</h1>
                                </div>
                                <div className="w-full flex justify-end items-center">
                                    <select className="rounded-lg bg-black text-white">
                                        <option>7 Days</option>
                                        <option>30 Days</option>
                                        <option>90 Days</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full h-auto flex flex-col gap-3 py-5 px-2">
                                <div className="flex flex-row">
                                    <div className="w-full">
                                        <label className="text-gray-400">ROI</label>
                                        <p>{userCTInfo.weekROI}</p>
                                    </div>
                                    <div className="w-full flex flex-col justify-end items-end">
                                        <label className="text-gray-400">Master's PnL</label>
                                        <p>{userCTInfo.pnl}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full">
                                        <label className="text-gray-400">Win Rate</label>
                                        <p>{userCTInfo.winRate}</p>
                                    </div>
                                    <div className="w-full flex flex-col justify-end items-end">
                                        <label className="text-gray-400">Followers' PnL</label>
                                        <p>0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full rounded-xl text-white" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>

                        </div>
                    </div>
                </div>
            ) : ""}
        </>
    );
}