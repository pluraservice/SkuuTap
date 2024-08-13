import { blockchainPatterns } from "../../data-lists/BlockChainPatterns";

export default function getNetworkNameFromAddressString(address) {
    for (const blockchain of blockchainPatterns) {
        if (blockchain.pattern.test(address)) {
            return blockchain.name;
        }
    }

    return null;
}
