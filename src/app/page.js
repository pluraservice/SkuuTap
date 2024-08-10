"use client";
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getRemoteLoginIsCompletedFromSessionId from './functions/api/getRemoteLoginIsCompletedFromSessionId';
import encodeBase64 from './functions/base64/encode';

export default function MainHome() {
    const randomId = uuidv4();
    useEffect(() => {
        const fetchRemoteLogin = async () => {
            const remoteLogin = await getRemoteLoginIsCompletedFromSessionId(randomId);
            if (remoteLogin.result && remoteLogin.isCompleted) {
                localStorage.setItem("SkuuTap | Account Saved", encodeBase64(JSON.stringify(remoteLogin.data)));
                window.open("/main", "_self");
            } 
        }

        fetchRemoteLogin();                                                                                                                 
        const interval = setInterval(fetchRemoteLogin, 1000);
        return () => clearInterval(interval);
    }, [randomId])

    useEffect(() => {
        if (localStorage.getItem("SkuuTap | Account Saved")) {
            window.open("/main", "_self");
        }
    }, [])

    return (
        <div className='flex flex-row flex-phone'>
           <div className="SkuuTap-LoginForm h-screen">
                <h1>SkuuTap</h1>
                <button onClick={() => window.open(`https://skuubit.pages.dev/remoteAppLogin?appName=SkuuTap&sessionId=${randomId}`)}>Accedi dal Nostro Exchange</button>
                <div className="SkuuTap-Terms">
                    <p>Termini e Condizioni</p>
                    <div className="separator"></div>
                    <p>Cosè?</p>
                </div>
           </div>
        </div>
    );
}
