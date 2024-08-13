import { FirebaseAuth, FirebaseDatabase } from "../../db/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import generateAllAddress from "../api/generateAllAddress";

export default async function createAccount(email, password, username) {
    if (!email || !password || !username) {
        return {
            result: false,
            error: 'Email, password, and username are required'
        }
    }

    if (password.length < 8) {
        return {
            result: false,
            error: 'Password is Too Short'
        }
    }

    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))) {
        return {
            result: false,
            error: 'Email is Not Valid'
        }
    }

    try {
        const wallets = await generateAllAddress();
        if (!wallets.result) {
            return {
                result: false,
                error: wallets.error
            }
        } else {
            const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });
            await user.reload();
            const uid = user.uid;
            await set(ref(FirebaseDatabase, `wallets/portFolio/${uid}`), { wallets });
            await set(ref(FirebaseDatabase, `usersInfo/${uid}`), {
                referral: []
            })
            return {
                result: true,
                data: user
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}