export default async function cryptoToUsdt(cryptoSymbol, cryptoAmount) {
    const apiUrl = `https://api.bitget.com/api/v2/mix/market/ticker?symbol=${cryptoSymbol}USDT&productType=USDT-FUTURES`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.code === '00000') {
            const priceInUsdt = parseFloat(data.data[0].lastPr);
            return cryptoAmount * priceInUsdt;
        } else {
            return 0;
        }
    } catch (error) {
        return 0;
    }
}