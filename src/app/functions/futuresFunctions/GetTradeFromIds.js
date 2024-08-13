import axios from "axios";
import { child, get, ref } from "firebase/database";
import { FirebaseDatabase } from "../../db/Firebase";

async function getOrderInfoFromApi(clientOid, orderId, symbol) {
    try {
        const body = { clientOid: clientOid, orderId: orderId, symbol: symbol };
        const response = await axios.post(`https://skuubitapi-2.onrender.com/order-info`, body);
        return response.data.data;
    } catch (error) {
        return { error: error.message, details: error.response ? error.response.data : error };
    }
}

export default async function GetTradeFromIds(uid) {
    try {
        const currentOrdersOpeningFromUidSnapshot = await get(child(ref(FirebaseDatabase), `usersInfo/${uid}/currentOrdersOpening`));
        if (!currentOrdersOpeningFromUidSnapshot.exists()) {
            return {
                result: true,
                orders: []
            };
        }

        const currentOrdersOpeningFromUid = currentOrdersOpeningFromUidSnapshot.val();
        const orderInfoPromises = currentOrdersOpeningFromUid.map(order => getOrderInfoFromApi(order.ClientOid, order.OrderId, order.Symbol));
        const ordersInfo = await Promise.all(orderInfoPromises);

        return {
            result: true,
            orders: ordersInfo
        };
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}