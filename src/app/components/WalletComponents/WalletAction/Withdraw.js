import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faLock } from "@fortawesome/free-solid-svg-icons";
import { CryptoList } from "@/src/app/data-lists/CryptoList";
import getCryptoIcon from "@/src/app/functions/getCryptoIcon/getCryptoIcon";
import { useEffect } from "react";
import getAllAddressBalance from "@/src/app/functions/api/getAllAddressBalance";
import getNetworkNameFromAddressString from "@/src/app/functions/crypto/getNetworkNameFromAddressString";
import createNewTransactionFromData from "@/src/app/functions/api/createNewTransactionFromData";

export default function Withdraw({ userData, setError }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownCrypto, setShowDropdownCrypto] = useState(false);
    const [cryptoSelezionated, setCryptoSelezionated] = useState("BTC");
    const [questCompletedNumber, setQuestCompletedNumber] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [cryptoSelezionatedBalance, setCryptoSelezionatedBalance] = useState(0);
    const [addressQueryNetwork, setAddressQueryNetwork] = useState("");
    const filteredCryptoList = CryptoList.filter(crypto => crypto.toLowerCase().includes(searchQuery.toLowerCase()));
    const [isLoading, setIsLoading] = useState(false)
    const [withdrawInfo, setWithdrawInfo] = useState({
        address: "",
        amount: 0,
        uid: "",
        cryptoName: ""
    })

    useEffect(() => {
        const fetchCryptoData = async () => {
            const allCryptoBalance = await getAllAddressBalance(userData.uid);
            setCryptoSelezionatedBalance(allCryptoBalance[cryptoSelezionated]);
        }

        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 10000);
        return () => clearInterval(interval);
    }, [cryptoSelezionated, userData])

    return (
        <div className="w-full flex flex-row gap-3 flex-phone justify-center items-center">
            <div className="w-full h-auto flex flex-row flex-phone justify-center items-center gap-10">
                <div className="mt-4 w-full">
                    <h1 className="text-2xl font-semibold">Seleziona Crypto</h1>
                    <div className="flex flex-col justify-center w-auto">
                        <div className="flex flex-col justify-center">
                            <input className="SkuuBit-default-Input mt-5" style={{ zIndex: 1 }} value={searchQuery} onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }} onFocus={() => {
                                setShowDropdown(true);
                                setShowDropdownCrypto(true);
                            }} onBlur={() => setShowDropdown(false)} />
                            <div className={"absolute flex flex-row justify-center items-center gap-2 text-gray-400 mt-5 ms-5 " + (showDropdown ? "hidden" : "show")} style={{ zIndex: 2, pointerEvents: "none" }}>
                                <FontAwesomeIcon icon={faSearch} />
                                <p>Cerca Crypto</p>
                            </div>
                        </div>
                        <div className={"SkuuBit-Deposit-CryptoList mt-4 " + (showDropdownCrypto ? "show flex" : "hidden")}>
                            {filteredCryptoList.map((value, index) => (
                                <div
                                    key={index}
                                    className="w-full text-white h-auto flex flex-row gap-3"
                                    onClick={() => {
                                        setCryptoSelezionated(value);
                                        setQuestCompletedNumber(1);
                                        setSearchQuery("");
                                        setShowDropdownCrypto(false);
                                    }}
                                >
                                    <Image src={getCryptoIcon(value)} width={25} className="rounded-full" alt={`${value} icon`} />
                                    <p>{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row gap-2 mt-3 overflow-scroll">
                            {['BTC', 'ETH', 'BNB', 'USDT', 'USDC'].map((crypto) => (
                                <div key={crypto} className="flex flex-row gap-2 h-5 rounded-xl justify-center items-center cursor-pointer py-4 px-5" style={{ backgroundColor: "rgb(30, 30, 30)" }} onClick={
                                    () => {
                                        setCryptoSelezionated(crypto);
                                        setWithdrawInfo((prevInfo) => ({
                                            ...prevInfo,
                                            uid: userData.uid,
                                            cryptoName: crypto
                                        }))
                                        setQuestCompletedNumber(1);
                                    }
                                }>
                                    <Image src={getCryptoIcon(crypto)} className="w-5 rounded-full" alt={`${crypto} icon`} />
                                    <p>{crypto}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-2 w-full">
                    <h1 className="text-2xl font-semibold">Informazioni e Conferma</h1>
                    {questCompletedNumber >= 1 ? (
                        <>
                            <div className="w-full flex flex-col justify-center gap-3 mt-3 items-center">
                                <div className="w-full flex flex-col justify-center items-center gap-3">
                                    <div style={{ backgroundColor: 'rgb(40, 40, 40)' }} className="w-full p-3 rounded-xl flex flex-col h-auto gap-3">
                                        <div className="flex flex-row gap-2 justify-center items-center">
                                            <Image src={getCryptoIcon(cryptoSelezionated)} width={25} className="h-full w-auto rounded-full" />
                                            <div className="w-full flex flex-col justify-center">
                                                <h1>{cryptoSelezionated}</h1>
                                                <h1>{"Disponibile: " + cryptoSelezionatedBalance}</h1>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-2 justify-center items-center">
                                            <div className="w-full flex flex-col justify-center">
                                                <h1>Rete Indirizzo</h1>
                                                <h1 className="text-sm text-gray-300">{addressQueryNetwork === "" ? "Inserisci l'Indirizzo" : addressQueryNetwork ? addressQueryNetwork : "l'Indirizzo Inserito non è Compatibile con Le Reti Supportate"}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1 flex gap-2 flex-col w-full">
                                    <input placeholder="Inserisci l'Indirizzo" className="SkuuBit-default-Input" onChange={
                                        (e) => {
                                            if (e.target.value) {
                                                const getAddressNetwork = getNetworkNameFromAddressString(e.target.value);
                                                setAddressQueryNetwork(getAddressNetwork);
                                                setWithdrawInfo((prevInfo) => ({
                                                    ...prevInfo,
                                                    address: e.target.value
                                                }))
                                            } else {
                                                setAddressQueryNetwork("");
                                            }
                                        }
                                    } />
                                    <div className="flex flex-row w-full gap-3 justify-center items-center">
                                        <input placeholder="Inserisci l'Importo" className="SkuuBit-default-Input" onChange={(e) => {
                                            setWithdrawInfo((prevInfo) => ({
                                                ...prevInfo,
                                                amount: e.target.value
                                            }))
                                        }} />
                                        <button className="SkuuBit-Wallet-LateralMenu-DefaultButton-noPadding" onClick={
                                            async () => {
                                                setIsLoading(true);
                                                const newTransaction = await createNewTransactionFromData(addressQueryNetwork, withdrawInfo);
                                                if (newTransaction.result) {
                                                    setIsLoading(false);
                                                    console.log(newTransaction.txId);
                                                } else {
                                                    setIsLoading(false);
                                                    setError(newTransaction.error);
                                                }
                                            }
                                        }>{(isLoading ? "Caricamento..." : "Conferma e Invia")}</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-xl mt-2 flex flex-col gap-5 justify-center items-center" style={{ height: "150px", backgroundColor: "rgb(30, 30, 30)" }}>
                            <FontAwesomeIcon icon={faLock} className="text-6xl text-white" />
                            <p>Seleziona la Crypto</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}