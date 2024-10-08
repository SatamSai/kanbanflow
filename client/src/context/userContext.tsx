import { ReactNode, createContext, useContext, useReducer } from "react";
import { Member, User, UserContextState } from "../types";
import { userReducer } from "../reducers/userReducer";


const defaultState: UserContextState = {
    setUserInfo: (_user: User) => { },
    setSelectedUserInfo: (_member: Member) => { },
}

interface UserProviderProps {
    children: ReactNode
}

const UserContext = createContext(defaultState)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, defaultState)

    const setUserInfo = async (_user: User) => {
        dispatch({
            type: "SET_USER",
            payload: _user
        })
    }

    const setSelectedUserInfo = (_member: Member) => {
        dispatch({
            type: "SET_MEMBER",
            payload: _member
        })
    }

    const value: UserContextState = {
        ...state,
        setUserInfo,
        setSelectedUserInfo
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}