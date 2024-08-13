"use client";
import Image from "next/image";
import logo from "../../assets/img/logo.png";

export default function Footer() {
    return (
        <>
            <footer className="mt-10">
                <div class="w-full max-w-screen-xl p-5 mx-auto md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <Image src={logo} class="h-8 w-auto" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Skuu<span className="CyanColor">Bit</span></span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="/" class="hover:underline me-4 md:me-6">Home</a>
                            </li>
                            <li>
                                <a href="/wallet" class="hover:underline me-4 md:me-6">Wallet</a>
                            </li>
                            <li>
                                <a href="/marketoverview" class="hover:underline me-4 md:me-6">Market Overview</a>
                            </li>
                            <li>
                                <a href="/spot" class="hover:underline me-4 md:me-6">Spot</a>
                            </li>
                            <li>
                                <a href="/futures" class="hover:underline me-4 md:me-6">USDT-M Futures</a>
                            </li>
                            <li>
                                <a href="/referral" class="hover:underline me-4 md:me-6">Referral</a>
                            </li>
                            <li>
                                <a href="/cryptosignal" class="hover:underline me-4 md:me-6">Crypto Signal</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="/" class="hover:underline">Skuu<span className="CyanColor">Bit</span>™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </>
    );
}