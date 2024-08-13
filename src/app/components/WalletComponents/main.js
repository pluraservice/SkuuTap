import WalletCP from "./Wallet/Wallet";
import DepositWallet from "./WalletAction/Deposit";
import WalletSettings from "./WalletSettings/WalletSettings";
import Withdraw from "./WalletAction/Withdraw";
import Transfer from "./WalletAction/Transfer";

export default function WalletComponents({ componentName, userData, setError }) {
    let componentToRender;
    switch (componentName) {
        case 'Wallet':
            componentToRender = <WalletCP userData={userData} setError={setError} />;
            break;
        case 'DepositWallet':
            componentToRender = <DepositWallet userData={userData} setError={setError} />;
            break;
        case 'WalletSettings':
            componentToRender = <WalletSettings userData={userData} setError={setError} />;
            break;
        case 'Withdraw':
            componentToRender = <Withdraw userData={userData} setError={setError} />;
            break;
        case 'Transfer':
            componentToRender = <Transfer userData={userData} setError={setError} />
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