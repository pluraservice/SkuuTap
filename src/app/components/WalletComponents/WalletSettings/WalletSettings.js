import Image from "next/image";
import noPhotoUrl from "../../../assets/img/noPhotoURL.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboard, faImages, faLock, faPen, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import copyToClipboard from "../../../functions/copyToClipboard/copyToClipboard";
import { useEffect, useState } from "react";
import encodeBase64 from "../../../functions/base64/encode";
import decodeBase64 from "../../../functions/base64/decode";
import logo from "../../../assets/img/logo.png";
import getOtpCodeIsCorrect from "@/src/app/functions/api/getOtpCodeIsCorrect";
import updateUserInfo from "@/src/app/functions/api/updateUserInfo";
import loginAccount from "@/src/app/functions/api/loginAccount";

export default function WalletSettings({ userData, setError }) {
    const [newEmail, setNewEmail] = useState("");
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [otpCodeInsert, setOtpCodeInsert] = useState("");
    const [oldPasswordInsert, setOldPasswordInsert] = useState("");
    const [newPasswordInsert, setNewPasswordInsert] = useState("");
    const [containerUpdatePasswordShow, setContainerUpdatePasswordShow] = useState(false);
    const [changePasswordContainerLoading, setChangePasswordContainerLoading] = useState(false);
    const [changePhotoUrlIsLoading, setChangePhotoUrlIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {setIsMobile(window.innerWidth <= 1340);};
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize);};
    }, []);

    const changeEmail = async () => {
        setShowChangeEmail(false);
        const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"));
        const resUpdateEmail = await updateUserInfo(userData.email, password, "Email", {newEmail: newEmail});
        if (resUpdateEmail.result) {
            setInterval(async () => {
                const email = newEmail;
                const resLoginWithNewInfo = await loginAccount(email, password);
                if (resLoginWithNewInfo.result) {
                    localStorage.setItem("SkuuBit | Account Saved", encodeBase64(JSON.stringify(resLoginWithNewInfo.data)))
                    location.reload();
                } else {
                    setError(resLoginWithNewInfo.error)
                }
            }, 1000);
        } else {
            setError(resUpdateEmail.error);
        }
    }

    const changePassword = async () => {
        setChangePasswordContainerLoading(true);
        const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"));
        const insertedCode = otpCodeInsert;
        const newPassword = newPasswordInsert;
        const uid = userData.uid;
        const resOtpCodeIsValid = await getOtpCodeIsCorrect(uid, insertedCode);
        if (resOtpCodeIsValid.result) {
            if (oldPasswordInsert === password) {
                const resUpdatePassword = await updateUserInfo(email, password, "Password", {newPassword: newPassword})
                if (resUpdatePassword.result) {
                    localStorage.setItem("SkuuBit | Account Metadata", encodeBase64(newPassword));
                    setChangePasswordContainerLoading(false);
                    setContainerUpdatePasswordShow(false);
                } else {
                    setError(resUpdatePassword.error);
                    setChangePasswordContainerLoading(false);
                }
            } else {
                setError("La Password Attuale non Corrisponde a Quella Inserita");
                setChangePasswordContainerLoading(false);
            }
        } else {
            setError("Otp Code non Valido");
            setChangePasswordContainerLoading(false);
        }
    }

    const changePhotoUrl = async (e) => {
        setChangePhotoUrlIsLoading(true);
        const file = e.target.files[0];
        if (file) {
            const maxSizeInBytes = 1 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                setChangePhotoUrlIsLoading(false);
                setError("Il file è troppo grande. La dimensione massima consentita è 1 MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = async () => {
                const email = userData.email;
                const password = decodeBase64(localStorage.getItem("SkuuBit | Account Metadata"));
                const resUpdatePhotoUrl = await updateUserInfo(email, password, "PhotoURL", {base64String: reader.result});
                if (resUpdatePhotoUrl.result) {
                    const resLoginWithNewInfo = await loginAccount(email, password);
                    if (resLoginWithNewInfo.result) {
                        localStorage.setItem("SkuuBit | Account Saved", encodeBase64(JSON.stringify(resLoginWithNewInfo.data)))
                        location.reload();
                    } else {
                        setError(resLoginWithNewInfo.error)
                    }
                } else {
                    setChangePhotoUrlIsLoading(false);
                    setError(resUpdatePhotoUrl.error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="w-full flex flex-row flex-phone gap-10 justify-center items-center">
                <div className={"flex flex-phone gap-6 " + (containerUpdatePasswordShow ? "flex-col justify-center items-center" : "flex-row justify-center items-center")}>
                    <div className="relative group">
                        <Image src={userData.photoURL ? userData.photoURL : noPhotoUrl} width={200} height={200} className="w-42 h-42 rounded-full" />
                        {!changePhotoUrlIsLoading ? (
                            <div className="absolute inset-0 cursor-pointer flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <FontAwesomeIcon icon={faImages} className="text-3xl text-white" />
                                <span className="text-white text-lg font-semibold">Modifica Foto</span>
                                <input type="file" accept="image/*" className="absolute w-full h-full cursor-pointer" style={{ opacity: 0 }} onChange={(e) => changePhotoUrl(e)} />
                            </div>
                        ) : (
                            <div className="absolute inset-0 cursor-pointer flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <FontAwesomeIcon icon={faSpinner} className="text-3xl text-white" />
                                <span className="text-white text-lg font-semibold">Modificando Foto...</span>
                            </div>
                        )}
                    </div>
                    <div className="w-full justify-center items-center flex flex-col gap-3 p-3">
                        <div className="flex flex-row gap-4 items-center">
                            <h1 className="text-white text-3xl font-semibold">{userData.displayName}</h1>
                            <span class="inline-flex items-center h-6 justify-center text-sm font-semibold text-green-500 rounded-full gap-2">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                </svg>
                                <h1>Utente Verificato</h1>
                            </span>
                        </div>
                        <div className={"flex flex-row gap-5 items-center " + (isMobile ? "justify-center flex-wrap" : "")}>
                            <h1 className="text-white">{"User Id (UID): " + userData.uid}</h1>
                            <FontAwesomeIcon icon={faClipboard} className="CyanColor cursor-pointer hover:text-gray-400" onClick={() => copyToClipboard(userData.uid)} />
                        </div>
                        <div className={"flex flex-row gap-5 items-center " + (isMobile ? "justify-center flex-wrap" : "")}>
                            {showChangeEmail ? (
                                <>
                                    <input id="SkuuBit-EmailInput" className="SkuuBit-default-Input text-white" onChange={(e) => setNewEmail(e.target.value)} type="email" />
                                    <FontAwesomeIcon icon={faCheck} className="text-white cursor-pointer hover:text-gray-400" onClick={() => changeEmail()} />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-white">{"Email: " + userData.email}</h1>
                                    <FontAwesomeIcon icon={faClipboard} className="CyanColor cursor-pointer hover:text-gray-400" onClick={() => copyToClipboard(userData.email)} />
                                    <FontAwesomeIcon icon={faPen} className="CyanColor cursor-pointer hover:text-gray-400" onClick={() => setShowChangeEmail(true)} />
                                </>
                            )}
                        </div>
                        <div className="w-full h-0.5 bg-white mt-2"></div>
                        <button className="SkuuBit-Wallet-Settings-DefaultButton mt-3" onClick={() => setContainerUpdatePasswordShow(true)}>
                            <FontAwesomeIcon icon={faLock} className="CyanColor" />
                            <p>Modifica Password</p>
                        </button>
                    </div>
                </div>
                {containerUpdatePasswordShow ? (
                    <div className="SkuuBit-DefaultContainer flex flex-col gap-3 w-full h-full">
                        {!changePasswordContainerLoading ? (
                            <>
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-white text-2xl">Modifica Password</h1>
                                    <FontAwesomeIcon icon={faXmark} className="text-white text-xl cursor-pointer" onClick={() => setContainerUpdatePasswordShow(false)} />
                                </div>
                                <p className="text-gray-400">Completa tutti gli Input per Modificare la Tua Password</p>
                                <label htmlFor="SkuuBit-EmailInput">Google Auth Code</label>
                                <input id="SkuuBit-OtpInput" maxLength={6} className="SkuuBit-default-Input text-center" onChange={(e) => setOtpCodeInsert(e.target.value)} type="text" />
                                <label htmlFor="SkuuBit-OldPassword">Inserisci la Password Attuale</label>
                                <input id="SkuuBit-OldPassword" className="SkuuBit-default-Input text-center" onChange={(e) => setOldPasswordInsert(e.target.value)} type="text" />
                                <label htmlFor="SkuuBit-NewPassword">Inserisci la Nuova Password</label>
                                <input id="SkuuBit-NewPassword" className="SkuuBit-default-Input text-center" onChange={(e) => setNewPasswordInsert(e.target.value)} type="text" />
                                <button className="SkuuBit-Wallet-Settings-DefaultButton mt-3" onClick={() => changePassword()}>
                                    <FontAwesomeIcon icon={faLock} className="CyanColor" />
                                    <p>Modifica Password</p>
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Image src={logo} className="w-full" />
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-8 h-8 CyanColor animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : ""}
            </div>
        </>
    );
}

