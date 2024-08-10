import { TasksList } from "@/app/data-list/TasksList";
import getUserTapCoin from "@/app/functions/api/getUserTapCoin";
import Image from "next/image";
import { useEffect, useState } from "react";
import noPhotoURL from "@/app/assets/img/noPhotoURL.png";
import getUserFriends from "@/app/functions/api/getUserFriends";
import loginAccount from "@/app/functions/api/loginAccount";

export default function Tasks({ userData, setViewVideo, setShowInstagramAlert }) {
    const [userCoinNumber, setUserCoinNumber] = useState(0);
    const [taskStatuses, setTaskStatuses] = useState({});
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userCoinGet = await getUserTapCoin(userData.uid);
            setUserCoinNumber(userCoinGet.coin);
            const referrals = await getUserFriends(userData.uid);
            let referralDataArray = [];
            await Promise.all(
                Object.values(referrals).map((item) => {
                    if (item) {
                        return Promise.all(Object.values(item).map(async (itemUid) => {
                            const getUserInfo = await loginAccount(itemUid.email, itemUid.password);
                            const userCoinNumber = await getUserTapCoin(getUserInfo.data.uid);
                            referralDataArray.push({
                                ...getUserInfo.data,
                                coinNumber: userCoinNumber.coin
                            });
                        }));
                    }
                })
            );
            setUserFriends(referralDataArray);
            const statuses = {};
            for (const task of TasksList) {
                if (task.Type === "VIDEO" || task.Type === "FOLLOW") {
                    const isRedeemed = await task.getIsRedeemed(userData.uid);
                    statuses[task.Id] = {
                        isCompleted: isRedeemed.result ? isRedeemed.isRedeemed : false,
                        isRedeemed: isRedeemed.result ? isRedeemed.isRedeemed : false,
                    };
                } else {
                    const isCompleted = await task.getIsCompleted(userData.uid);
                    const isRedeemed = await task.getIsRedeemed(userData.uid);
                    statuses[task.Id] = {
                        isCompleted: isCompleted.result ? isCompleted.isCompleted : false,
                        isRedeemed: isRedeemed.result ? isRedeemed.isRedeemed : false,
                    };
                }
            }
            setTaskStatuses(statuses);
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [userData]);

    const handleRedeemPrize = async (task) => {
        const response = await task.redeemPrize(userData.uid);
        if (response.result) {
            setUserCoinNumber(prevCoins => prevCoins + 100);
            setTaskStatuses(prevStatuses => ({
                ...prevStatuses,
                [task.Id]: { ...prevStatuses[task.Id], isRedeemed: true }
            }));
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full h-full gap-2 p-4">
                <h1 className="text-2xl font-semibold">SkuuTap Tasks</h1>
                <p className="text-gray-400 text-xs">
                    Benvenuto nella sezione Tasks di SkuuTap! Qui troverai una serie di missioni avvincenti e coinvolgenti
                    che ti permetteranno di guadagnare coin e avanzare nel progetto. Ogni task è stata progettata per offrirti
                    sfide uniche e divertenti, permettendoti di mettere alla prova le tue abilità e di esplorare nuove opportunità.
                </p>
                <div className="w-full md:h-[600px] h-[500px] overflow-scroll flex flex-col" style={{ paddingBottom: "120px" }}>
                    {TasksList.map((item, index) => {
                        const taskStatus = taskStatuses[item.Id] || {};
                        return (
                            <div key={index} className="w-full h-auto flex flex-col gap-3 py-3 border-b border-gray-400">
                                <div className="w-full h-full flex flex-row gap-2">
                                    <Image src={item.IconUrl || noPhotoURL} className="h-10 w-auto rounded-full" />
                                    <div className="w-auto whitespace-nowrap flex flex-col justify-center">
                                        <h1>{item.Title}</h1>
                                        <p className="text-xs text-gray-400">
                                            {
                                                item.Id === "1" ? item.Descrizione.replace("-INFO-", userCoinNumber) :
                                                    item.Id === "2" ? item.Descrizione.replace("-INFO-", userCoinNumber) :
                                                        item.Id === "3" ? item.Descrizione.replace("-INFO-", userCoinNumber) :
                                                            item.Id === "4" ? item.Descrizione.replace("-INFO-", userCoinNumber) :
                                                                item.Id === "5" ? item.Descrizione.replace("-INFO-", userFriends.length) :
                                                                    item.Descrizione
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-1 justify-center items-end">
                                    <button
                                        className={"w-full px-5 py-1 text-sm rounded-full " + (!taskStatus.isCompleted || taskStatus.isRedeemed ? "bg-gray-500 text-xs cursor-not-allowed" : "bg-green-600")}
                                        disabled={!taskStatus.isCompleted || taskStatus.isRedeemed}
                                        onClick={() => handleRedeemPrize(item)}
                                    >
                                        {(!taskStatus.isCompleted ? item.buttonText : taskStatus.isRedeemed ? "Ricompensa Riscattata" : item.buttonText)}
                                    </button>
                                    {item.Type === "VIDEO" ? (
                                        <>
                                            <button
                                                className="w-full px-5 py-1 text-sm rounded-full bg-red-500"
                                                onClick={() => {
                                                    setViewVideo({
                                                        view: true,
                                                        item: item
                                                    })
                                                }}
                                            >
                                                Guarda Video
                                            </button>
                                        </>
                                    ) : ""}
                                    {item.Type === "FOLLOW" ? (
                                        <>
                                            <button
                                                className="w-full px-5 py-1 text-sm rounded-full bg-purple-800"
                                                onClick={() => window.open(item.followAccountLink)}
                                            >
                                                Segui Account
                                            </button>
                                            <button
                                                className="w-full px-5 py-1 text-sm rounded-full bg-green-500"
                                                onClick={() => {
                                                    setShowInstagramAlert(true);
                                                }}
                                            >
                                                Esegui Verifica per Riscattare la Ricompensa
                                            </button>
                                        </>
                                    ) : ""}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
