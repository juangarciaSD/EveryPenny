import React from "react";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "./QueryType/User";

export type ThemeColors = "light" | "dark";

interface ContextType {
    firebaseUser: FirebaseUser;
    user: User | undefined;
    setUser: (user: User) => void;
    theme: ThemeColors;
    setTheme: (theme: ThemeColors) => void;
};

const AppContext = React.createContext<ContextType>({
    firebaseUser: undefined,
    user: undefined,
    setUser: () => null,
    theme: "light",
    setTheme: () => null
});

export const AppProvider = AppContext.Provider;
export default AppContext;