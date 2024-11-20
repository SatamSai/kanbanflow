
export interface User {
    _id: string,
    username: string,
    email: string,
    fullname: string,
    boards?: Board[]
}

export interface Member {
    user: User,
    role: string
}

export interface Board {
    _id: string,
    title: string,
    description: string,
    owner?: User,
    columns: string[],
    tasks?: Task[],
    members?: Member[]
}


export interface Task {
    _id: string,
    title: string,
    description: string,
    isDone: boolean,
    createdBy?: User,
    subTasks?: Task[],
    priority: string,
    status: string
}

export interface Invite {
    _id: string,
    expiresAt: string,
    generatedBy: User,
    role: string,
    token: string,
    board: Board
}

export interface Theme {
    theme: string
}

export interface ThemeContextState extends Theme {
    toggleTheme: () => void
}

export type ThemeReducerAction = {
    type: "TOGGLE_THEME",
    payload: string
}

export type TaskReducerAction = {
    type: "SET_TASK",
    payload: Task | undefined
} | {
    type: "SET_SUBTASKS",
    payload: Task[]
} | {
    type: "SET_EDITABLE_TASK",
    payload: Task | undefined
} | {
    type: "SET_DRAGGED_TASKID",
    payload: Task
}

export interface BoardContextState {
    usersAllBoards: Board[],
    currentBoard?: Board;
    editableBoard?: Board;
    boardInviteInfo?: Invite,
    updateCurrentBoardAllTasks: (selectedBoard: string) => void,
    setBoardInviteInfo: (_invite?: Invite) => void,
    fetchMembers: (selectedBoard: string) => void,
    setUserAllBoards: () => void;
    setCurrentBoard: (_board?: Board) => void;
    updateTask: (_task: Task) => void,
    setEditableBoard: (_board?: Board) => void;
    deleteTask: (_taskId: string) => void
}
export type BoardReducerAction = {
    type: "SET_BOARD",
    payload: Board | undefined
} | {
    type: "SET_BOARD_TASKS",
    payload: Task[]
} | {
    type: "SET_USERS_ALL_BOARDS",
    payload: Board[]
} | {
    type: "SET_ALL_BORD_MEMBERS",
    payload: Member[]
} | {
    type: "SET_EDITABLE_BOARD",
    payload: Board | undefined
} | {
    type: "SET_BOARD_INVITE",
    payload: Invite | undefined
}

export interface ModalContextState {
    key: string,
    title: string,
    show: boolean,
    setModalKey: (_key: string) => void
    setModalTitle: (_title: string) => void
    toggleShowModal: () => void
}

export type ModalReducerAction = {
    type: "SET_MODAL_KEY",
    payload: string
} | {
    type: "TOGGLE_SHOW_MODAL",
} | {
    type: "SET_MODAL_TITLE",
    payload: string
}


export interface UserContextState {
    userInfo?: User,
    selectedMemberInfo?: Member,
    setUserInfo: (_user: User) => void,
    setSelectedUserInfo: (_member: Member) => void
}

export type UserReducerAction = {
    type: "SET_USER",
    payload: User
} | {
    type: "SET_MEMBER",
    payload: Member
}