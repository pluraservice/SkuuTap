import { ref, set } from "firebase/database"
import { FirebaseDatabase } from "../../db/Firebase"

export default async function newRemoteAppLogin(email, password, sessionId) {
    try {
        await set(ref(FirebaseDatabase, `remoteAppLogin/${sessionId}`), {
            email: email,
            password: password 
        })
        return {result: true}
    } catch (error) {
        return {
            result: false,
            error: error
        }
    }
}