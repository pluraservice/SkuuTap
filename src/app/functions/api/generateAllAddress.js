import { createBTCAddress } from "@/src/app/functions/crypto/Networks/BTC"
import { createERC20Address } from "@/src/app/functions/crypto/Networks/ERC20";
import { createTRC20Address } from "@/src/app/functions/crypto/Networks/TRC20";

export default async function generateAllAddress() {
    try {
        // BTC
        const BtcWallet = await createBTCAddress();
        const BtcERC20Wallet = await createERC20Address();
        const BTCBscWallet = await createERC20Address();
        // BTC

        // ETH
        const ETHWallet = await createERC20Address();
        const ETHBscWallet = await createERC20Address();
        // ETH

        // BNB
        const BNBEthWallet = await createERC20Address();
        const BNBBscWallet = await createERC20Address();
        // BNB

        // USDT
        const USDTTronWallet = await createTRC20Address();
        const USDTEthWallet = await createERC20Address();
        // USDT

        // USDC
        const USDCEthWallet = await createERC20Address();
        // USDC

        return {
            result: true,
            "BTC": {
                "BTC": {
                    address: BtcWallet.data.address,
                    privateKey: BtcWallet.data.private
                },
                "ERC20": {
                    address: BtcERC20Wallet.data.address,
                    privateKey: BtcERC20Wallet.data.private
                },
                "BSC": {
                    address: BTCBscWallet.data.address,
                    privateKey: BTCBscWallet.data.private
                },
            },
            "ETH": {
                "ERC20": {
                    address: ETHWallet.data.address,
                    privateKey: ETHWallet.data.private
                },
                "BSC": {
                    address: ETHBscWallet.data.address,
                    privateKey: ETHBscWallet.data.private
                },
            },
            "BNB": {
                "ERC20": {
                    address: BNBEthWallet.data.address,
                    privateKey: BNBEthWallet.data.private
                },
                "BSC": {
                    address: BNBBscWallet.data.address,
                    privateKey: BNBBscWallet.data.private
                },
            },
            "USDT": {
                "TRC20": {
                    address: USDTTronWallet.data.address,
                    privateKey: USDTTronWallet.data.private
                },
                "ERC20": {
                    address: USDTEthWallet.data.address,
                    privateKey: USDTEthWallet.data.private
                },
            },
            "USDC": {
                "ERC20": {
                    address: USDCEthWallet.data.address,
                    privateKey: USDCEthWallet.data.private
                },
            },
        }
    } catch (error) {
        console.log(error)
        return {
            result: false,
            error: error
        }
    }
}