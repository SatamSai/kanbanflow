import { TaskContextState } from "../context/taskContext"
import { TaskReducerAction } from "../types"

export const taskReducer = (state: TaskContextState, action: TaskReducerAction): TaskContextState => {
    switch (action.type) {
        case 'SET_TASK':
            return {
                ...state,
                currentTask: action.payload
            }
        case 'SET_SUBTASKS':
            if (!state.currentTask) return state
            return {
                ...state,
                currentTask: {
                    ...state.currentTask,
                    subTasks: action.payload
                }
            }

        case 'SET_EDITABLE_TASK':
            return {
                ...state,
                editableTaskInfo: action.payload
            }
    }
}