import { ReactNode, createContext, useContext, useReducer } from "react";
import { Board, BoardContextState, Invite, Member, Task } from "../types";
import { boardReducer } from "../reducers/boardReducer";
import baordService from "../services/boardServices";

interface BoardProviderProps {
    children: ReactNode
}

export const initialState: BoardContextState = {
    usersAllBoards: [],
    currentBoard: {
        _id: "",
        title: "",
        description: "",
        columns: [],
        tasks: [],
        members: []
    },
    permissionLevel: -1,
    updateCurrentBoardAllTasks: (_selectedBoard: string) => { },
    setBoardInviteInfo: (_invite?: Invite) => { },
    fetchMembers: (_selectedBoard: string) => { },
    setUserAllBoards: () => { },
    setCurrentBoard: (_board?: Board) => { },
    setCurrentBoardPermissionLevel: (_level: number) => { },
    setEditableBoard: (_board?: Board) => { },
    updateTask: (_task: Task) => { },
    deleteTask: (_taskId) => { },
}

const BoardContext = createContext<BoardContextState | null>(initialState);

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(boardReducer, initialState);

    const setUserAllBoards = async () => {
        const boardsRes = await baordService.getAllBoards()

        dispatch({
            type: "SET_USERS_ALL_BOARDS",
            payload: boardsRes.data
        })
    }

    const setBoardInviteInfo = (_invite?: Invite) => {
        dispatch({
            type: 'SET_BOARD_INVITE',
            payload: _invite
        })
    }

    const setCurrentBoard = (_board?: Board) => {
        dispatch({
            type: "SET_BOARD",
            payload: _board
        });
    };

    const setCurrentBoardPermissionLevel = (_level: number) => {
        dispatch({
            type: 'SET_PERMISSION_LEVEL',
            payload: _level
        })
    }

    const setEditableBoard = (_board?: Board) => {
        dispatch({
            type: "SET_EDITABLE_BOARD",
            payload: _board
        })
    }

    const fetchMembers = async (_selectedBoard: string) => {
        const boardMembers = await baordService.getBoardMembers(_selectedBoard)
        const members: Member[] = boardMembers.data
        dispatch({
            type: "SET_ALL_BORD_MEMBERS",
            payload: members
        })
    }

    const updateCurrentBoardAllTasks = async (_selectedBoard: string) => {
        const tasksRes = await baordService.getBoardTasks(_selectedBoard)
        const tasks: Task[] = tasksRes.data

        dispatch({
            type: "SET_BOARD_TASKS",
            payload: tasks
        })
    }

    const updateTask = async (_task: Task) => {
        if (state.currentBoard?.tasks) {
            const tasksIndex = state.currentBoard.tasks.findIndex(task => task._id == _task._id)

            const tasks = [...state.currentBoard.tasks]
            tasks.splice(tasksIndex, 1)
            tasks.push(_task)

            dispatch({
                type: "SET_BOARD_TASKS",
                payload: tasks
            })
        }
    }

    const deleteTask = async (_taskId: string) => {
        if (state.currentBoard?.tasks) {
            const tasks = state.currentBoard.tasks.filter(task => task._id != _taskId)

            dispatch({
                type: "SET_BOARD_TASKS",
                payload: tasks
            })
        }
    }
    const value = {
        ...state,
        setUserAllBoards,
        setBoardInviteInfo,
        setCurrentBoard,
        setCurrentBoardPermissionLevel,
        updateCurrentBoardAllTasks,
        updateTask,
        fetchMembers,
        setEditableBoard,
        deleteTask
    };

    return <BoardContext.Provider value={value}>
        {children}
    </BoardContext.Provider>;
}

export const useBoard = () => {
    const context = useContext(BoardContext);
    if (!context) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
}
