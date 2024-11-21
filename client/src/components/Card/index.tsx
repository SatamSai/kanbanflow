import React, { DragEvent, TouchEvent } from 'react'
import { CardContainer, CardContent, CardHeader } from './Card.styles'
import { Task } from '../../types'
import { useModal } from '../../context/modalContext'
import { useTask } from '../../context/taskContext'

interface CardProps {
    task: Task
}

const Card: React.FC<CardProps> = ({ task }) => {
    const { setModalKey, setModalTitle, toggleShowModal } = useModal()

    const { setTaskInfo, setDraggedTask } = useTask()

    const handleShowTaskInfo = () => {
        setModalKey("taskInfo")
        setModalTitle(task.title)
        toggleShowModal()
        setTaskInfo(task)
    }

    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setDraggedTask(task)
    }


    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setDraggedTask(task)
    }

    return (
        <CardContainer onClick={handleShowTaskInfo} draggable onDragStart={(e) => handleDragStart(e)} onTouchStart={(e) => handleTouchStart(e)}>
            <CardHeader>{task.title}</CardHeader>
            <CardContent>0 of 1 subtask</CardContent>
        </CardContainer>
    )
}

export default Card