import { ModalContextState, ModalReducerAction } from "../types";


export const ModalReducer = (state: ModalContextState, action: ModalReducerAction): ModalContextState => {
    switch (action.type) {
        case 'SET_MODAL_KEY': return {
            ...state,
            key: action.payload
        }
        case 'SET_MODAL_TITLE': return {
            ...state,
            title: action.payload
        }
        case 'TOGGLE_SHOW_MODAL': return {
            ...state,
            show: !state.show
        }
        default: return state
    }
}