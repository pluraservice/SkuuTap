import { useEffect, useState } from "react";
import { chartVar } from "./chartVar";

export default function Chart({ cryptoSelezionated }) {
    const [showTimeContainer, setShowTimeContainer] = useState(false);
    const [timeInterval, setTimeInterval] = useState('1');
    const [isMobile, setIsMobile] = useState(false);
    const [dropdownTimeFrame, setDropdownTimeFrame] = useState(false);
    const [haveStudy, setHaveStudy] = useState(false);

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth <= 1340); };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, []);

    const handleTimeIntervalChange = (interval) => {
        setTimeInterval(interval);
        setShowTimeContainer(false);
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="w-auto h-full flex flex-row gap-3">
                <div className="flex flex-row gap-3 whitespace-nowrap items-center" style={{ zIndex: 99 }}>
                    <h1 className="text-white font-semibold text-2xl">{cryptoSelezionated + "USDT"}</h1>
                </div>
                <div className="w-full h-full flex flex-row gap-3 justify-end items-center">
                    <button className={"py-2 px-2 text-sm rounded-full " + (haveStudy ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => setHaveStudy(!haveStudy)}>Indicatori di Base</button>
                    {!isMobile ? (
                        <>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "1" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1')}>1 Min</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "3" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('3')}>3 Min</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "5" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('5')}>5 Min</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "15" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('15')}>15 Min</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "30" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('30')}>30 Min</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "60" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('60')}>1 Hour</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "120" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('120')}>2 Hours</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "240" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('240')}>4 Hours</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "360" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('360')}>6 Hours</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "720" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('720')}>12 Hours</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "1D" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1D')}>1 Day</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "1W" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1W')}>1 Week</button>
                            <button className={"py-2 px-2 text-sm rounded-full " + (timeInterval === "1M" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1M')}>1 Month</button>
                        </>
                    ) : (
                        <>
                            <button style={{ backgroundColor: 'rgb(30, 30, 30)' }} className="text-white p-2 rounded-xl" onClick={() => setDropdownTimeFrame(!dropdownTimeFrame)}>Time Frame</button>
                            {dropdownTimeFrame && (
                                <div className="absolute w-48 flex flex-wrap justify-center items-center p-2 gap-3 rounded-xl" style={{ backgroundColor: 'rgb(40, 40, 40)', zIndex: 100, marginTop: "430px" }}>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "1" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1')}>1 Min</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "3" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('3')}>3 Min</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "5" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('5')}>5 Min</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "15" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('15')}>15 Min</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "30" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('30')}>30 Min</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "60" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('60')}>1 Hour</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "120" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('120')}>2 Hours</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "240" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('240')}>4 Hours</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "360" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('360')}>6 Hours</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "720" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('720')}>12 Hours</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "1D" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1D')}>1 Day</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "1W" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1W')}>1 Week</button>
                                    <button className={"p-2 rounded-xl " + (timeInterval === "1M" ? "CyanColor" : "text-white")} style={{ backgroundColor: 'rgb(20, 20, 20)' }} onClick={() => handleTimeIntervalChange('1M')}>1 Month</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <iframe src={`https://cozy-hamster-db1d1e.netlify.app/?interval=${timeInterval}&symbol=${cryptoSelezionated + "/USDT"}&locale=it&haveStudy=${haveStudy}&currentOrderInfo=${new URLSearchParams(chartVar.currentOrderInfo).toString()}`} className="rounded-xl" style={{ height: "600px" }} />
        </div>
    );
}
