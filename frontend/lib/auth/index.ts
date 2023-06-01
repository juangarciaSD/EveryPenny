import React from "react";
import "lib/firebase";
import firebase from "firebase/app"
import { getAuth, signOut, signInWithEmailAndPassword, User, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

setPersistence(getAuth(), browserSessionPersistence);

//get current user
export const getCurrentUser = async(): Promise<User | null> => {
    let user = fetch(`${process.env.API_DOMAIN}/user/current`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then((data) => {
        console.log("current user", data)
        return data.user;
    });
    return user;
};

//sign in user to be able to get session cookie
export const firebaseSignIn = (email: string, password: string, csrfToken) => {
    let data = signInWithEmailAndPassword(getAuth(), email, password).then(data => {
        console.log("working")
        return data.user.getIdToken().then(idToken => {
            console.log({
                idToken,
                csrfToken,
                lol: true
            })
            fetch(`${process.env.API_DOMAIN}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idToken
                })
            });
        })
    }).then(() => {
        console.log("so success???")
        return { success: true }
    }).catch(e => {
        console.log("error has occured while trying to login")
        return { success: false }
    });
    return data;
};

// //sign out
export const clearSession = () => {
    signOut(getAuth());
    fetch(`${process.env.API_DOMAIN}/auth/signout`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
    .then(data => {
        console.log("user should be signed out", data)
    });
    //send request to delete cookie to server
}