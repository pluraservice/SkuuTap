"use client";
import Image from "next/image";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import encodeBase64 from "../../functions/base64/encode";
import createAccount from "../../functions/api/createAccount";
import createOtpQRCode from "../../functions/api/createOtpQRCode";
import sendVerificationEmail from "../../functions/api/sendVerificationEmail";
import getOtpCodeIsCorrect from "../../functions/api/getOtpCodeIsCorrect";
import copyToClipboard from "../../functions/copyToClipboard/copyToClipboard";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import newReferralUserToUid from "../../functions/api/newReferralUserToUid";
import { useSearchParams } from 'next/navigation'

export default function RegisterForm({ setError }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [savedUserData, setSavedUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [googleAuthOTP, setGoogleAuthOTP] = useState({ active: false, qrCodeUrl: "", secretCode: "", otpInsertCode: "" });
    const searchParams = useSearchParams();
    const refCode = searchParams.get('refCode');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const resCreateAccount = await createAccount(email, password, username);
            if (resCreateAccount.result) {
                setSavedUserData(resCreateAccount.data);
                const userData = resCreateAccount.data;
                const uid = userData.uid;
                const accountName = userData.displayName;
                const resOtp = await createOtpQRCode(uid, accountName);
                if (resOtp.result) {
                    setIsLoading(false);
                    setGoogleAuthOTP({
                        active: true,
                        qrCodeUrl: resOtp.qrCodeUrl,
                        secretCode: resOtp.secret,
                        otpInsertCode: ""
                    })
                } else {
                    setIsLoading(false);
                    setError(resOtp.error);
                }
            } else {
                setIsLoading(false);
                setError(resCreateAccount.error);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };
    
    return (
        <>
            <div className="SkuuBit-LoginForm">
                <h2>Benvenuto in Skuu<span className="CyanColor">Bit</span></h2>
                {!googleAuthOTP.active ? (
                    <>
                        <div className="SkuuBit-LoginForm-Inputs">
                            <div className="mt-5">
                                <label htmlFor="SkuuBit-UsernameInput">Username</label>
                                <input
                                    id="SkuuBit-UsernameInput"
                                    className="SkuuBit-default-Input"
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="SkuuBit-EmailInput">Indirizzo Email</label>
                                <input
                                    id="SkuuBit-EmailInput"
                                    className="SkuuBit-default-Input"
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="SkuuBit-PasswordInput">Password</label>
                                <input
                                    id="SkuuBit-PasswordInput"
                                    className="SkuuBit-default-Input"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                />
                            </div>
                            <button className="SkuuBit-Login-Button mt-4" onClick={handleLogin} disabled={isLoading}>
                                <FontAwesomeIcon className="SkuuBit-MenuBarsIcon" icon={faIdCard} style={{ color: "white" }} />
                                <p>{(isLoading ? "Caricamento..." : "Crea Account")}</p>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="SkuuBit-LoginForm-Inputs mt-5">
                            <Image src={googleAuthOTP.qrCodeUrl} className="w-1/2 rounded-xl" width={50} height={50} />
                            <div>
                                <p>{"Secret Code: " + (googleAuthOTP.secretCode)}</p>
                                <FontAwesomeIcon icon={faClipboard} className="CyanColor cursor-pointer hover:text-gray-400" onClick={() => copyToClipboard(googleAuthOTP.secretCode)} />
                            </div>
                            <p className="text-center text-gray-400">Scarica Google Authenticator e Scansiona Il QRCode o inserisci Il Codice per Avere il Codice di Accesso</p>
                            <input id="SkuuBit-OtpInput" maxLength={6} className="SkuuBit-default-Input text-center" onChange={async (e) => {
                                setGoogleAuthOTP((prevInfo) => ({
                                    ...prevInfo,
                                    otpInsertCode: e.target.value
                                }))
                                const insertedCode = e.target.value;
                                const uid = savedUserData.uid;
                                if (insertedCode.length === 6) {
                                    const resOtpCodeIsValid = await getOtpCodeIsCorrect(uid, insertedCode);
                                    if (resOtpCodeIsValid.result) {
                                        if (resOtpCodeIsValid.isValidCode) {
                                            localStorage.setItem("SkuuBit | Account Saved", encodeBase64(JSON.stringify(savedUserData)));
                                            localStorage.setItem("SkuuBit | Account Metadata", encodeBase64(password.toString()));
                                            const resSendEmail = await sendVerificationEmail(email, password);
                                            if (resSendEmail.result) {
                                                if (refCode) {
                                                    const newRefUserToUid = await newReferralUserToUid(uid, email, password, refCode);
                                                    if (newRefUserToUid.result) {
                                                        window.open("/wallet", "_self");
                                                    } else {
                                                        setError(newRefUserToUid.error)
                                                    }
                                                } else {
                                                    window.open("/wallet", "_self");
                                                }
                                                clearInterval(intervalOtpCode);
                                            } else {
                                                setError(resSendEmail.error);
                                            }
                                        } else {
                                            setError("Otp Code is Not Valid");
                                        }
                                    } else {
                                        setError(resOtpCodeIsValid.error);
                                    }
                                }
                            }} type="text" />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}