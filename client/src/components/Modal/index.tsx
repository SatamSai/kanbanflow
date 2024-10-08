import React, { ReactNode, useRef } from 'react'
import { ModalContainer, ModalContent, ModalTitle, ModalTitleText, ModalWrapper } from './Modal.styles'
import { useModal } from '../../context/modalContext'
import EditIcon from '../../assets/editIcon.svg'
import DeleteIcon from '../../assets/trash-solid.svg'
import { useTask } from '../../context/taskContext'
import { OptionImg, Options } from '../../styles'
import { useBoard } from '../../context/boardContext'

interface ModalProps {
    children: ReactNode,
    closeModal: () => void,
    handleDeleteItem?: () => void,
    handleOpenEditModal?: () => void
}

const Modal = ({ children, closeModal, handleDeleteItem, handleOpenEditModal }: ModalProps) => {


    const { title } = useModal()
    const wrapperRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const { setEditableTaskInfo, setTaskInfo } = useTask()
    const { setEditableBoard } = useBoard()

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click was outside the inner div
        if (wrapperRef.current && containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setEditableTaskInfo()
            setEditableBoard()
            setTaskInfo()
            closeModal()
        }
    };

    return (
        <ModalWrapper ref={wrapperRef} onClick={handleClickOutside}>
            <ModalContainer ref={containerRef}>
                <ModalTitle>
                    <ModalTitleText>{title}</ModalTitleText>
                    {
                        handleDeleteItem &&
                        <Options>
                            <OptionImg src={EditIcon} onClick={handleOpenEditModal} />
                            <OptionImg src={DeleteIcon} onClick={handleDeleteItem} />
                        </Options>
                    }
                </ModalTitle>
                <ModalContent>{children}</ModalContent>
            </ModalContainer>
        </ModalWrapper>
    )
}

export default Modal