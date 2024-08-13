import { signInWithEmailAndPassword, updatePassword, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { FirebaseAuth, FirebaseStorage } from "../../db/Firebase";

export default async function updateUserInfo(email, password, infoType, body) {
    try {
        const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const user = userCredential.user;
        if (infoType === "Email") {
            if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(body.newEmail))) {
                return {
                    result: false,
                    error: "Email is Not Valid"
                }
            }
            await verifyBeforeUpdateEmail(user, body.newEmail);
            return { result: true }
        } else if (infoType === "DisplayName") {
            await updateProfile(user, {
                displayName: body.newName
            });
            return { result: true }
        } else if (infoType === "PhotoURL") {
            const dataUrl = body.base64String;
            const storageReference = storageRef(FirebaseStorage, `UserPhotoUrl/${user.uid}.png`);
            const byteString = atob(dataUrl.split(',')[1]);
            const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {ia[i] = byteString.charCodeAt(i);}
            const blob = new Blob([ab], { type: mimeString });
            await uploadBytes(storageReference, blob);
            const downloadURL = await getDownloadURL(storageReference);
            await updateProfile(user, {
                photoURL: downloadURL
            });
            return {result: true}
        } else if (infoType === "Password") {
            if (body.newPassword.length < 8) {
                return {
                    result: false,
                    error: "Password is Too Short"
                }
            }
            await updatePassword(user, body.newPassword);
            return { result: true }
        } else {
            return {
                result: false,
                error: "Info Type not Found"
            }
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}