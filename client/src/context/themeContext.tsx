import { ReactNode, createContext, useContext, useReducer } from "react";
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from "../theme"
import { initialState, themeReducer } from "../reducers/themeReducer";
import { ThemeContextState } from "../types";


interface ThemeProviderProps {
    children: ReactNode
}

const ThemeContext = createContext<ThemeContextState | null>(initialState)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(themeReducer, initialState)

    const toggleTheme = () => {
        const newTheme = state.theme == "light" ? "dark" : "light"
        dispatch({
            type: "TOGGLE_THEME",
            payload: newTheme
        })
    }

    const values: ThemeContextState = {
        ...state,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={values}>
            <StyledThemeProvider theme={state.theme == "light" ? lightTheme : darkTheme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};