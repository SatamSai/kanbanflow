import { UserContextState, UserReducerAction } from "../types";


export const userReducer = (state: UserContextState, action: UserReducerAction): UserContextState => {
    switch (action.type) {
        case "SET_USER": return {
            ...state,
            userInfo: action.payload
        }
        case "SET_MEMBER": return {
            ...state,
            selectedMemberInfo: action.payload
        }
    }
}