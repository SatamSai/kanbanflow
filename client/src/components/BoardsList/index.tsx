import { useEffect, useState } from 'react'
import { BoardItemContainer, BoardItems, Title } from './BoardsList.styles'
import BoardIcon from '../../assets/board.svg'
import BoardItem from '../BoardItem'
import axios from 'axios'
import { useBoard } from '../../context/boardContext'
import { useModal } from '../../context/modalContext'
import baordService from '../../services/boardServices'

const url = import.meta.env.VITE_BACKEND_URL;

const BoardsList = () => {

    const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

    const { setCurrentBoard, setUserAllBoards, usersAllBoards } = useBoard()

    const { setModalKey, toggleShowModal, setModalTitle } = useModal()

    const handleCreateBoard = () => {
        setModalKey("createBoard")
        setModalTitle("Add New Board")
        toggleShowModal()
    }

    useEffect(() => {
        setUserAllBoards()
    }, [])

    const handleSelectBoard = (id: string) => {
        if (id != selectedBoard)
            setSelectedBoard(id)
    }

    useEffect(() => {
        const fetchBoard = async () => {
            if (selectedBoard) {
                const boardRes = await baordService.getBoardById(selectedBoard)
                const board = boardRes.data
                setCurrentBoard({
                    _id: board._id,
                    title: board.title,
                    description: board.description,
                    owner: board.owner,
                    columns: board.columns
                })

            }
        }
        fetchBoard()
    }, [selectedBoard])

    return (
        <BoardItemContainer>
            <Title>ALL BOARDS ({usersAllBoards.length})</Title>
            <BoardItems>
                {
                    usersAllBoards.map((board) => {
                        return (
                            <BoardItem key={board._id} active={selectedBoard == board._id} boardItemIcon={BoardIcon} text={board.title} handleOnClick={() => handleSelectBoard(board._id)} />
                        )
                    })
                }
                <BoardItem active={false} boardItemIcon={BoardIcon} text='+ Create New Board' handleOnClick={handleCreateBoard} />
            </BoardItems>
        </BoardItemContainer>
    )
}

export default BoardsList