// src/theme.ts

import { DefaultTheme } from 'styled-components';

export const lightTheme: CustomTheme = {
    colors: {
        primary: "#635fc7",
        primaryBg: "#fff",
        secondaryBg: "#f4f7fd",
        transparentBg: "#0000000f",
        primaryText: "#000112",
        secondaryText: "#828fa3",
        border: ""
    },
};

export const darkTheme: CustomTheme = {
    colors: {
        primary: "#635fc7",
        primaryBg: "#2b2c37",
        secondaryBg: "#20212c",
        transparentBg: "#ffffff05",
        primaryText: "#fff",
        secondaryText: "#828fa3",
        border: ""
    },
};

export interface CustomTheme extends DefaultTheme {
    colors: {
        primary: string,
        primaryBg: string;
        secondaryBg: string;
        transparentBg: string,
        primaryText: string;
        secondaryText: string;
        border: string;
    };
}
