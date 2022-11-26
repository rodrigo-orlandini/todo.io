import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors: {
        gray: {
            900: "#1D1D1D",
            300: "#B7B7B7",
            100: "#EBEBEB"
        },
        darkBlue: {
            700: "#3C4655",
            600: "#4B596E",
            550: "#556080",
            500: "#5B6E8A",
        },
        blue: {
            700: "#4793FF",
            500: "#BCFBFF",
            300: "#7DD5F4"
        },
        yellow: {
            700: "#FFB800",
            500: "#FFE194"
        },
        orange: {
            700: "#FE7410",
            500: "#FFC194"
        },
        red: {
            700: "#FE1010",
            500: "#FF9494",
            300: "#F0785A"
        },
        green: {
            400: "#71C285"
        }
    },
    fonts: {
        heading: "InterBold",
        body: "InterLight"
    },
    fontSizes: {
        xs: 10,
        sm: 12,
        md: 16,
        lg: 18,
        xl: 24,
    },
    sizes: {
        1030: -30
    },
}); 