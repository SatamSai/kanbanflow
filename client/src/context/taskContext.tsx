import { ReactNode, createContext, useContext, useReducer } from "react";
import { Task } from "../types";
import { taskReducer } from "../reducers/taskReducer";


interface TaskProviderProps {
    children: ReactNode
}

export interface TaskContextState {
    editableTaskInfo: Task | undefined;
    currentTask: Task | undefined;
    setEditableTaskInfo: (_task?: Task) => void;
    setTaskInfo: (_task?: Task) => void;
    setCurrentTaskSubTasks: (_subTasks: Task[]) => void
}

const defaultState: TaskContextState = {
    editableTaskInfo: undefined,
    currentTask: undefined,
    setEditableTaskInfo: (_task?: Task) => { },
    setTaskInfo: (_task?: Task) => { },
    setCurrentTaskSubTasks: (_subTasks: Task[]) => { }
}


const TaskContext = createContext<TaskContextState | undefined>(undefined)

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(taskReducer, defaultState)

    const setTaskInfo = (_taskInfo?: Task) => {
        dispatch({
            type: 'SET_TASK',
            payload: _taskInfo
        })
    }

    const setCurrentTaskSubTasks = (_subTasks: Task[]) => {
        dispatch({
            type: 'SET_SUBTASKS',
            payload: _subTasks
        })
    }

    const setEditableTaskInfo = async (_task?: Task) => {
        dispatch({
            type: "SET_EDITABLE_TASK",
            payload: _task
        })
    }

    const value: TaskContextState = {
        ...state,
        setTaskInfo,
        setEditableTaskInfo,
        setCurrentTaskSubTasks
    }

    return <TaskContext.Provider value={value}>
        {children}
    </TaskContext.Provider>
}


export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
}