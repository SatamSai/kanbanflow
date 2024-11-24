import { useEffect, useState } from 'react'
import { BoardItemContainer, BoardItems, Title } from './BoardsList.styles'
import BoardIcon from '../../assets/board.svg'
import BoardItem from '../BoardItem'
import { useBoard } from '../../context/boardContext'
import { useModal } from '../../context/modalContext'
import baordService from '../../services/boardServices'
import { Board } from '../../types'
import { useUser } from '../../context/userContext'
import { ROLE_LEVEL_MAP } from '../../constants'


const BoardsList = () => {

    const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

    const { setCurrentBoard, setUserAllBoards, usersAllBoards, setCurrentBoardPermissionLevel } = useBoard()

    const { setModalKey, toggleShowModal, setModalTitle } = useModal()

    const { userInfo } = useUser()

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
                const board = boardRes.data as Board
                setCurrentBoard({
                    _id: board._id,
                    title: board.title,
                    description: board.description,
                    owner: board.owner,
                    columns: board.columns
                })

                const currentMember = board.members?.find(member => member.user._id == userInfo?._id)

                if (currentMember) {
                    const role = currentMember.role as keyof typeof ROLE_LEVEL_MAP
                    setCurrentBoardPermissionLevel(ROLE_LEVEL_MAP[role])
                }
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