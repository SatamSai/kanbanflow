// boardReducer.ts
import { BoardContextState, BoardReducerAction } from "../types";

export const boardReducer = (state: BoardContextState, action: BoardReducerAction): BoardContextState => {
    switch (action.type) {
        case "SET_BOARD": return {
            ...state,
            currentBoard: action.payload
        };
        case 'SET_BOARD_INVITE': return {
            ...state,
            boardInviteInfo: action.payload
        }
        case "SET_BOARD_TASKS": return {
            ...state,
            currentBoard: {
                ...state.currentBoard,
                tasks: action.payload
            }
        };
        case "SET_USERS_ALL_BOARDS": return {
            ...state,
            usersAllBoards: action.payload
        }
        case "SET_EDITABLE_BOARD": return {
            ...state,
            editableBoard: action.payload
        }
        case "SET_ALL_BORD_MEMBERS": return {
            ...state,
            currentBoard: {
                ...state.currentBoard,
                members: action.payload
            }
        }
        default: return state;
    }
}
