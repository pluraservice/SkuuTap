import { Poppins } from "next/font/google";
import Script from 'next/script'
import "./assets/css/style.css";
const poppins = Poppins({ weight: "300", subsets: ["latin"] })

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta http-equiv="X-Content-Type-Options" content="nosniff" />
                <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
                <meta http-equiv="X-Frame-Options" content="DENY" />
                <meta name="referrer" content="no-referrer" />
                <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
                {/* <Script disable-devtool-auto="true" src='https://cdn.jsdelivr.net/npm/disable-devtool' /> */}
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#000000" id="theme-color-meta-tag" />
                <meta name="keywords" content="skuubit, SkuuBit, onaliskuu, gabriele onali, exchange, crypto, futures, spot, copytrading, danilo, danilo giannotta" />
                <meta name="description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta name="author" content="SkuuBit | Gabriele Onali" />
                <meta name="robots" content="index,follow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="SkuuBit" />
                <meta property="og:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta property="og:url" content="https://www.skuubit.com/" />
                <meta property="og:site_name" content="SkuuBit" />
                <meta property="og:locale" content="it_IT" />
                <meta property="og:image" content="https://skuubet.com/img/misc/logo.png" />
                <link rel="icon" href="https://skuubet.com/img/misc/logo.png" />
                <link rel="mask-icon" href="https://skuubet.com/img/misc/logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@SkuuBit" />
                <meta name="twitter:title" content="SkuuBit" />
                <meta name="twitter:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta property="twitter:image" content="https://skuubet.com/img/misc/logo.png" />
                <meta name="instagram:card" content="summary_large_image" />
                <meta name="instagram:site" content="@skuubit.com" />
                <meta name="instagram:title" content="SkuuBit" />
                <meta name="instagram:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta name="Instagram:site" content="SkuuBit.com" />
                <meta property="Instagram:image" content="https://skuubet.com/img/misc/logo.png" />
                <meta name="Linkedin:card" content="summary_large_image" />
                <meta name="Linkedin:site" content="@SkuuBit" />
                <meta name="Linkedin:title" content="SkuuBit" />
                <meta name="Linkedin:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta name="Linkedin:site" content="skuubit" />
                <meta property="LinkedIn:image" content="https://skuubet.com/img/misc/logo.png" />
                <meta name="Facebook:card" content="summary_large_image" />
                <meta name="Facebook:site" content="@SkuuBit" />
                <meta name="Facebook:title" content="SkuuBit" />
                <meta name="Facebook:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta name="Facebook:site" content="SkuuBit" />
                <meta property="Facebook:image" content="https://skuubet.com/img/misc/logo.png" />
                <meta name="Telegram:card" content="summary_large_image" />
                <meta name="Telegram:site" content="@SkuuBit" />
                <meta name="Telegram:title" content="SkuuBit" />
                <meta name="Telegram:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta name="Telegram:site" content="SkuuBit" />
                <meta property="Telegram:image" content="https://skuubet.com/img/misc/logo.png" />
                <meta name="Discord:card" content="summary_large_image" />
                <meta name="Discord:site" content="@SkuuBit" />
                <meta name="Discord:title" content="SkuuBit" />
                <meta name="Discord:description" content="SkuuBit, l'innovativo exchange creato da Onaliskuu e il suo team di developer, offre un'esperienza di trading sicura, veloce e intuitiva per gli appassionati di criptovalute." />
                <meta name="Discord:site" content="SkuuBit" />
                <meta property="Discord:image" content="https://skuubet.com/img/misc/logo.png" />
                <title>SkuuBit</title>
            </head>
            <body className={poppins.className}>{children}</body>
        </html>
    )
} 