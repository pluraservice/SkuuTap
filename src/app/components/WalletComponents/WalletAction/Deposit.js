import { useEffect, useState } from "react";
import Image from "next/image";
import copyToClipboard from "../../../functions/copyToClipboard/copyToClipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faSearch, faLock } from "@fortawesome/free-solid-svg-icons";
import getUserAddressFromCryptoName from "@/src/app/functions/api/getAddressFromCryptoName";
import { CryptoList } from "@/src/app/data-lists/CryptoList";
import getCryptoIcon from "@/src/app/functions/getCryptoIcon/getCryptoIcon";
import { CryptoNetworks } from "@/src/app/data-lists/CryptoNetworks";

export default function DepositWallet({ userData, setError }) {
    const [cryptoSelezionatedAddress, setCryptoSelezionatedAddress] = useState("");
    const [qrCodeAddress, setQrCodeAddress] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownCrypto, setShowDropdownCrypto] = useState(false);
    const [cryptoSelezionated, setCryptoSelezionated] = useState("BTC");
    const [networkSelezionated, setNetworkSelezionated] = useState("");
    const [questCompletedNumber, setQuestCompletedNumber] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredCryptoList = CryptoList.filter(crypto => crypto.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        const fetchAddress = async () => {
            const userUid = userData.uid;
            if (networkSelezionated) {
                const resGetAddress = await getUserAddressFromCryptoName(userUid, cryptoSelezionated, networkSelezionated);
                if (resGetAddress.result) {
                    setQrCodeAddress(resGetAddress.qrCodeDataURL);
                    if (networkSelezionated === "ERC20" || networkSelezionated === "BSC") {
                        setCryptoSelezionatedAddress("0x" + resGetAddress.address);
                    } else {
                        setCryptoSelezionatedAddress(resGetAddress.address);
                    }
                } else {
                    setError(resGetAddress.error);
                }
            }
        };

        fetchAddress();
        const interval = setInterval(fetchAddress, 1000);
        return () => clearInterval(interval);
    }, [userData, cryptoSelezionated, networkSelezionated]);

    return (
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
                            <div key={crypto} className="flex flex-row gap-2 h-5 rounded-xl justify-center items-center cursor-pointer py-4 p-3" style={{ backgroundColor: "rgb(30, 30, 30)" }} onClick={
                                () => {
                                    setCryptoSelezionated(crypto);
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
                <h1 className="text-2xl font-semibold">Seleziona Rete</h1>
                {questCompletedNumber >= 1 ? (
                    <div className="flex flex-wrap overflow-scroll justify-center items-center h-48 mt-4 gap-3 p-2 rounded-xl" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
                        {Object.values(CryptoNetworks[cryptoSelezionated]).map((item, index) => {
                            return (
                                <div key={index} className="w-full flex flex-row SkuuBit-DefaultContainer cursor-pointer" onClick={() => {
                                    setQuestCompletedNumber(2);
                                    setNetworkSelezionated(item.code)
                                }}>
                                    <div className="w-full whitespace-nowrap">
                                        <p className="text-white font-semibold">{item.code}</p>
                                        <p className="text-white text-sm">{item.name}</p>
                                    </div>
                                    <div className="w-full flex justify-end items-center">
                                        <p className="text-white">{"≈ " + item.time + " Min"}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-xl mt-2 flex flex-col gap-5 justify-center items-center" style={{ height: "150px", backgroundColor: "rgb(30, 30, 30)" }}>
                        <FontAwesomeIcon icon={faLock} className="text-6xl text-white" />
                        <p>Seleziona la Crypto Valuta</p>
                    </div>
                )}
            </div>
            <div className="mt-2 w-full">
                <h1 className="text-2xl font-semibold">Indirizzo di Deposito</h1>
                {questCompletedNumber >= 2 ? (
                    <>
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full flex flex-row flex-phone overflow-scroll gap-4 justify-center items-center mt-5">
                                <h1 className="text-white text-sm">{cryptoSelezionatedAddress}</h1>
                                <FontAwesomeIcon icon={faClipboard} className="CyanColor cursor-pointer hover:text-gray-400" onClick={() => copyToClipboard(cryptoSelezionatedAddress)} />
                            </div>
                            <Image src={qrCodeAddress} width={140} height={100} className="rounded-xl mt-4" />
                        </div>
                    </>
                ) : (
                    <div className="rounded-xl mt-2 flex flex-col gap-5 justify-center items-center" style={{ height: "150px", backgroundColor: "rgb(30, 30, 30)" }}>
                        <FontAwesomeIcon icon={faLock} className="text-6xl text-white" />
                        <p>Seleziona la Rete di Deposito</p>
                    </div>
                )}
            </div>
        </div>
    );
}