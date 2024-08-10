"use client";
import { useEffect, useRef, useState } from "react";
import decodeBase64 from "../functions/base64/decode";
import getUser from "../functions/api/getUser";
import getUserTapCoin from "../functions/api/getUserTapCoin";
import Home from "../components/main/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import Tasks from "../components/main/Tasks";
import Friends from "../components/main/Friends";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import getUserIsFollowerFromUsername from "../functions/api/getUserIsFollowerFromUsername";

export default function Main() {
    const [userData, setUserData] = useState();
    const [userTapCoin, setUserTapCoin] = useState(0);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [playGame, setPlayGame] = useState(false);
    const [modalitySelezionated, setModalitySelezionated] = useState("Home");
    const [viewVideo, setViewVideo] = useState({ view: false, item: {} });
    const [timer, setTimer] = useState(0);
    const [rewardGiven, setRewardGiven] = useState(false);
    const intervalRef = useRef(null);
    const [totalVideoTime, setTotalVideoTime] = useState(0);
    const [videoKey, setVideoKey] = useState(0);
    const [showInstagramAlert, setShowInstagramAlert] = useState(false);
    const [instagramAlertUsername, setInstagramAlertUsername] = useState("");
    const [instagramAlertText, setInstagramAlertText] = useState({
        text: "",
        type: ""
    });
    const [instagramButtonIsLoading, setInstagramButtonIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const savedAccount = localStorage.getItem("SkuuTap | Account Saved");
            const savedAccountDecodeData = JSON.parse(decodeBase64(savedAccount));
            if (savedAccount) {
                const UserGet = await getUser(savedAccountDecodeData.email, savedAccountDecodeData.password);
                if (UserGet.result) {
                    if (UserGet.data) {
                        setUserData(UserGet.data);
                        const UserCoinGet = await getUserTapCoin(UserGet.data.uid);
                        if (UserCoinGet.result) {
                            setUserTapCoin(UserCoinGet.coin);
                        } else {
                            setUserTapCoin(0);
                        }
                    }
                } else {
                    window.open("/", "_self");
                }
            } else {
                window.open("/", "_self");
            }
        }

        return () => fetchData();
    }, [])

    useEffect(() => { if (userData) { setLoadingScreen(false); } else { setLoadingScreen(true); } }, [userData]);

    useEffect(() => {
        if (viewVideo.view) {
            setTotalVideoTime(
                parseInt(viewVideo.item.VideoOptionsFrame.time.minute) * 60 +
                parseInt(viewVideo.item.VideoOptionsFrame.time.seconds)
            );
            startTimer();
        }
    }, [viewVideo]);

    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimer(0);
        setVideoKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        if (timer >= totalVideoTime && totalVideoTime > 0 && !rewardGiven) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRewardGiven(true);
            setViewVideo((prevInfo) => ({
                ...prevInfo,
                view: false
            }))
            viewVideo.item.redeemPrize(userData.uid);
        }
    }, [timer, totalVideoTime, rewardGiven, userData, viewVideo]);

    useEffect(() => {
        const handleBlur = () => { resetTimer(); };
        const handleFocus = () => { startTimer(); };
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);
        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return (
        <>
            {!loadingScreen ? (
                <div className="flex flex-col h-screen">
                    {playGame || viewVideo.view || showInstagramAlert ? (
                        <div className="w-full flex justify-end items-center p-4">
                            <FontAwesomeIcon icon={faXmark} className="text-green-500 text-xl" onClick={
                                () => {
                                    setPlayGame(false);
                                    setViewVideo({
                                        view: false
                                    })
                                    setShowInstagramAlert(false);
                                }
                            } />
                        </div>
                    ) : ""}
                    <div className="flex-phone flex justify-center items-center h-full">
                        <div className="SkuuTap-MainForm flex flex-col">
                            {!playGame && !viewVideo.view && !showInstagramAlert ? (
                                <>
                                    {modalitySelezionated === "Home" ? (
                                        <Home userData={userData} setPlayGame={setPlayGame} userTapCoin={userTapCoin} playGame={playGame} />
                                    ) : modalitySelezionated === "Tasks" ? (
                                        <Tasks userData={userData} setShowInstagramAlert={setShowInstagramAlert} setViewVideo={setViewVideo} />
                                    ) : modalitySelezionated === "Friends" ? (
                                        <Friends userData={userData} />
                                    ) : ""}
                                </>
                            ) : ""}

                            {playGame && !viewVideo.view && !showInstagramAlert ? (
                                <>
                                    <iframe src={"/tapGame/index.html?userUid=" + userData.uid} className="w-full h-full" />
                                </>
                            ) : ""}

                            {viewVideo.view && !playGame && !showInstagramAlert ? (
                                <div className="w-full h-full">
                                    <>
                                        <h1 className="text-white text-center mt-5 p-1">Guarda tutto il Video per Ricevere la Tua Ricompensa</h1>
                                        <iframe key={videoKey} width={"100%"} height={"100%"} src={viewVideo.item.VideoOptionsFrame.url} title="SkuuTap Video" frameborder="0" allow="autoplay;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                zIndex: 1,
                                                backgroundColor: 'transparent',
                                            }}
                                        ></div>
                                    </>
                                </div>
                            ) : ""}

                            {showInstagramAlert ? (
                                <div className="w-96 h-auto flex flex-col gap-5 rounded-xl p-4 bg-black">
                                    <div className="flex flex-row items-center">
                                        <div className="w-full">
                                            <h1 className="text-white text-center">SkuuTap Instagram Verifica Follower</h1>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm">Se Dopo Avviata la Verifica, Risulterai tra i Follower verrai Registrato perciò non Potrai Utilizzare questo Username con un'Altro Account.</p>
                                    <input className="w-full border border-gray-400 rounded-xl text-center p-3 text-white bg-black" placeholder="Inserisci il tuo Username Instagram" value={instagramAlertUsername} onChange={(e) => setInstagramAlertUsername(e.target.value)} />
                                    <button className="text-white w-full rounded-full py-1 px-3" style={{ backgroundColor: "rgb(40, 40, 40)" }} onClick={
                                        async () => {
                                            if (instagramAlertUsername) {
                                                setInstagramButtonIsLoading(true);
                                                const getIsFollower = await getUserIsFollowerFromUsername(instagramAlertUsername);
                                                if (getIsFollower.result) {
                                                    if (getIsFollower.isFollower) {
                                                        setInstagramButtonIsLoading(false);
                                                        setInstagramAlertText({
                                                            text: "Verifica Effettuata con Successo, Hai Ricevuto la Tua Ricompensa",
                                                            type: "SUCCESS"
                                                        })
                                                    } else {
                                                        setInstagramButtonIsLoading(false);
                                                        setInstagramAlertText({
                                                            text: "Non risulti Tra i Follower dell'Account, Riprova",
                                                            type: "ERROR"
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }>{(instagramButtonIsLoading ? "Verifica in Corso, Attendere" : "Avvia la Verifica")}</button>
                                    <p className={"text-sm text-center " + (instagramAlertText.type === "SUCCESS" ? "text-green-500" : "text-red-500")}>{instagramAlertText.text}</p>
                                </div>
                            ) : ""}
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-full h-auto flex justify-center items-center p-5">
                        <div className="w-full h-16 rounded-xl flex flex-row" style={{ backgroundColor: 'rgb(40, 40, 40)' }}>
                            <div onClick={() => setModalitySelezionated("Home")} className="cursor-pointer w-full flex flex-col gap-2 justify-center items-center h-full border-r border-gray-500">
                                <FontAwesomeIcon icon={faHome} className="text-green-600" />
                                <p className="text-xs text-white">Home</p>
                            </div>
                            <div onClick={() => setModalitySelezionated("Tasks")} className="cursor-pointer w-full flex flex-col gap-2 justify-center items-center h-full border-r border-gray-500">
                                <FontAwesomeIcon icon={faTasks} className="text-green-600" />
                                <p className="text-xs text-white">Tasks</p>
                            </div>
                            <div onClick={() => setModalitySelezionated("Friends")} className="cursor-pointer w-full flex flex-col gap-2 justify-center items-center h-full border-r border-gray-500">
                                <FontAwesomeIcon icon={faUserFriends} className="text-green-600" />
                                <p className="text-xs text-white">Friends</p>
                            </div>
                            <div onClick={() => setModalitySelezionated("Wallet")} className="cursor-pointer w-full flex flex-col gap-2 justify-center items-center h-full">
                                <FontAwesomeIcon icon={faWallet} className="text-green-600" />
                                <p className="text-xs text-white">Wallet</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-full h-screen flex justify-center items-center bg-green-600">
                        <h1 className="text-black text-7xl">SkuuTap</h1>
                    </div>
                </>
            )}
        </>
    );
}