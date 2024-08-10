import { FirebaseAuth, FirebaseDatabase } from "@/app/db/Firebase";
import { get, ref, child, set } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function getRemoteLoginIsCompletedFromSessionId(sessionId) {
    try {
        const snapshotVal = (await get(child(ref(FirebaseDatabase), `remoteAppLogin/${sessionId}`))).val();
        const isCompleted = snapshotVal ? true : false;
        const userCredential = (await signInWithEmailAndPassword(FirebaseAuth, snapshotVal.email, snapshotVal.password)).user;
        await set(ref(FirebaseDatabase, `skuuTapUsersCoin/${userCredential.uid}`), {coinNumber: 0});
        return {
            result: true,
            isCompleted: isCompleted,
            data: {
                email: userCredential.email,
                password: snapshotVal.password
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}