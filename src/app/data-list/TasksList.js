import { child, get, ref, update } from "firebase/database";
import getUserTapCoin from "../functions/api/getUserTapCoin";
import { FirebaseDatabase } from "../db/Firebase";
import SkuuTapCoin from "@/app/assets/img/SkuuTapCoin.png";
import YoutubeLogo from "@/app/assets/img/youtube.png";
import referralLogo from "@/app/assets/img/referral.png";
import InstagramLogo from "@/app/assets/img/instagram.png";

export const TasksList = [
    {
        Id: "1",
        Type: "COIN",
        Title: "Raccogli 1.000 Coin",
        Descrizione: "Coin Raccolti -INFO- / 1.000",
        IconUrl: SkuuTapCoin,
        buttonText: "+ 825",
        getIsCompleted: async (uid) => {
            try {
                const userCoinNumber = await getUserTapCoin(uid);
                return {
                    result: true,
                    isCompleted: userCoinNumber.coin >= 1000
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task1`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 825 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task1`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
    {
        Id: "2",
        Type: "COIN",
        Title: "Raccogli 5.000 Coin",
        Descrizione: "Coin Raccolti -INFO- / 5.000",
        IconUrl: SkuuTapCoin,
        buttonText: "+ 1250",
        getIsCompleted: async (uid) => {
            try {
                const userCoinNumber = await getUserTapCoin(uid);
                return {
                    result: true,
                    isCompleted: userCoinNumber.coin >= 5000
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task2`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 1250 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task2`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
    {
        Id: "3",
        Type: "COIN",
        Title: "Raccogli 10.000 Coin",
        Descrizione: "Coin Raccolti -INFO- / 10.000",
        IconUrl: SkuuTapCoin,
        buttonText: "+ 1800",
        getIsCompleted: async (uid) => {
            try {
                const userCoinNumber = await getUserTapCoin(uid);
                return {
                    result: true,
                    isCompleted: userCoinNumber.coin >= 10000
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task3`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 1800 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task3`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
    {
        Id: "4",
        Type: "COIN",
        Title: "Raccogli 15.000 Coin",
        Descrizione: "Coin Raccolti -INFO- / 15.000",
        IconUrl: SkuuTapCoin,
        buttonText: "+ 2500",
        getIsCompleted: async (uid) => {
            try {
                const userCoinNumber = await getUserTapCoin(uid);
                return {
                    result: true,
                    isCompleted: userCoinNumber.coin >= 15000
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task4`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 2500 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task4`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
    {
        Id: "5",
        Type: "REFERRAL",
        Title: "Invita 10 Amici",
        Descrizione: "Amici Invitati -INFO- / 10",
        IconUrl: referralLogo,
        buttonText: "+ 650",
        getIsCompleted: async (uid) => {
            try {
                const referrals = await getUserFriends(uid);
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
                return {
                    result: true,
                    isCompleted: referralDataArray.length >= 10
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task5`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 650 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task5`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
    {
        Id: "6",
        Type: "VIDEO",
        Title: "Guarda Video",
        Descrizione: "Guarda tutto il Video per Ricevere la tua Ricompensa",
        IconUrl: YoutubeLogo,
        VideoOptionsFrame: {
            url: "https://www.youtube.com/embed/ZKBgUDAj1tM?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1",
            time: {
                minute: "9",
                seconds: "59"
            }
        },
        buttonText: "+ 400",
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task6`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 400 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task6`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
    {
        Id: "7",
        Type: "FOLLOW",
        Title: "Iscriviti al Nostro Account Instagram",
        Descrizione: "Iscriviti al Nostro Account Instagram per Ricevere la Ricompensa",
        IconUrl: InstagramLogo,
        followAccountLink: "https://www.instagram.com/_danilo.gia_/",
        buttonText: "+ 400",
        getIsRedeemed: async (uid) => {
            try {
                const isRedeemed = (await get(child(ref(FirebaseDatabase), `skuuTapUsersRedeemTasks/${uid}/task6`))).val();
                return {
                    result: true,
                    isRedeemed: isRedeemed
                }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        },
        redeemPrize: async (uid) => {
            try {
                const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
                await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + 400 });
                await update(ref(FirebaseDatabase, `skuuTapUsersRedeemTasks/${uid}/task6`), { redeemed: true })
                return { result: true }
            } catch (error) {
                return {
                    result: false,
                    error: error.message
                }
            }
        }
    },
];