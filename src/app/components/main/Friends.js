import getUserFriends from "@/app/functions/api/getUserFriends";
import loginAccount from "@/app/functions/api/loginAccount";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Image from "next/image";
import noPhotoURL from "@/app/assets/img/noPhotoURL.png";
import getUserTapCoin from "@/app/functions/api/getUserTapCoin";
import SkuuTapCoin from "@/app/assets/img/SkuuTapCoin.png";
import getUserRedeemedReferralCoin from "@/app/functions/api/getUserRedeemedReferralCoin";
import setUserRedeemedReferralCoin from "@/app/functions/api/setUserRedeemedReferralCoin";

export default function Friends({ userData }) {
    const [copyReferralUrl, setCopyReferralUrl] = useState(false);
    const [userFriends, setUserFriends] = useState([]);
    const [userReferralPercentual, setUserReferralPercentual] = useState(0);
    const [authorizedReferralRedeem, setAuthorizedReferralRedeem] = useState(false);

    useEffect(() => {
        if (copyReferralUrl) {
            const timeOut = setTimeout(() => {
                setCopyReferralUrl(false);
                clearTimeout(timeOut);
            }, 1000);
        }
    }, [copyReferralUrl]);
    
    useEffect(() => {
        const fetchData = async () => {
            const referrals = await getUserFriends(userData.uid);
            let referralDataArray = [];
            let totalCoins = 0;
            await Promise.all(
                Object.values(referrals).map((item) => {
                    if (item) {
                        return Promise.all(Object.values(item).map(async (itemUid) => {
                            const getUserInfo = await loginAccount(itemUid.email, itemUid.password);
                            const userCoinNumber = await getUserTapCoin(getUserInfo.data.uid);
                            totalCoins += userCoinNumber.coin;
                            referralDataArray.push({
                                ...getUserInfo.data,
                                coinNumber: userCoinNumber.coin
                            });
                        }));
                    }
                })
            );
            const percentageCoins = totalCoins * 0.005;
            const getReferralRedeemed = await getUserRedeemedReferralCoin(userData.uid);
            setUserReferralPercentual(percentageCoins);
            setUserFriends(referralDataArray);
            setAuthorizedReferralRedeem(getReferralRedeemed);

        }
        fetchData();
    }, [userData])

    return (
        <>
            <div className="w-full overflow-scroll bg-red-500 p-4 gap-3">
                <h1 className="text-2xl font-semibold">Invita i Tuoi Amici e Guadagna Coin</h1>
                <p className="text-gray-400 text-xs">Entra a far parte della nostra community di SkuuTap e porta con te i tuoi amici! Ogni volta che un amico si iscrive utilizzando il tuo link di invito, riceverai dei Coin come ricompensa. Usa i tuoi Coin per sbloccare contenuti esclusivi, ottenere sconti speciali e partecipare a eventi riservati. Più amici inviti, più Coin guadagni!</p>
                <div className="flex flex-col justify-center items-center gap-3 py-5 px-3">
                    <h1>Come Posso Invitare una Persona?</h1>
                    <ul class="w-full text-gray-300 flex flex-col py-2 gap-1">
                        <li class="flex items-center gap-3">
                            <FontAwesomeIcon icon={faClipboard} className="text-green-500" />
                            Copia il Referral Friends Url
                        </li>
                        <div className="flex flex-col w-full gap-5 p-3" onClick={() => setCopyReferralUrl(true)}>
                            <h1 className="">https://www.skuubit.com/register?refCode={userData.uid}</h1>
                            <button className="w-auto h-auto px-5 py-1 flex gap-2 justify-center items-center rounded-xl" style={{ backgroundColor: "rgb(40, 40, 40)" }}>
                                {copyReferralUrl ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                        <p>Copiato</p>
                                    </>
                                ) : (
                                    <FontAwesomeIcon icon={faClipboard} className="text-green-500" />
                                )}
                            </button>
                        </div>
                        <li class="flex items-center gap-3">
                            <FontAwesomeIcon icon={faMessage} className="text-green-500" />
                            Invialo alla Persona che Vuoi Invitare
                        </li>
                        <li class="flex items-center gap-3">
                            <FontAwesomeIcon icon={faUser} className="text-green-500" />
                            La Persona dovrà Registrarsi
                        </li>
                        <li class="flex items-center gap-3">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                            Ed il Gioco è Fatto!
                        </li>
                    </ul>
                    <div className="w-full mt-7 px-5 h-24 flex flex-col gap-3 justify-center items-center rounded-xl" style={{ backgroundColor: "rgb(40, 40, 40)" }}>
                        <h1 className="flex flex-row gap-2 justify-center items-center">
                            <Image src={SkuuTapCoin} className="h-7 w-auto" />
                            {userReferralPercentual.toFixed(0)}
                        </h1>
                        <button disabled={authorizedReferralRedeem} className={"text-sm py-1 px-3 text-white rounded-full " + (authorizedReferralRedeem ? "bg-gray-500 text-xs cursor-not-allowed" : "bg-green-600")} onClick={
                            async () => {
                                await setUserRedeemedReferralCoin(userData.uid, userReferralPercentual);
                            }
                        }>
                            Ritira
                        </button>
                    </div>
                    <div className="w-full flex flex-col gap-3 mt-5 p-3">
                        <h1 className="text-2xl font-semibold">Persone Invitate</h1>
                        <div className="flex flex-wrap gap-2 w-full text-white h-24 overflow-scroll">
                            {userFriends.map((item, index) => {
                                return item ? (
                                    <div key={index} className="w-full h-16 rounded-xl flex flex-row gap-3 p-4 items-center" style={{ backgroundColor: 'rgb(40, 40, 40)' }}>
                                        <Image className="h-full w-auto rounded-full " src={item.photoURL ? item.photoURL : noPhotoURL} />
                                        <div>
                                            <h1>{item.displayName}</h1>
                                            <p className="text-xs text-gray-400">{item.email}</p>
                                        </div>
                                        <div className="w-full h-full flex flex-row gap-2 justify-end items-center">
                                            <p>{item.coinNumber}</p>
                                            <Image className="h-full w-auto rounded-full" src={SkuuTapCoin} />
                                        </div>
                                    </div>
                                ) : (<></>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}