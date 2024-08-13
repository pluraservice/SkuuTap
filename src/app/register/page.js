"use client";
import Image from "next/image";
import logo from "../assets/img/logo.png";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Alert from "../components/Alert/Alert";
import { Suspense, useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import loadingGif from "../assets/img/loading.gif";

export default function Register() {
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "SkuuBit Creazione Account"
    }, [])

    return (
        <>
            <Navbar />

            <div className="SkuuBit-Login-LoginContainer">
                <div className="containerImage">
                    <Image src={logo} alt="SkuuBit Logo" />
                </div>
                <div className="p-6">
                    <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Image src={loadingGif} /></div>}>
                        <RegisterForm setError={setError} />
                    </Suspense>
                </div>
            </div>

            {error && <Alert type="error" message={error} setMessage={setError} />}

            <Footer />
        </>
    );
}