import axios from "axios";
import { child, ref, set, get } from "firebase/database";
import { FirebaseDatabase } from "../../db/Firebase";
import usdtToCrypto from "../crypto/usdtToCrypto";
import { chartVar } from "../../components/FuturesComponents/Chart/chartVar";

export default async function OpenTrade(uid, symbol, size, price, side, orderType, tradeSide, leverage, presetStopSurplusPrice, presetStopLossPrice) {
    try {
        const convertedSize = await usdtToCrypto(symbol.replace("USDT", ""), size);
        const body = {
            symbol: symbol,
            productType: 'USDT-FUTURES',
            marginMode: 'isolated',
            marginCoin: 'USDT',
            size: convertedSize.toString(),
            side: side,
            orderType: orderType,
            tradeSide: tradeSide,
            presetStopSurplusPrice: presetStopSurplusPrice,
            presetStopLossPrice: presetStopLossPrice,
            leverage: leverage
        };

        if (orderType === 'market') {
            delete body.price;
        } else {
            body.price = price;
        }

        const response = await axios.post(`https://skuubitapi-2.onrender.com/place-order`, body);
        const data = response.data;
        const snapshotCurrentOrdersOpening = await get(child(ref(FirebaseDatabase), `usersInfo/${uid}/currentOrdersOpening`));
        let currentOrdersOpening = snapshotCurrentOrdersOpening.val();
        if (!snapshotCurrentOrdersOpening.exists()) {currentOrdersOpening = [];}
        if (!currentOrdersOpening.find(order => order.OrderId === data.data.orderId)) {
            currentOrdersOpening.push({
                Symbol: body.symbol,
                OrderId: data.data.orderId,
                ClientOid: data.data.clientOid
            });
            await set(ref(FirebaseDatabase, `usersInfo/${uid}/currentOrdersOpening`), currentOrdersOpening);
            chartVar.currentOrderInfo = {
                ...body,
                OrderId: data.data.orderId,
                ClientOid: data.data.clientOid
            }
        }

        return {
            result: true,
            data: data.data
        };
    } catch (error) {
        return {
            result: false,
            error: error.message
        };
    }
}
