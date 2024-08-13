export const blockchainPatterns = [
    { pattern: /^0x[a-fA-F0-9]{40}$/, name: 'ERC20' },
    { pattern: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/, name: 'BTC' },
    { pattern: /^bnb1[0-9a-z]{38}$/, name: 'BSC' },
    { pattern: /^T[a-zA-Z0-9]{33}$/, name: 'TRC20' },
];