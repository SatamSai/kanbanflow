import React from 'react'
import { CardContainer, CardContent, CardHeader } from './Card.styles'
import { Task } from '../../types'
import { useModal } from '../../context/modalContext'
import { useTask } from '../../context/taskContext'

interface CardProps {
    task: Task
}

const Card: React.FC<CardProps> = ({ task }) => {
    const { setModalKey, setModalTitle, toggleShowModal } = useModal()

    const { setTaskInfo } = useTask()

    const handleShowTaskInfo = () => {
        setModalKey("taskInfo")
        setModalTitle(task.title)
        toggleShowModal()
        setTaskInfo(task)
    }
    return (
        <CardContainer onClick={handleShowTaskInfo}>
            <CardHeader>{task.title}</CardHeader>
            <CardContent>0 of 1 subtask</CardContent>
        </CardContainer>
    )
}

export default Card