"use client";
import Image from "next/image";
import logo from "./assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Card1BackgroundImage from "@/src/app/assets/img/card1bg.jpg";
import Card2BackgroundImage from "@/src/app/assets/img/card2bg.jpg";
import Card3BackgroundImage from "@/src/app/assets/img/card3bg.jpg";
import imgPhoneFutures from "@/src/app/assets/img/imgPhoneFutures.png";
import imgPhoneDownloadApp from "@/src/app/assets/img/imgPhoneDownloadApp.png";
import Windows from "@/src/app/assets/img/windows.png";
import Apple from "@/src/app/assets/img/apple.png";
import Iphone from "@/src/app/assets/img/iphone.png";
import Android from "@/src/app/assets/img/android.png";
import TradingViewSponsor from "@/src/app/assets/img/icons/sponsor/tradingView.png";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    console.log('Rendering Page component');
    return (
        <>
            <Navbar />

            <div className="SkuuBit-SectionOne columns-2">
                <div className="w-full h-full flex justify-end items-end">
                    <div className="w-8/12 phoneFull flex flex-col justify-center items-center">
                        <h1 className="md:text-8xl text-5xl">Skuu<span className="CyanColor">Bit</span></h1>
                        <p className="text-sm text-gray-400 font-normal">SkuuBit Exchange è una piattaforma di trading all'avanguardia fondata da Onaliskuu e sviluppata da un team di esperti guidati dal principale sviluppatore Danilo Giannotta. La missione di SkuuBit è quella di semplificare il trading per tutti, rendendolo accessibile e intuitivo, senza compromettere la sicurezza e le funzionalità avanzate richieste dai trader moderni.</p>
                        <button className="SkuuBit-GetStarted-Button">
                            <FontAwesomeIcon className="SkuuBit-MenuBarsIcon" icon={faUser} style={{ color: "white" }} />
                            <p>Inizia ad Usare SkuuBit</p>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full">
                    <Image className="h-full w-auto" src={logo} />
                </div>
            </div>

            <section>
                <div className="w-full p-6 flex flex-col gap-10" style={{ backgroundColor: "rgb(20, 20, 20)" }}>
                    <h1 className="text-3xl phoneFull font-semibold text-center text-white">Skuu<span className="CyanColor">Bit</span> Sponsor</h1>
                    <div className="w-auto flex flex-row flex-phone justify-center items-center">
                        <a href="https://tradingview.com/" className="flex justify-center items-center SkuuBit-Sponsor">
                            <Image src={TradingViewSponsor} className="md:w-72 w-full" />
                        </a>
                    </div>
                </div>
            </section>

            <div className="w-full flex flex-row md:gap-0 gap-10 flex-phone mt-20">
                <div className="w-full h-full flex justify-center items-center">
                    <Image src={imgPhoneFutures} className="md:w-1/3 w-9/12" />
                </div>
                <div className="w-full h-auto flex flex-col justify-center text-white">
                    <h1 className="md:text-6xl text-3xl phoneFull textCenterToPhone font-semibold">Fai Trading su Skuu<span className="CyanColor">Bit</span></h1>
                    <div className="flex flex-row flex-phone gap-5 mt-10">
                        <div className="w-auto SkuuBit-DefaultContainer flex flex-row items-center gap-5">
                            <FontAwesomeIcon icon={faCircleDollarToSlot} className="h-12 w-auto CyanColor" />
                            <div className="flex flex-col gap-1">
                                <h1 className="font-semibold text-xl">Spot</h1>
                                <p className="text-gray-400">Scambio diretto di criptovalute</p>
                            </div>
                        </div>
                        <div className="w-auto SkuuBit-DefaultContainer flex flex-row items-center gap-5">
                            <FontAwesomeIcon icon={faMoneyBillTrendUp} className="h-12 w-auto CyanColor" />
                            <div className="flex flex-col gap-1">
                                <h1 className="font-semibold text-xl">USDT-M Futures</h1>
                                <p className="text-gray-400">Ordini con Derivati in USDT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="SkuuBit-SectionTwo mt-20">
                <div className="SkuuBit-SectionTwoCard">
                    <div className="w-full h-full flex flex-col justify-end">
                        <div className="SkuuBit-ImageBlurEffect">
                            <Image src={Card1BackgroundImage} />
                        </div>
                        <div className="SkuuBit-CardContent">
                            <h1 className="font-semibold text-3xl">Crea il Tuo Wallet</h1>
                            <p className="text-sm">Crea il Tuo Wallet e Deposita dei Assets</p>
                        </div>
                    </div>
                </div>
                <div className="SkuuBit-SectionTwoCard">
                    <div className="w-full h-full flex flex-col justify-end">
                        <div className="SkuuBit-ImageBlurEffect">
                            <Image src={Card2BackgroundImage} />
                        </div>
                        <div className="SkuuBit-CardContent">
                            <h1 className="font-semibold text-3xl">Apri il Tuo Primo Ordine</h1>
                            <p className="text-sm">Apri il Tuo Primo Ordine su SkuuBit e Guadagna</p>
                        </div>
                    </div>
                </div>
                <div className="SkuuBit-SectionTwoCard">
                    <div className="w-full h-full flex flex-col justify-end">
                        <div className="SkuuBit-ImageBlurEffect">
                            <Image src={Card3BackgroundImage} />
                        </div>
                        <div className="SkuuBit-CardContent">
                            <h1 className="font-semibold text-3xl">Invita i Tuoi Amici</h1>
                            <p className="text-sm">Invita i Tuoi Amici e Guadagna dai Loro Ordini</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-full flex flex-row flex-phone md:gap-0 gap-20 mt-20 p-10">
                <div className="w-full h-auto flex flex-col justify-center items-end textCenterToPhone text-white">
                    <h1 className="md:text-6xl text-3xl phoneFull font-semibold">Skuu<span className="CyanColor">Bit</span> Apps</h1>
                    <br />
                    <p className="text-gray-400">Scarica le SkuuBit App e fai Trading dove Vuoi e Quando vuoi con Qualunque Dispositivo.</p>
                    <div className="w-9/12 flex flex-row flex-phone phoneFull gap-2 mt-3">
                        <button className="SkuuBit-Navbar-DropdownWallet-Spot-notFull w-full" style={{ backgroundColor: "rgb(20, 20, 20)" }} onClick={() => window.open("/SkuuBit-WindowsApp-Installer.msi")}>
                            <Image src={Windows} className="h-7 w-auto" />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Windows</p>
                                <p>Applicazione per Computer Windows</p>
                            </div>
                        </button>
                        <button className="SkuuBit-Navbar-DropdownWallet-Spot-notFull w-full h-20" style={{ backgroundColor: "rgb(20, 20, 20)" }} onClick={() => window.open("/spot", "_self")}>
                            <Image src={Apple} className="h-7 w-auto" />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Mac OS</p>
                                <p>Applicazione per Computer Apple</p>
                            </div>
                        </button>
                    </div>
                    <div className="w-9/12 flex flex-row flex-phone phoneFull gap-2 mt-3">
                        <button className="SkuuBit-Navbar-DropdownWallet-Spot-notFull w-full h-20" style={{ backgroundColor: "rgb(20, 20, 20)" }} onClick={() => window.open("/spot", "_self")}>
                            <Image src={Android} className="h-6 w-auto" />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Android</p>
                                <p>Applicazione per Smartphone Android</p>
                            </div>
                        </button>
                        <button className="SkuuBit-Navbar-DropdownWallet-Spot-notFull w-full h-20" style={{ backgroundColor: "rgb(20, 20, 20)" }} onClick={() => window.open("/spot", "_self")}>
                            <Image src={Iphone} className="h-9 w-auto" />
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">IOS</p>
                                <p>Applicazione per Smartphone Apple</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <Image src={imgPhoneDownloadApp} className="md:w-1/2 w-full" />
                </div>
            </div>

            <Footer />
        </>
    );
}
