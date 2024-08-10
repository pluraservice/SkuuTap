export default async function addTapGameCoin(uid, coinNumber) {
    try {
        const currentCoins = (await get(child(ref(FirebaseDatabase), `skuuTapUsersCoin/${uid}/coinNumber`))).val() || 0;
        await update(ref(FirebaseDatabase, `skuuTapUsersCoin/${uid}`), { coinNumber: currentCoins + coinNumber });
        return {result: true}
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}