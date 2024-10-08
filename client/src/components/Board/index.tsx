import { BoardContainer, BoardWrapper, FloatingWrapper } from './Board.styles'
import BoardColumn from '../BoardColumn'
import CreateColumn from '../CreateColumn'
import { useBoard } from '../../context/boardContext'
import CustomButton from '../CustomButton'
import { useModal } from '../../context/modalContext'

const BoardPanel = () => {

    const { currentBoard } = useBoard()
    const { setModalKey, toggleShowModal, setModalTitle } = useModal()

    const handleShowCreateTaskModal = () => {
        setModalKey("createTask")
        setModalTitle("Add New Task")
        toggleShowModal()
    }
    return (
        <BoardContainer>
            <BoardWrapper>
                {
                    currentBoard?.columns.map((boardColumn, index) => {
                        return <BoardColumn key={index} column={boardColumn} />
                    })
                }
                <CreateColumn />
            </BoardWrapper>
            <FloatingWrapper>
                <CustomButton text='Add Task' onClick={handleShowCreateTaskModal} />
            </FloatingWrapper>
        </BoardContainer>
    )
}

export default BoardPanel