import React from 'react'
import { HeaderContainer, HeadingContainer, LogoContainer, LogoImg, LogoText, Title } from './Header.styles'
import LogoImgUrl from '../../assets/logo.svg'
import { useBoard } from '../../context/boardContext'

const Header: React.FC = () => {

    const { currentBoard } = useBoard()


    return (
        <HeaderContainer>
            <HeadingContainer>
                <LogoContainer>
                    <LogoImg src={LogoImgUrl} />
                    <LogoText>kanban</LogoText>
                </LogoContainer>
                <Title>{currentBoard?.title || ""}</Title>
            </HeadingContainer>
        </HeaderContainer>
    )
}
// {
//     currentBoard._id != "" &&
//     <NewTaskButton onClick={handleShowCreateTaskModal}>+ Add New Task</NewTaskButton>
// }
export default Header