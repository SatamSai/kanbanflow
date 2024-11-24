import BaseApiService from "./baseApiService";


class BoardServices extends BaseApiService {

    getBoardById = (boardId: string) => {
        return this.makeAPICall(`/board/${boardId}`, 'GET')
    }

    updateBoard = (boardId: string, data: Object) => {
        return this.makeAPICall(`/board/${boardId}`, 'PATCH', data)
    }

    getAllBoards = () => {
        return this.makeAPICall('/board', 'GET')
    }

    getBoardTasks = (boardId: string) => {
        return this.makeAPICall(`/board/${boardId}/getTasks`, 'GET')
    }

    getBoardMembers = (boardId: string) => {
        return this.makeAPICall(`/board/${boardId}/getMembers`, 'GET')
    }

    createBoard = (data: Object) => {
        return this.makeAPICall(`/board`, 'POST', data)
    }

    deleteBoard = (boardId: string) => {
        return this.makeAPICall(`/board/${boardId}`, 'DELETE')
    }

}


const baordService = new BoardServices()

export default baordService