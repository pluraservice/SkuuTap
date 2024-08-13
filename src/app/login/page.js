"use client";
import Image from "next/image";
import logo from "@/src/app/assets/img/logo.png";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import LoginForm from "../components/LoginForm/LoginForm";
import Alert from "../components/Alert/Alert";
import loadingGif from "@/src/app/assets/img/loading.gif";
import { Suspense, useState } from "react";

export default function Login() {
    const [error, setError] = useState("");
    return (
        <>
            <Navbar />

            <div className="SkuuBit-Login-LoginContainer">
                <div className="containerImage">
                    <Image src={logo} alt="SkuuBit Logo" />
                </div>
                <div className="p-6">
                    <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Image src={loadingGif} /></div>}>
                        <LoginForm setError={setError} />
                    </Suspense>
                </div>
            </div>

            {error && <Alert type="error" message={error} setMessage={setError} />}

            <Footer />
        </>
    );
}