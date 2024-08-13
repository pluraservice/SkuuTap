"use client";
import Image from "next/image";
import logo from "../assets/img/logo.png";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CryptoOverview from "../components/CryptoOverview/CryptoOverview";
import { useEffect } from "react";

export default function MarketOverview() {
    useEffect(() => {document.title = "SkuuBit Market Overview"}, []);

    return (
        <>
            <Navbar />

            <div className="SkuuBit-MarketOverview">
                <div className="SkuuBit-MarketOverview-MainBox">
                    <div className="w-full flex flex-row items-center gap-3 p-3">
                        <Image src={logo} className="w-20" />
                        <p className="font-semibold text-white">SkuuBit Market Overview</p>
                    </div>
                    <CryptoOverview />
                </div>
            </div>

            <Footer />
        </>
    );
}