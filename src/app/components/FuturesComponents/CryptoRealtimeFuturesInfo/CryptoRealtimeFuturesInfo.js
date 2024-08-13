import { useState, useEffect } from "react";
import axios from 'axios';
import CryptoDropdown from "../../CryptoDropdown/CryptoDropdown";
import Image from "next/image";
import getCryptoIcon from "@/src/app/functions/getCryptoIcon/getCryptoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function CryptoRealtimeFuturesInfo({ cryptoSelezionated, setCryptoSelezionated }) {
    const [cryptoCost, setCryptoCost] = useState({ USDT: 0, EUR: 0 });
    const [newCryptoCost, setNewCryptoCost] = useState({ USDT: 0, EUR: 0, type: "" });
    const [dailyInfo, setDailyInfo] = useState({
        change24h: 0,
        high24h: 0,
        low24h: 0,
        volume24h: 0
    });

    useEffect(() => {
        const fetchOrderBook = async () => {
            try {
                const tickersUrl = `https://api.bybit.com/v5/market/tickers?category=inverse&symbol=${cryptoSelezionated}USDT`;
                const responseTickers = await axios.get(tickersUrl);
                const tickerData = responseTickers.data.result.list.find(ticker => ticker.symbol === `${cryptoSelezionated}USDT`);
                if (tickerData) {
                    const newUSDT = parseFloat(tickerData.lastPrice);
                    const newEUR = parseFloat(tickerData.lastPrice);
                    const newType = cryptoCost.USDT > newUSDT ? "NEG" : "POS";
                    const change24h = parseFloat(tickerData.lastPrice) - parseFloat(tickerData.prevPrice24h);
                    const high24h = parseFloat(tickerData.highPrice24h);
                    const low24h = parseFloat(tickerData.lowPrice24h);
                    const volume24h = parseFloat(tickerData.volume24h);
                    setNewCryptoCost({ USDT: newUSDT, EUR: newEUR, type: newType });
                    setCryptoCost({ USDT: newUSDT, EUR: newEUR });
                    setDailyInfo({
                        change24h,
                        high24h,
                        low24h,
                        volume24h
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrderBook();
        const intervalId = setInterval(fetchOrderBook, 72000);
        return () => clearInterval(intervalId);
    }, [cryptoSelezionated, cryptoCost]);

    return (
        <div className="w-full h-auto flex flex-col gap-7 SkuuBit-DefaultContainer">
            <div className="flex flex-row gap-2 items-center">
                <div className="w-1/2 flex flex-row gap-3 items-center">
                    <Image src={getCryptoIcon(cryptoSelezionated)} className="h-12 w-auto rounded-full" />
                    <h1 className="text-white font-semibold text-xl">{cryptoSelezionated + "USDT"}</h1>
                </div>
                <div className="w-1/2 flex flex-col gap-2 justify-end">
                    <div className="flex flex-row gap-2 items-center justify-end">
                        <h1 className={"font-semibold " + (newCryptoCost.type === "POS" ? "text-green-500" : "text-red-500")}>{newCryptoCost.USDT}</h1>
                        {newCryptoCost.type === "POS" ? (
                            <FontAwesomeIcon icon={faArrowUp} className='text-green-400' />
                        ) : (
                            <FontAwesomeIcon icon={faArrowDown} className='text-red-500' />
                        )}
                    </div>
                    <div className="flex items-center justify-end">
                        <p className='text-gray-400 text-sm'>{"€ " + newCryptoCost.EUR}</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-auto SkuuBit-DefaultContainer">
                <h1 className="font-semibold text-xl">Informazioni Giornaliere</h1>
                <div className="flex flex-wrap items-center gap-4 text-center justify-center p-4">
                    <div>
                        <h1 className="text-gray-400">Variazione 24H</h1>
                        <p className={`text-sm ${dailyInfo.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{dailyInfo.change24h.toFixed(2) + " " + "(" + ((dailyInfo.change24h / cryptoCost.USDT) * 100).toFixed(2) + " %)"}</p>
                    </div>
                    <div>
                        <h1 className="text-gray-400">Massimo 24H</h1>
                        <p className="text-sm text-green-400">{dailyInfo.high24h.toFixed(2)}</p>
                    </div>
                    <div>
                        <h1 className="text-gray-400">Minimo 24H</h1>
                        <p className="text-sm text-red-400">{dailyInfo.low24h.toFixed(2)}</p>
                    </div>
                    <div>
                        <h1 className="text-gray-400">Volume 24H</h1>
                        <p className="text-sm text-gray-400">{dailyInfo.volume24h.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <CryptoDropdown setCryptoSelezionated={setCryptoSelezionated} cryptoSelezionated={cryptoSelezionated} />
        </div>
    );
}
