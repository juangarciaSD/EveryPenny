type PossibleTheme = "light" | "dark";

export interface ITheme {
    readonly themeName: PossibleTheme;
    background: string;
    smallBackground: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    secondaryTextColor: string;
    lineColor: string;
    red: string;
    // Canvas specific:
    canvasBg: string;
    // Workspace:
    controlBarColor: string;
    scrollbar: string;
    modalBg: string;
    arrowBg: string;
}

// Light Mode (default):
export const LightTheme: ITheme = {
    themeName: "light",
    background: "#ffffff",
    smallBackground: "#ffffff",
    primaryColor: "#000000",
    secondaryColor: "#1d232d",
    // accentColor: "#5073F6",
    accentColor: "#4261ee",
    textColor: "#111827",
    secondaryTextColor: "#546884",
    canvasBg: "#ffffff",
    lineColor: "#efefee",
    controlBarColor: "#efefef",
    scrollbar: "#f0f0f0",
    modalBg: "#fefefe",
    arrowBg: "#f0f0f0",
    red: "#e23a3a",
};

// Dark Mode:
export const DarkTheme: ITheme = {
    themeName: "dark",
    background: "#1c232e",
    smallBackground: "#1c232e",
    primaryColor: "#ffffff",
    secondaryColor: "#1d232d",
    // accentColor: "#5073F6",
    accentColor: "#4261ee",
    textColor: "#ededee",
    secondaryTextColor: "#546884",
    canvasBg: "#151a21",
    lineColor: "#4E5356",
    controlBarColor: "#464C50",
    scrollbar: "#909090",
    modalBg: "#131313",
    arrowBg: "#131313",
    red: "#e23a3a",
};