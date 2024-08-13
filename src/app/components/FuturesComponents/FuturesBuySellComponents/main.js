import LimitBuy from "./limit/Buy/Buy";
import LimitSell from "./limit/Sell/Sell";
import MarketBuy from "./market/Buy/Buy";
import MarketSell from "./market/Sell/Sell";

export default function FuturesBuySellComponents({ componentName, userData, setError, otherInfo, orderLeverage }) {
    let componentToRender;
    switch (componentName) {
        case "LimitBuy":
            componentToRender = <LimitBuy userData={userData} setError={setError} otherInfo={otherInfo} orderLeverage={orderLeverage} />;
            break;
        case "LimitSell":
            componentToRender = <LimitSell userData={userData} setError={setError} otherInfo={otherInfo} orderLeverage={orderLeverage} />;
            break;
        case "MarketBuy":
            componentToRender = <MarketBuy userData={userData} setError={setError} otherInfo={otherInfo} orderLeverage={orderLeverage} />;
            break;
        case "MarketSell":
            componentToRender = <MarketSell userData={userData} setError={setError} otherInfo={otherInfo} orderLeverage={orderLeverage} />;
            break;
        default:
            componentToRender = <div></div>;
    }

    return (
        <>
            {componentToRender}
        </>
    );
}