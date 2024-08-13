"use client";
import Image from "next/image";
import logo from "../../assets/img/logo.png";
import { useEffect, useState } from "react";

export default function Alert({ type, message, setMessage }) {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const TimeOutAlertAnimation = setTimeout(() => {
            setShowAlert(false);
            setMessage("");
        }, 3000);
        return () => clearTimeout(TimeOutAlertAnimation);
    }, [])

    return (
        <>
            {showAlert ? (
                <div className="z-0 w-full fixed bottom-10 right-5 justify-end items-center h-24 grid">
                    <div className="SkuuBit-Alert">
                        <div className="w-full flex flex-row gap-2 items-center">
                            <Image src={logo} className="w-10" />
                            <p className="font-semibold">SkuuBit</p>
                            {type === "" ? (
                                <></>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="w-full p-2 h-auto">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </>
    );
}