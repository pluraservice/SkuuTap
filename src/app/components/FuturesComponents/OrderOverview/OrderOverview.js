"use client";
import GetTradeFromIds from "@/src/app/functions/futuresFunctions/GetTradeFromIds";
import { useEffect, useState } from "react";
import Image from "next/image";
import getCryptoIcon from "@/src/app/functions/getCryptoIcon/getCryptoIcon";

export default function OrderOverview({ userData }) {
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userOrdersFromIds = await GetTradeFromIds(userData.uid);
            setUserOrders(userOrdersFromIds.result ? userOrdersFromIds.orders : []);
        }

        fetchData();
        const inverval = setInterval(fetchData, 1000);
        return () => clearInterval(inverval);
    }, [userData])

    return (
        <>
            <div className="w-full h-full rounded-xl flex flex-col gap-4 overflow-scroll p-3" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
                {userOrders.map((item, index) => {
                    return (
                        <div key={index} className="w-full h-auto rounded-xl text-white">
                            <div className="w-full rounded-xl p-3 flex flex-col gap-4 whitespace-nowrap" style={{ backgroundColor: "rgba(0, 0, 0, 0.459)" }}>
                                <div className="w-full flex flex-row gap-4 flex-phone">
                                    <div className="phoneFull flex flex-col SkuuBit-DefaultContainer justify-center items-center gap-6">
                                        <div className="flex flex-row items-center gap-3">
                                            <Image src={getCryptoIcon(item.symbol.toString().replace("USDT", ""))} className="h-8 w-auto rounded-full" />
                                            <h1 className="font-semibold">{item.symbol} | Numero Ordine: {index + 1} | Id Ordine: {item.orderId}</h1>
                                        </div>
                                        <div className="w-full h-full SkuuBit-DefaultContainer flex flex-wrap justify-center items-center gap-6">
                                            <div>
                                                <label className="text-gray-400">Modalità dell'Ordine</label>
                                                <h1>{item.marginMode.charAt(0).toUpperCase() + item.marginMode.slice(1).toLowerCase()}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Tipologia dell'Ordine</label>
                                                <h1>{item.orderType.charAt(0).toUpperCase() + item.orderType.slice(1).toLowerCase()}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Side dell'Ordine</label>
                                                <h1 className={(item.posSide === "long" ? "text-green-500" : "text-red-500")}>{item.posSide.charAt(0).toUpperCase() + item.posSide.slice(1).toLowerCase()}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Leva</label>
                                                <h1>{item.leverage + "x"}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Commissione</label>
                                                <h1>{item.fee.replace("-", "")}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-auto h-auto phoneFull flex flex-row flex-phone SkuuBit-DefaultContainer gap-3 items-center">
                                        <div className="w-auto phoneFull SkuuBit-DefaultContainer flex flex-col gap-3">
                                            <div>
                                                <label className="text-gray-400">Posizione</label>
                                                <h1>{item.size}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">ROI</label>
                                                <h1>{"1%"}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Commissione</label>
                                                <h1>{item.fee.replace("-", "")}</h1>
                                            </div>
                                        </div>
                                        <div className="w-auto phoneFull SkuuBit-DefaultContainer flex flex-col gap-3">
                                            <div>
                                                <label className="text-gray-400">Prezzo Medio</label>
                                                <h1>{item.priceAvg}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Prezzo Giusto</label>
                                                <h1>{"1%"}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Margine</label>
                                                <h1>{item.baseVolume}</h1>
                                            </div>
                                        </div>
                                        <div className="w-auto phoneFull SkuuBit-DefaultContainer flex flex-col gap-3">
                                            <div>
                                                <label className="text-gray-400">TP/SL</label>
                                                <h1><span className="text-green-500">{item.presetStopSurplusPrice ? item.presetStopSurplusPrice : "--"}</span> / <span className="text-red-500">{item.presetStopLossPrice ? item.presetStopLossPrice : "--"}</span></h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">ROI</label>
                                                <h1>{"1%"}</h1>
                                            </div>
                                            <div>
                                                <label className="text-gray-400">Commissione</label>
                                                <h1>{item.fee.replace("-", "")}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-row items-center SkuuBit-DefaultContainer">
                                    <div className="w-full flex flex-col gap-2">
                                        <h1 className="text-gray-400 text-xl font-semibold">Profitto</h1>
                                        <h1 className="text-3xl font-semibold">{item.totalProfits} USDT</h1>
                                    </div>
                                    <div className="w-full flex justify-end items-center">
                                        <h1 className="text-gray-400 font-semibold">Il Profitto viene Visualizzato Solo Dopo Aver Superato la Commisione</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}