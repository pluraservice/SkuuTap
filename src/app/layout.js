import { Poppins } from "next/font/google";
import "./assets/css/style.css";
const poppins = Poppins({ weight: "300", subsets: ["latin"] })

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>SkuuTap</title>
            </head>
            <body className={poppins.className}>{children}</body>
        </html>
    )
}