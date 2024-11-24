import React from 'react'
import { HeaderContainer, HeadingContainer, LogoContainer, LogoImg, LogoText, LogoutText, Title } from './Header.styles'
import LogoImgUrl from '../../assets/logo.svg'
import { useBoard } from '../../context/boardContext'
import userService from '../../services/userServices'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {

    const { currentBoard } = useBoard()

    const navigate = useNavigate()

    const handleLogout = async () => {
        await userService.logoutUser()
        navigate('/login')
    }

    return (
        <HeaderContainer>
            <HeadingContainer>
                <LogoContainer>
                    <LogoImg src={LogoImgUrl} />
                    <LogoText>kanban</LogoText>
                </LogoContainer>
                <Title>{currentBoard?.title || ""}</Title>
                <LogoutText onClick={handleLogout}>Logout</LogoutText>
            </HeadingContainer>
        </HeaderContainer>
    )
}
// {
//     currentBoard._id != "" &&
//     <NewTaskButton onClick={handleShowCreateTaskModal}>+ Add New Task</NewTaskButton>
// }
export default Header