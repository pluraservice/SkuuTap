"use client";
import Image from "next/image";
import logo from "../../assets/img/logo.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import decodeBase64 from "../../functions/base64/decode";
import noPhotoUrl from "../../assets/img/noPhotoURL.png";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [DropdownWalletShow, setDropdownWalletShow] = useState(false);
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth <= 1340); };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, []);

    useEffect(() => {
        if (localStorage.getItem("SkuuBit | Account Saved")) {
            const userHaveSavedAccount = JSON.parse(decodeBase64(localStorage.getItem("SkuuBit | Account Saved")));
            if (userHaveSavedAccount) {
                setUserData(userHaveSavedAccount);
            } else {
                setUserData(null);
            }
        }
    }, [setUserData]);

    return (
        <>
            <div className="SkuuBit-Navbar">
                <div className="SkuuBit-Navbar-ContainerOne">
                    <Image src={logo} />
                    <div className="SkuuBit-NavItem">
                        <p className="SkuuBit-NavItem-Text" onClick={() => window.open("/", "_self")}>Home</p>
                        <p className="SkuuBit-NavItem-Wallet SkuuBit-NavItem-Text" onClick={() => setDropdownWalletShow(!DropdownWalletShow)}>
                            Wallet
                            <div className={`SkuuBit-Navbar-Dropdown-Content-Wallet ${DropdownWalletShow ? 'visible' : ''}`} onMouseLeave={() => { setDropdownWalletShow(!DropdownWalletShow) }}>
                                <button className="SkuuBit-Navbar-DropdownWallet-Spot" onClick={() => window.open("/spot", "_self")}>
                                    <FontAwesomeIcon className="SkuuBit-DropdownButtonIcon" icon={faCircleDollarToSlot} style={{ color: "#00badb" }} />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">Spot</p>
                                        <p>Acquista e Vendi Crypto</p>
                                    </div>
                                </button>
                                <button className="SkuuBit-Navbar-DropdownWallet-Wallet" onClick={() => window.open("/futures", "_self")}>
                                    <FontAwesomeIcon className="SkuuBit-DropdownButtonIcon" icon={faCircleDollarToSlot} style={{ color: "#00badb" }} />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">Futures USDT-M</p>
                                        <p>Futures in USDT</p>
                                    </div>
                                </button>
                                <button className="SkuuBit-Navbar-DropdownWallet-Wallet" onClick={() => window.open("/wallet", "_self")}>
                                    <FontAwesomeIcon className="SkuuBit-DropdownButtonIcon" icon={faWallet} style={{ color: "#00badb" }} />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">Wallet</p>
                                        <p>Controlla il Tuo Wallet</p>
                                    </div>
                                </button>
                            </div>
                        </p>
                        <p className="SkuuBit-NavItem-Text" onClick={() => window.open("/marketoverview", "_self")}>Market Overview</p>
                        <p className="SkuuBit-NavItem-Text" onClick={() => window.open("/copytrading", "_self")}>CopyTrading</p>
                        <p className="SkuuBit-NavItem-Text" onClick={() => window.open("/referral", "_self")}>Referral</p>
                        <p className="SkuuBit-NavItem-Text">Crypto Signal</p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Social</p>
                        </p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Prestiti</p>
                        </p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Carta SkuuBit</p>
                        </p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Quote SkuuBit</p>
                        </p>
                    </div>
                </div>
                <div className="SkuuBit-Navbar-ContainerTwo">
                    {userData ? (
                        <>
                            <div className="flex flex-row gap-3 w-48 h-full items-center rounded-full w-full py-10" style={{ padding: "4px", paddingRight: "30px", backgroundColor: "rgb(40, 40, 40)" }}>
                                <Image src={userData.photoURL ? userData.photoURL : noPhotoUrl} width={200} height={200} className="h-full w-auto rounded-full" />
                                <p className="text-white">{userData.displayName}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <button className={"SkuuBit-Navbar-Button-Login" + (isMobile ? "-Full" : "")} onClick={() => window.open("/login", "_self")}>Accedi</button>
                            <button className={"SkuuBit-Navbar-Button-Register" + (isMobile ? "-Full" : "")} onClick={() => window.open("/register", "_self")}>Registrati</button>
                        </>
                    )}
                </div>
                <div className="SkuuBit-Navbar-ContainerThree">
                    <FontAwesomeIcon className="SkuuBit-MenuBarsIcon" icon={faBars} style={{ color: "#00badb" }} onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)} />
                </div>
            </div>

            {mobileMenuIsOpen ? (
                <div className="w-full h-auto">
                    <div className="w-full h-auto SkuuBit-ContainerPhoneMenu text-white text-center flex flex-col gap-3">
                        <p className="SkuuBit-NavItem-Text-PhoneMenu" onClick={() => window.open("/", "_self")}>Home</p>
                        <p className="SkuuBit-NavItem-Text-PhoneMenu" onClick={() => setDropdownWalletShow(!DropdownWalletShow)}>
                            Wallet
                            <div className={`SkuuBit-Navbar-Dropdown-Content-Wallet ${DropdownWalletShow ? 'visible' : ''}`} onMouseLeave={() => { setDropdownWalletShow(!DropdownWalletShow) }}>
                                <button className="SkuuBit-Navbar-DropdownWallet-Spot" onClick={() => window.open("/spot", "_self")}>
                                    <FontAwesomeIcon className="SkuuBit-DropdownButtonIcon" icon={faCircleDollarToSlot} style={{ color: "#00badb" }} />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">Spot</p>
                                        <p>Acquista e Vendi Crypto</p>
                                    </div>
                                </button>
                                <button className="SkuuBit-Navbar-DropdownWallet-Spot" onClick={() => window.open("/futures", "_self")}>
                                    <FontAwesomeIcon className="SkuuBit-DropdownButtonIcon" icon={faCircleDollarToSlot} style={{ color: "#00badb" }} />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">Futures USDT-M</p>
                                        <p>Futures in USDT</p>
                                    </div>
                                </button>
                                <button className="SkuuBit-Navbar-DropdownWallet-Wallet" onClick={() => window.open("/wallet", "_self")}>
                                    <FontAwesomeIcon className="SkuuBit-DropdownButtonIcon" icon={faWallet} style={{ color: "#00badb" }} />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-semibold">Wallet</p>
                                        <p>Controlla il Tuo Wallet</p>
                                    </div>
                                </button>
                            </div>
                        </p>
                        <p className="SkuuBit-NavItem-Text-PhoneMenu" onClick={() => window.open("/marketoverview", "_self")}>Market Overview</p>
                        <p className="SkuuBit-NavItem-Text-PhoneMenu" onClick={() => window.open("/copytrading", "_self")}>CopyTrading</p>
                        <p className="SkuuBit-NavItem-Text-PhoneMenu" onClick={() => window.open("/referral", "_self")}>Referral</p>
                        <p className="SkuuBit-NavItem-Text-PhoneMenu">Crypto Signal</p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Social</p>
                        </p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Prestiti</p>
                        </p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Carta SkuuBit</p>
                        </p>
                        <p className="SkuuBit-NavItem-Text flex flex-row gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={faLock} />
                            <p>Quote SkuuBit</p>
                        </p>
                    </div>
                </div>
            ) : ""}
        </>
    );
}