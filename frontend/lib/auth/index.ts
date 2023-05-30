import "lib/firebase";
import firebase from "firebase/app"
import { getAuth, signOut, signInWithEmailAndPassword, inMemoryPersistence } from "firebase/auth";

getAuth().setPersistence(inMemoryPersistence);

export const firebaseSignIn = (email: string, password: string, csrfToken) => {
    signInWithEmailAndPassword(getAuth(), email, password).then(data => {
        console.log("working")
        return data.user.getIdToken().then(idToken => {
            console.log({
                idToken,
                csrfToken,
                lol: true
            })
            fetch(`${process.env.API_DOMAIN}/auth/login`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "xsrf-token": csrfToken
                }
            }).then(res => console.log(res))
            .then(data => {
                console.log("some data", data)
                return data;
            })
        })
    }).then(() => {
        return signOut(getAuth());
    }).then(() => {
        console.log("so success???")
        // window.location.assign("/profile");
    })
};