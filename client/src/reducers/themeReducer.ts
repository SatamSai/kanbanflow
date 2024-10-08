import { Theme, ThemeContextState, ThemeReducerAction } from "../types"

export const initialState: ThemeContextState = {
    theme: 'dark',
    toggleTheme: () => { }
}


export const themeReducer = (state: Theme, action: ThemeReducerAction): Theme => {
    const { type, payload } = action

    switch (type) {
        case "TOGGLE_THEME": return {
            ...state,
            theme: payload
        }
        default: return state
    }
}