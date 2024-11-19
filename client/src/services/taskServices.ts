import BaseApiService from "./baseApiService";

class TaskServices extends BaseApiService {

    createTask = (boardId: string, data: Object) => {
        return this.makeAPICall(`/tasks/board/${boardId}/createTask`, 'POST', data)
    }

    searchTask = (boardId: string, params: Object) => {
        return this.makeAPICall(`/tasks/board/${boardId}`, 'GET', {}, params)
    }

    deleteTask = (taskId: string) => {
        return this.makeAPICall(`/tasks/${taskId}`, 'DELETE')
    }

    updateTask = (taskId: string, data: Object) => {
        return this.makeAPICall(`/tasks/${taskId}`, 'PATCH', data)
    }

    updateTaskStatus = (taskId: string, data: Object) => {
        return this.makeAPICall(`/tasks/${taskId}/updateStatus`, 'PATCH', data)
    }

    updateTaskIsDone = (taskId: string, data: Object) => {
        return this.makeAPICall(`/tasks/${taskId}/updateIsDone`, 'PATCH', data)
    }

    getSubTasks = (taskId: string) => {
        return this.makeAPICall(`/tasks/${taskId}/getSubTasks`, 'GET')
    }
}

const taskService = new TaskServices()

export default taskService