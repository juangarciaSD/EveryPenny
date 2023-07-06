import "lib/firebase";
import { User } from "lib/QueryType/User";
import { getAuth, signOut, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

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
export const userSignIn = ({
    email,
    password,
}) => {
    let data = signInWithEmailAndPassword(getAuth(), email, password).then(data => {
        console.log("working")
        return data.user.getIdToken().then(idToken => {
            console.log({
                idToken,
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

//create user both firebase and db
export const createUser = ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber
}) => {
    let data = createUserWithEmailAndPassword(getAuth(), email, password).then(data => {
        console.log("creating...");
        return data.user.getIdToken().then(idToken => {
            console.log({
                idToken,
                lol: true
            });
            fetch(`${process.env.API_DOMAIN}/auth/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    uuid: data.user.uid,
                    idToken,
                    phoneNumber
                })
            });
        }).then(() => {
            console.log("success on creating account and starting login process");
            return { success: true }
        }).catch(e => {
            console.log("there was an error while trying to create account or redirecting user");
            return { success: false }
        });
    });
    return data;
}

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