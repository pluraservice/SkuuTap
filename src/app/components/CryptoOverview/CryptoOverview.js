"use client";
import Image from "next/image";
import getCryptoIcon from "../../functions/getCryptoIcon/getCryptoIcon";
import { useState, useEffect } from "react";
import { MOverviewList } from "../../data-lists/MOverviewList";

export default function CryptoOverview() {
    const [cryptoSelectedForInfo, setCryptoSelectedForInfo] = useState("");

    useEffect(() => {
        if (cryptoSelectedForInfo) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                "autosize": true,
                "symbol": cryptoSelectedForInfo === "USDT" ? "COINBASE:USDTUSD" : `BINANCE:${cryptoSelectedForInfo}`,
                "interval": "1",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "it",
                "hide_legend": true,
                "hide_side_toolbar": false,
                "allow_symbol_change": false,
                "save_image": false,
                "calendar": false,
                "support_host": "https://www.tradingview.com"
            });
            document.getElementById(`tradingview-charts-${cryptoSelectedForInfo}`).appendChild(script);

            return () => {
                if (document.getElementById(`tradingview-charts-${cryptoSelectedForInfo}`)) {
                    document.getElementById(`tradingview-charts-${cryptoSelectedForInfo}`).innerHTML = "";
                }
            };
        }
    }, [cryptoSelectedForInfo]);

    useEffect(() => {
        if (cryptoSelectedForInfo) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
            script.async = true;
            script.innerHTML = JSON.stringify({
                "symbol": cryptoSelectedForInfo === "USDT" ? "COINBASE:USDTUSD" : `BINANCE:${cryptoSelectedForInfo}`,
                "width": "100%",
                "locale": "it",
                "colorTheme": "dark",
                "isTransparent": true
            });
            document.getElementById(`tradingview-info-${cryptoSelectedForInfo}`).appendChild(script);

            return () => {
                if (document.getElementById(`tradingview-info-${cryptoSelectedForInfo}`)) {
                    document.getElementById(`tradingview-info-${cryptoSelectedForInfo}`).innerHTML = "";
                }
            };
        }
    }, [cryptoSelectedForInfo]);

    return (
        <div className="w-full">
            {MOverviewList.map((cryptoName) => {
                return (
                    <div key={cryptoName} className="SkuuBit-SymbolOverviewContainer">
                        <div className="w-full flex flex-row">
                            <div className="w-auto flex flex-row gap-4 items-center">
                                <Image src={getCryptoIcon(cryptoName !== "USDT" ? cryptoName.replace("USDT", "") : cryptoName)} width={50} height={50} alt={`${cryptoName} icon`} />
                                <p className="font-semibold">{cryptoName !== "USDT" ? cryptoName.replace("USDT", "/USDT") : cryptoName}</p>
                            </div>
                            <div className="w-full h-auto flex justify-end items-center">
                                <svg className="w-6 h-6 cursor-pointer" onClick={() => setCryptoSelectedForInfo(cryptoName)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                                </svg>
                            </div>
                        </div>
                        {cryptoSelectedForInfo === cryptoName && (
                            <>
                                <div className="w-full flex flex-col gap-4" style={{ height: "1300px" }}>
                                    <div id={`tradingview-charts-${cryptoName}`} className="tradingview-widget-container">
                                        <div className="tradingview-widget-container__widget"></div>
                                    </div>
                                    <div id={`tradingview-info-${cryptoName}`} className="tradingview-widget-container">
                                        <div className="tradingview-widget-container__widget"></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
