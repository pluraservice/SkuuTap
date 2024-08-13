import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { FirebaseStorage } from "../../db/Firebase";

export default async function importCopyTradingPhotoURLIntoStorage(uid, bytes64) {
    try {
        const dataUrl = bytes64;
        const storageReference = storageRef(FirebaseStorage, `CopyTradingPhotoURL/${uid}.png`);
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {ia[i] = byteString.charCodeAt(i);}
        const blob = new Blob([ab], { type: mimeString });
        await uploadBytes(storageReference, blob);
        const downloadURL = await getDownloadURL(storageReference);
        return {
            result: true,
            url: downloadURL
        }
    } catch (error) {
        return {
            result: false,
            error: error.message
        }
    }
}