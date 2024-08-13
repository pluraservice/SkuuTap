import getAllMasterTraders from "@/src/app/functions/api/getAllMasterTraders";
import { useEffect, useState } from "react";
import Image from "next/image";
import noPhotoURL from "@/src/app/assets/img/noPhotoURL.png";

export default function AllMasterTraderList({ setError, setShowCopyTradingUser, setShowCTUserUID }) {
    const [masterTradersList, setMasterTradersList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const allMTl = await getAllMasterTraders();
            if (allMTl.result) {
                setMasterTradersList(allMTl.data);
            } else {
                setError(allMTl.error)
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {masterTradersList.length > 0 ? (
                <>
                    {masterTradersList.map((item, index) => {
                        return (
                            <>
                                <div key={index} className="w-full h-auto rounded-xl flex flex-row gap-4 px-4 py-4 md:py-1 justify-center items-center flex-phone cursor-pointer" style={{ backgroundColor: 'rgb(30, 30, 30)' }} onClick={
                                    () => {
                                        setShowCopyTradingUser(true);
                                        setShowCTUserUID(item.uid);
                                    }
                                }>
                                    <Image src={item.photoURL !== "noPhotoURL" ? item.photoURL : noPhotoURL} width={200} height={200} className="h-20 w-auto rounded-xl" />
                                    <div className="whitespace-nowrap flex flex-col gap-2 justify-center">
                                        <h1 className="CyanColor text-xl font-semibold">{item.name}</h1>
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                            {item.badge.veteran ? (<span className="items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">Veteran</span>) : ""}
                                            {item.badge.highprofit ? (<span class="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">High Profit</span>) : ""}
                                            {item.badge.highfrequency ? (<span class="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium bg-white/10 text-white">High Frequency</span>) : ""}
                                        </div>
                                    </div>
                                    <div className="w-full h-auto whitespace-nowrap text-white gap-10 bg-black rounded-xl px-6 py-4 flex flex-row flex-phone justify-center items-center text-center">
                                        <div>
                                            <label htmlFor="7dRoi" className="text-gray-400">7d ROI</label>
                                            <p id="7dRoi">{item.weekROI}%</p>
                                        </div>
                                        <div>
                                            <label htmlFor="7dMpnl" className="text-gray-400">7d Master's PnL</label>
                                            <p id="7dMpnl">{item.pnl}%</p>
                                        </div>
                                        <div>
                                            <label htmlFor="7dWrate" className="text-gray-400">7d Win Rate</label>
                                            <p id="7dWrate">{item.winRate}%</p>
                                        </div>
                                        <div>
                                            <label htmlFor="lbFollow" className="text-gray-400">Follower(s)</label>
                                            <p id="lbFollow">{item.followers} / 1000</p>
                                        </div>
                                    </div>
                                    <div className="w-auto phoneFull h-full text-white p-3 flex flex-col gap-2 justify-center items-center">
                                        <h1>Action</h1>
                                        <button className="rounded-xl text-white px-10 py-2 CyanBackgroundColor">Copy</button>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </>
            ) : (
                <>
                    <div className="w-full h-1/2 text-white flex justify-center items-center">
                        <h1 className="text-2xl">Nessun Master Trader Iscritto</h1>
                    </div>
                </>
            )}
        </>
    );
}