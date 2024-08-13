import getAllAddressBalance from "@/src/app/functions/api/getAllAddressBalance";
import { useEffect, useState } from "react";
import axios from "axios";
import OpenTrade from "@/src/app/functions/futuresFunctions/OpenTrade";
import cryptoToUsdt from "@/src/app/functions/crypto/cryptoToUsdt";

export default function LimitBuy({ userData, setError, otherInfo, orderLeverage }) {
    const [rangePercent, setRangePercent] = useState(0);
    const [takeProfitPrice, setTakeProfitPrice] = useState('');
    const [stopLossPrice, setStopLossPrice] = useState('');
    const [cryptoSelezionatedBalance, setCryptoSelezionatedBalance] = useState(0);
    const [cryptoCost, setCryptoCost] = useState(0);
    const [quantityQuery, setQuantityQuery] = useState("");
    const [priceQuery, setPriceQuery] = useState("")
    const [takeProfitChecked, setTakeProfitChecked] = useState(false);
    const [minimunQuantity, setMinimunQuantity] = useState(0);
    const [cryptoSelezionatedUsdtBalance, setCryptoSelezionatedUsdtBalance] = useState(0);
    const [openOrderLoading, setOpenOrderLoading] = useState(false);
    const [showLabel, setShowLabel] = useState({
        price: true,
        quantity: true
    })

    useEffect(() => {
        const fetchCryptoData = async () => {
            const allCryptoBalance = await getAllAddressBalance(userData.uid);
            setCryptoSelezionatedBalance(allCryptoBalance[otherInfo]);
            const getCryptoToUsdtHave = await cryptoToUsdt("BTC", allCryptoBalance[otherInfo]);
            setCryptoSelezionatedUsdtBalance(getCryptoToUsdtHave.toFixed(2));
        }

        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 10000);
        return () => clearInterval(interval);
    }, [otherInfo, userData])

    useEffect(() => {
        const fetchOrderBook = async () => {
            try {
                const tickersUrl = `https://api.bybit.com/v5/market/tickers?category=inverse&symbol=${otherInfo}USDT`;
                const responseTickers = await axios.get(tickersUrl);
                const tickerData = responseTickers.data.result.list.find(ticker => ticker.symbol === `${otherInfo}USDT`);
                if (tickerData) {
                    const newUSDT = parseFloat(tickerData.lastPrice);
                    setCryptoCost(newUSDT);
                }

                const getMinimunQuantity = await cryptoToUsdt("BTC", 0.001);
                setMinimunQuantity(getMinimunQuantity.toFixed(2));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrderBook();
        const intervalId = setInterval(fetchOrderBook, 1000);
        return () => clearInterval(intervalId);
    }, [otherInfo, cryptoCost]);

    return (
        <>
            <div className="w-full h-full SkuuBit-DefaultContainer flex flex-col gap-6 bg-red-500">
                <div className="flex flex-col gap-3">
                    <p className="text-white"><span className="text-gray-400">Disponibile</span> {cryptoSelezionatedBalance} {otherInfo} = {cryptoSelezionatedUsdtBalance} USDT</p>
                    <p className="text-white"><span className="text-gray-400">Quantità Minima</span> {minimunQuantity} USDT</p>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="SkuuBit-Futures-Input-Price" className={"text-gray-400 absolute flex items-center h-12 ms-3 " + (showLabel.price ? "show" : "hidden")}>Prezzo</label>
                        <input type="text" value={priceQuery} onChange={(e) => setPriceQuery(e.target.value)} className="SkuuBit-default-Input" id="SkuuBit-Futures-Input-Price"
                            onFocus={
                                () => setShowLabel((prevInfo) => ({
                                    ...prevInfo,
                                    price: false
                                }))
                            }
                            onBlur={
                                (e) => setShowLabel((prevInfo) => ({
                                    ...prevInfo,
                                    price: e.target.value ? false : true
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="SkuuBit-Futures-Input-Quantity" className={"text-gray-400 absolute flex items-center h-12 ms-3 " + (showLabel.quantity ? "show" : "hidden")}>Quantità</label>
                        <input type="text" value={quantityQuery} onChange={(e) => setQuantityQuery(e.target.value)} className="SkuuBit-default-Input" id="SkuuBit-Futures-Input-Quantity"
                            onFocus={
                                () => setShowLabel((prevInfo) => ({
                                    ...prevInfo,
                                    quantity: false
                                }))
                            }
                            onBlur={
                                (e) => setShowLabel((prevInfo) => ({
                                    ...prevInfo,
                                    quantity: e.target.value ? false : true
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <input type="range" onChange={(e) => setRangePercent(e.target.value)} class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
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
                        <p>{rangePercent}%</p>
                    </div>
                </div>
                <div className="flex flex-row gap-3 justify-center items-center">
                    <input type="checkbox" checked={takeProfitChecked} onClick={() => {
                        if (priceQuery) {
                            if (quantityQuery) {
                                setTakeProfitChecked(!takeProfitChecked);
                            } else {
                                setError("Insert Quantity")
                            }
                        } else {
                            setError("Insert Price")
                        }
                    }} class="accent-cyan-500" />
                    <h1>TP/SL</h1>
                </div>
                {takeProfitChecked ? (
                    <>
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-gray-400">Prezzo</h1>
                                <h1>{priceQuery}</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-gray-400">Quantità</h1>
                                <h1>{quantityQuery}</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-gray-400">Last Traded Price</h1>
                                <h1>{cryptoCost}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="SkuuBit-Futures-Input-TP" className="text-gray-400">Take Profit</label>
                            <input type="text" className="SkuuBit-default-Input w-full" placeholder="USDT Price" onChange={(e) => setTakeProfitPrice(e.target.value)} id="SkuuBit-Futures-Input-TP" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="SkuuBit-Futures-Input-TP" className="text-gray-400">Stop Loss</label>
                            <input type="text" className="SkuuBit-default-Input w-full" placeholder="USDT Price" onChange={(e) => setStopLossPrice(e.target.value)} id="SkuuBit-Futures-Input-TP" />
                        </div>
                    </>
                ) : ""}
                <button className="SkuuBit-BuyButton" onClick={
                    async () => {
                        setOpenOrderLoading(true);
                        const newOrder = await OpenTrade(userData.uid, otherInfo + "USDT", quantityQuery, priceQuery, 'buy', 'limit', 'open', orderLeverage, takeProfitPrice, stopLossPrice);
                        if (newOrder.result) {
                            setOpenOrderLoading(false);
                            setError("Ordine Creato con Successo!");
                        } else {
                            setOpenOrderLoading(false);
                            setError(newOrder.error);
                        }
                    }
                }>
                    <h1 className="text-white">{(openOrderLoading ? "Caricamento..." : "Long")}</h1>
                </button>
            </div>
        </>
    );
}