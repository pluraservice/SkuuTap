"use client";
import Image from "next/image";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import logo from "../assets/img/logo.png";
import { useEffect } from "react";
import decodeBase64 from "../functions/base64/decode";
import getUserHaveEmailVerified from "../functions/api/getUserHaveEmailVerified";
import sendVerificationEmail from "../functions/api/sendVerificationEmail";

export default function VerifyEmail() {
    useEffect(() => {
        const userHaveSavedAccount = JSON.parse(decodeBase64(localStorage.getItem("SkuuBit | Account Saved")));
        const email = userHaveSavedAccount.email;
        const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"))
        document.title = "SkuuBit Verifica Email | " + userHaveSavedAccount.email;
        const intervalGetEmailIsVerified = setInterval(async () => {
            const resEmailVerified = await getUserHaveEmailVerified(email, password);
            if (resEmailVerified.result) {
                if (resEmailVerified.isVerified) {
                    window.open("/wallet", "_self");   
                } else {
                    await sendVerificationEmail(email, password);
                }
            }
        }, 1000);

        return () => clearInterval(intervalGetEmailIsVerified)
    }, []);

    return (
        <div>
            <Navbar />

            <div className="w-full p-10 flex justify-center items-center flex-col gap-3">
                <Image src={logo} />
                <h2 className="text-white font-semibold">Verifica L'email per Continuare</h2>
                <p className="text-gray-400">Verrai Reindirizzato in Automatico dopo La Verifica</p>
            </div>

            <Footer />
        </div>
    );
}