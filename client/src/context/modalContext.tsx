import { ReactNode, createContext, useContext, useReducer } from "react";
import { ModalReducer } from "../reducers/modalReducer";
import { ModalContextState } from "../types";


interface ModalProviderProps {
    children: ReactNode
}

export const initialState: ModalContextState = {
    key: "",
    title: "",
    show: false,
    setModalKey: (_key: string) => { },
    setModalTitle: (_title: string) => { },
    toggleShowModal: () => { }
}

const ModalContext = createContext(initialState)

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(ModalReducer, initialState)

    const setModalKey = (_key: string) => {
        dispatch({
            type: 'SET_MODAL_KEY',
            payload: _key
        })
    }

    const setModalTitle = (_title: string) => {
        dispatch({
            type: 'SET_MODAL_TITLE',
            payload: _title
        })
    }

    const toggleShowModal = () => {
        dispatch({
            type: 'TOGGLE_SHOW_MODAL',
        })
    }

    const value: ModalContextState = {
        ...state,
        setModalKey,
        setModalTitle,
        toggleShowModal
    }

    return <ModalContext.Provider value={value}>
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModal must be used within ModalProvider")
    }
    return context
}