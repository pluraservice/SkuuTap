import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function OrderBook({ cryptoSelezionated }) {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
    const [cryptoCost, setCryptoCost] = useState({ USDT: 0, EUR: 0 });
    const [newCryptoCost, setNewCryptoCost] = useState({ USDT: 0, EUR: 0, type: "" });
    const [filterBase, setFilterBase] = useState(0.01);

    const filterByBase = (price) => {
        const base = parseFloat(filterBase);
        return Math.floor(price / base) * base === price || Math.ceil(price / base) * base === price;
    };    

    useEffect(() => {
        const fetchOrderBook = async () => {
            try {
                const orderBookUrl = `https://api.bybit.com/v5/market/orderbook?category=inverse&symbol=${cryptoSelezionated}USDT&limit=1000`;
                const tickersUrl = `https://api.bybit.com/v5/market/tickers?category=inverse&symbol=${cryptoSelezionated}USDT`;

                const responseOrderBook = await axios.get(orderBookUrl);
                const responseTickers = await axios.get(tickersUrl);

                const dataOrderBook = responseOrderBook.data.result;
                const tickerData = responseTickers.data.result.list.find(ticker => ticker.symbol === `${cryptoSelezionated}USDT`);

                if (dataOrderBook) {
                    const { b: bids, a: asks } = dataOrderBook;
                    const filteredBids = bids.filter(bid => filterByBase(parseFloat(bid[0])));
                    const filteredAsks = asks.filter(ask => filterByBase(parseFloat(ask[0])));
                    setOrderBook({ bids: filteredBids, asks: filteredAsks });
                }

                if (tickerData) {
                    const newUSDT = parseFloat(tickerData.lastPrice);
                    const newEUR = parseFloat(tickerData.lastPrice);
                    const newType = cryptoCost.USDT > newUSDT ? "NEG" : "POS";
                    setNewCryptoCost({ USDT: newUSDT, EUR: newEUR, type: newType });
                    setCryptoCost({ USDT: newUSDT, EUR: newEUR });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrderBook();
        const intervalId = setInterval(fetchOrderBook, 72000);
        return () => clearInterval(intervalId);
    }, [cryptoSelezionated, cryptoCost, filterBase]);

    return (
        <div className="w-full h-auto flex flex-col gap-3 justify-center whitespace-nowrap SkuuBit-DefaultContainer">
            <div className='flex flex-row p-2'>
                <div className='w-full flex justify-end items-center'>
                    <select id="baseSelector" value={filterBase} onChange={(e) => setFilterBase(parseFloat(e.target.value))} className='rounded-xl' style={{ backgroundColor: "rgb(30, 30, 30)", padding: "5px" }}>
                        <option value={0.01}>0.01</option>
                        <option value={0.1}>0.1</option>
                        <option value={1}>1</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-row p-2'>
                <div className='w-1/3 flex justify-start items-center'>
                    <p>Price</p>
                </div>
                <div className='w-1/3 flex justify-center items-center'>
                    <p>Quantity (BTC)</p>
                </div>
                <div className='w-1/3 flex justify-end items-center'>
                    <p>Total</p>
                </div>
            </div>
            <div className="w-full h-48 overflow-scroll">
                {orderBook.bids.length > 0 ? (
                    orderBook.bids.map((bid, index) => (
                        <div key={index} className="SkuuBit-OrderBookInfoContainer mt-2 flex flex-row">
                            <div className='w-1/3 text-green-400'>{parseFloat(bid[0]).toFixed(2)}</div>
                            <div className='w-1/3 flex justify-center'>{parseFloat(bid[1]).toFixed(6)}</div>
                            <div className='w-1/3 flex justify-end'>{(parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(2)}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No bid data available.</p>
                )}
            </div>
            <div className="w-full h-auto flex flex-row gap-2 items-center SkuuBit-DefaultContainer">
                <h1 className={'text-xl ' + (newCryptoCost.type === "POS" ? 'text-green-400' : 'text-red-500')}>{newCryptoCost.USDT}</h1>
                {newCryptoCost.type === "POS" ? (
                    <FontAwesomeIcon icon={faArrowUp} className='text-green-400' />
                ) : (
                    <FontAwesomeIcon icon={faArrowDown} className='text-red-500' />
                )}
                <p className='text-gray-400 text-sm'>{"€ " + newCryptoCost.EUR}</p>
            </div>
            <div className="w-full h-48 overflow-scroll">
                {orderBook.asks.length > 0 ? (
                    orderBook.asks.map((ask, index) => (
                        <div key={index} className="SkuuBit-OrderBookInfoContainer mt-2 flex flex-row">
                            <div className='w-1/3 text-red-500'>{parseFloat(ask[0]).toFixed(2)}</div>
                            <div className='w-1/3 flex justify-center'>{parseFloat(ask[1]).toFixed(6)}</div>
                            <div className='w-1/3 flex justify-end'>{(parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(2)}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No ask data available.</p>
                )}
            </div>
        </div>
    );
}
