"use client";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import WalletComponents from "../main";
import CryptoDropDown from "../../CryptoDropdown/CryptoDropdown";
import getAllAddressBalance from "@/src/app/functions/api/getAllAddressBalance";
import { CryptoList } from "@/src/app/data-lists/CryptoList";
import Image from "next/image";
import getCryptoIcon from "@/src/app/functions/getCryptoIcon/getCryptoIcon";
import { loadMoonPay } from "@moonpay/moonpay-js";

export default function WalletCP({ userData, setError }) {
    const [cryptoSelezionated, setCryptoSelezionated] = useState("BTC");
    const [actionSelezionated, setActionSelezionated] = useState("");
    const [selectedCryptoBalance, setSelectedCryptoBalance] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [EurCalcolated, setEurCalcolated] = useState(0);
    const [allCryptoBalanceList, setAllCryptoBalanceList] = useState([]);
    const [allCryptoBalanceListEurCalcolated, setAllCryptoBalanceListEurCalcolated] = useState([]);

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth <= 1340); };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const allCryptoBalance = await getAllAddressBalance(userData.uid);
            const selectedCryptoBalance = allCryptoBalance[cryptoSelezionated];
            setAllCryptoBalanceList(allCryptoBalance);
            setSelectedCryptoBalance(selectedCryptoBalance);
            const resEurCalcolated = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoSelezionated}&tsyms=EUR`, { headers: { 'Authorization': `Apikey 7036280cb6da6b128646839ff38de688964bcbf414644d0a398ac6c93319c7da` } })
            const data = await resEurCalcolated.json();
            setEurCalcolated(data.EUR * selectedCryptoBalance);
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [userData, cryptoSelezionated]);

    useEffect(() => {
        const fetchData = async () => {
            CryptoList.map(async (item, index) => {
                const allCryptoBalance = await getAllAddressBalance(userData.uid);
                const selectedCryptoBalance = allCryptoBalance[item];
                const resEurCalcolated = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${item}&tsyms=EUR`, { headers: { 'Authorization': `Apikey 7036280cb6da6b128646839ff38de688964bcbf414644d0a398ac6c93319c7da` } })
                const data = await resEurCalcolated.json();
                setAllCryptoBalanceListEurCalcolated((prevState) => ({
                    ...prevState,
                    [item]: data.EUR * selectedCryptoBalance
                }))
            })
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [userData, cryptoSelezionated]);

    return (
        <div className="flex flex-col gap-4">
            <div className="SkuuBit-WalletCP-Balance h-auto">
                <div className="flex flex-col gap-3">
                    <p>Total Balance</p>
                    <div className="flex md:flex-row flex-wrap gap-3 items-center">
                        <h2 className={"font-semibold truncate " + (isMobile ? "text-4xl" : "text-6xl")}>{selectedCryptoBalance}</h2>
                        <CryptoDropDown setCryptoSelezionated={setCryptoSelezionated} cryptoSelezionated={cryptoSelezionated} />
                    </div>
                    <p className="text-gray-400">{"≈ " + EurCalcolated.toFixed(2) + " EURO"}</p>
                </div>
            </div>

            <div className="SkuuBit-WalletCP-Balance h-auto">
                <div className="flex flex-row flex-phone gap-3 w-full">
                    {CryptoList.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-row gap-3 SkuuBit-DefaultContainer w-full">
                                <Image src={getCryptoIcon(item)} className="h-6 w-auto rounded-full" />
                                <div className="flex flex-col pr-5 truncate">
                                    <h1>{item}</h1>
                                    <p className="text-xl font-semibold">{allCryptoBalanceList[item] ? allCryptoBalanceList[item] : 0}</p>
                                    {allCryptoBalanceListEurCalcolated[item] ? (
                                        <p className="text-gray-400">{"≈ " + allCryptoBalanceListEurCalcolated[item].toFixed(2) + " EURO"}</p>
                                    ) : ""}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="SkuuBit-WalletCP-Balance-DivButtons h-16">
                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => { setActionSelezionated("DepositWallet") }}>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="CyanColor" />
                    <p>Deposita</p>
                </button>
                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={async () => {
                    const moonPay = await loadMoonPay();
                    moonPay({
                        flow: 'buy',
                        environment: 'sandbox',
                        variant: 'overlay',
                        params: {
                            apiKey: 'pk_test_6qGPKWMbREh65JHnmTIJ9k088DyOSh2',
                            theme: 'dark',
                            baseCurrencyCode: 'eur',
                            baseCurrencyAmount: '10',
                            defaultCurrencyCode: 'btc',
                            email: userData.email,
                        }
                    }).show()
                }}>
                    <FontAwesomeIcon icon={faCreditCard} className="CyanColor" />
                    <p>Compra</p>
                </button>
                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => { setActionSelezionated("Withdraw") }}>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="CyanColor" />
                    <p>Preleva</p>
                </button>
                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={() => { setActionSelezionated("Transfer") }}>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="CyanColor" />
                    <p>Trasferisci</p>
                </button>
                <button className="SkuuBit-Wallet-LateralMenu-DefaultButton" onClick={async () => {
                    const moonPay = await loadMoonPay();
                    moonPay({
                        flow: 'sell',
                        environment: 'sandbox',
                        variant: 'overlay',
                        params: {
                            apiKey: 'pk_test_6qGPKWMbREh65JHnmTIJ9k088DyOSh2',
                            theme: 'dark',
                            baseCurrencyAmount: '10',
                            defaultCurrencyCode: 'eur',
                            email: userData.email,
                        }
                    }).show()
                }}>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} className="CyanColor" />
                    <p>Crypto a Euro</p>
                </button>
            </div>

            {actionSelezionated ? (
                <div className="SkuuBit-WalletCP-Balance">
                    <WalletComponents componentName={actionSelezionated} userData={userData} setError={setError} />
                </div>
            ) : ""}
        </div>
    );
}