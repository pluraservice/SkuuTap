import Image from "next/image";
import noPhotoURL from "@/app/assets/img/noPhotoURL.png";
import SkuuTapGameCharacter from "@/app/assets/img/SkuuTapGameCharacter.png";
import SkuuTapCoin from "@/app/assets/img/SkuuTapCoin.png";
import SkuuTapCardBackground from "@/app/assets/img/cardbg.png"

export default function Home({ userData, setPlayGame, userTapCoin, playGame }) {
    return (
        <div className="w-full h-full py-5 flex flex-col justify-center items-center gap-6">
            <Image src={userData.photoURL ? userData.photoURL : noPhotoURL} className="w-32 rounded-full" />
            <h1 className="text-2xl">{userData.displayName}</h1>
            <div className="flex flex-row justify-center items-center gap-3">
                <Image src={SkuuTapCoin} className="w-12 rounded-full" />
                <h1 className="text-2xl">{userTapCoin}</h1>
            </div>
            <div className="w-full flex justify-center items-center mt-10">
                <div className="relative grid h-[15rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                    <Image className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none" src={SkuuTapCardBackground} />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-bg-black-10"></div>
                    <div className="relative w-full h-full justify-center items-center flex flex-row gap-3 leading-[1.5] tracking-normal text-white antialiased">
                        <Image src={SkuuTapGameCharacter} className="w-24" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-semibold">SkuuTap Game</h1>
                            <button className="SkuuTap-PlayButton" onClick={() => setPlayGame(!playGame)}>{(!playGame ? "Gioca" : "Esci dalla Partita")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}