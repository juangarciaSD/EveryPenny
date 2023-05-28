import auth from "firebase/auth";
import { getCookie } from "lib/getCookie";

auth.getAuth().setPersistence(auth.inMemoryPersistence);

export const firebaseSignIn = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(auth.getAuth(), email, password).then(data => {
        return data.user.getIdToken().then(idToken => {
            const csrfToken = getCookie("csrfToken");
            //send request to get session login
        })
    }).then(() => {
        return auth.getAuth().signOut();
    }).then(() => {
        window.location.assign("/profile");
    })
};