import { BoardItemContainer, BoardItemImg, BoardItemText } from './BoardItem.style'

interface BoardItemProps {
    active: boolean,
    boardItemIcon: string,
    text: string,
    handleOnClick: () => void
}

const BoardItem = ({ active, boardItemIcon, text, handleOnClick }: BoardItemProps) => {
    return (
        <BoardItemContainer active={active} onClick={handleOnClick}>
            <BoardItemImg src={boardItemIcon} />
            <BoardItemText>{text}</BoardItemText>
        </BoardItemContainer>
    )
}

export default BoardItem