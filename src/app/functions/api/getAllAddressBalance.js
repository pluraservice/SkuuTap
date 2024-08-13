import { getBTCWalletBalanceFromAddress } from "@/src/app/functions/crypto/Networks/BTC"
import { getERC20WalletBalanceFromAddress } from "@/src/app/functions/crypto/Networks/ERC20";
import { getTRC20WalletBalanceFromAddress } from "@/src/app/functions/crypto/Networks/TRC20";
import { getBEP20WalletBalanceFromAddress } from "../crypto/Networks/BEP20";

export default async function getAllAddressBalance(uid) {
    // BTC
    const BtcBalance = (await getBTCWalletBalanceFromAddress(uid, "BTC", "BTC")).balance;
    const BtcERC20Balance = (await getERC20WalletBalanceFromAddress(uid, "BTC", "ERC20")).balance;
    const BTCBscBalance = (await getERC20WalletBalanceFromAddress(uid, "BTC", "BSC")).balance;
    // BTC

    // ETH
    const ETHBalance = (await getERC20WalletBalanceFromAddress(uid, "ETH", "ERC20")).balance;
    // const ETHBscBalance = (await getERC20WalletBalanceFromAddress(uid, "ETH", "ERC20")).balance;
    // const ETHUsdtBalance = (await getERC20WalletBalanceFromAddress(uid, "USDT", "ERC20")).balance;
    // const ETHUsdcBalance = (await getERC20WalletBalanceFromAddress(uid, "USDC", "ERC20")).balance;
    // ETH

    // BNB
    // const BNBEthBalance = (await getERC20WalletBalanceFromAddress(uid, "BNB", "ERC20")).balance;
    const BNBBscBalance = (await getBEP20WalletBalanceFromAddress(uid, "BNB", "BSC")).balance;
    // BNB

    // USDT
    const USDTTronBalance = (await getTRC20WalletBalanceFromAddress(uid, "USDT", "TRC20")).balance;
    const USDTEthBalance = (await getERC20WalletBalanceFromAddress(uid, "USDT", "ERC20")).balance;
    // USDT

    // USDC
    const USDCEthWallet = (await getERC20WalletBalanceFromAddress(uid, "USDC", "ERC20")).balance;
    // USDC

    // TRX
    const TRXWallet = (await getTRC20WalletBalanceFromAddress(uid, "TRX", "TRC20")).balance;
    // TRX

    return {
        "BTC": Number(BtcBalance ? BtcBalance : 0) + Number(BtcERC20Balance ? BtcERC20Balance : 0) + Number(BTCBscBalance ? BTCBscBalance : 0),
        "ETH": Number(ETHBalance ? ETHBalance : 0), // + Number(ETHBscBalance ? ETHBscBalance : 0) + Number(ETHUsdtBalance ? ETHUsdtBalance : 0) + Number(ETHUsdcBalance ? ETHUsdcBalance : 0),
        "BNB": Number(BNBBscBalance ? BNBBscBalance : 0), // Number(BNBEthBalance ? BNBEthBalance : 0) +
        "USDT": Number(USDTTronBalance ? USDTTronBalance : 0) + Number(USDTEthBalance ? USDTEthBalance : 0),
        "USDC": Number(USDCEthWallet ? USDCEthWallet : 0),
        "TRX": Number(TRXWallet ? TRXWallet : 0)
    }
}