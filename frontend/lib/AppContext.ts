import React from "react";

export type ThemeColors = "light" | "dark";

interface ContextType {
    theme: ThemeColors;
    setTheme: (theme: ThemeColors) => void;
};

const AppContext = React.createContext<ContextType>({
    theme: "light",
    setTheme: () => null
});

export const AppProvider = AppContext.Provider;
export default AppContext;