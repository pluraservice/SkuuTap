import { useState } from "react";
import getCryptoIcon from "../../functions/getCryptoIcon/getCryptoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CryptoList } from "../../data-lists/CryptoList";
import Image from "next/image";

export default function CryptoDropDown({ setCryptoSelezionated, cryptoSelezionated }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div>
            <button className="SkuuBit-Wallet-LateralMenu-DefaultButton-noPadding" onClick={() => setShowDropdown(!showDropdown)}>
                <Image src={getCryptoIcon(cryptoSelezionated)} width={20} className="rounded-full" />
                <p>{cryptoSelezionated}</p>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className={"SkuuBit-Wallet-CryptoDropDown " + (showDropdown ? "show flex flex-col gap-3" : "hidden")}>
                {CryptoList.map((value, index) => {
                    return (
                        <div key={index} className="w-full text-white h-auto flex flex-row gap-3" onClick={
                            () => {
                                setShowDropdown(false)
                                setCryptoSelezionated(value)
                            }
                        }>
                            <Image src={getCryptoIcon(value)} width={25} className="rounded-full" />
                            <p>{value}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}