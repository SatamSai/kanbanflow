import Header from '../components/Header'
import Modals from '../components/Modals'
import { ContentWrapper, OptionImg, Options } from '../styles'
import SideBar from '../components/SideBar'
import BoardPanel from '../components/Board'
import { useModal } from '../context/modalContext'
import Auth from '../Auth'
import { PanelBody, PanelHeading, PanelOption, PanelWrapper, Sections } from './styles'
import { useEffect, useState } from 'react'
import MembersPanel from '../components/MemberPanel'
import { useBoard } from '../context/boardContext'
import EditIcon from '../assets/editIcon.svg'
import DeleteIcon from '../assets/trash-solid.svg'
import axios from 'axios'
import baordService from '../services/boardServices'

const url = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {

    const { setModalKey, setModalTitle, toggleShowModal } = useModal()

    const { currentBoard, updateCurrentBoardAllTasks, fetchMembers, setEditableBoard, boardInviteInfo, setUserAllBoards, setCurrentBoard } = useBoard()

    const [showBoard, setShowBoard] = useState(true)

    useEffect(() => {
        if (currentBoard?._id) {
            if (showBoard) {
                updateCurrentBoardAllTasks(currentBoard._id)
            }
            else {
                fetchMembers(currentBoard._id)
            }
        }
    }, [showBoard, currentBoard?._id])

    useEffect(() => {
        if (boardInviteInfo) {
            toggleShowModal()
            setModalKey("inviteModal")
            setModalTitle("Board Invitation")
        }
    }, [boardInviteInfo])

    const handleOpenEditBoardModal = () => {
        if (currentBoard) {
            setModalTitle(currentBoard.title)
            setEditableBoard(currentBoard)
            setModalKey('editBoard')
            toggleShowModal()
        }
    }

    const handleDeleteBoard = async () => {
        if (currentBoard) {
            await baordService.deleteBoard(currentBoard._id)
            setUserAllBoards()
            setCurrentBoard()
        }
    }

    return (
        <Auth>
            <Header />
            <Modals closeModal={toggleShowModal} />
            <ContentWrapper>
                <SideBar />
                <PanelWrapper>
                    {
                        currentBoard?._id &&
                        <>
                            <PanelHeading>
                                <Sections>
                                    <PanelOption onClick={() => setShowBoard(true)} isActive={showBoard}>Board</PanelOption>
                                    <PanelOption onClick={() => setShowBoard(false)} isActive={!showBoard}>Members</PanelOption>
                                </Sections>
                                <Options>
                                    <OptionImg src={EditIcon} onClick={handleOpenEditBoardModal} />
                                    <OptionImg src={DeleteIcon} onClick={handleDeleteBoard} />
                                </Options>
                            </PanelHeading>
                            <PanelBody>
                                {
                                    showBoard ?
                                        <BoardPanel /> : <MembersPanel />
                                }
                            </PanelBody>
                        </>
                    }
                </PanelWrapper>
            </ContentWrapper>
        </Auth>
    )
}

export default HomePage