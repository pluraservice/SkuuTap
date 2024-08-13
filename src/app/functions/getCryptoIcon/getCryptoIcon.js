function importAll(r) {
    let icons = {};
    r.keys().forEach((key) => {
        const iconName = key.replace('./', '').replace('.png', '');
        icons[iconName] = r(key).default;
    });
    return icons;
}

const cryptoIcons = importAll(require.context('../../assets/img/icons/cryptoIcons', false, /\.png$/));
export default function getCryptoIcon(cryptoName) {
    return cryptoIcons[cryptoName];
}