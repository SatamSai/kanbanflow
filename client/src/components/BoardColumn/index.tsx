import React, { DragEvent, TouchEvent, useRef } from 'react'
import { ColumnContainer } from './BoardColumn.styles'
import { Title } from '../BoardsList/BoardsList.styles'
import CardsColumn from '../CardsContainer'
import taskService from '../../services/taskServices'
import { useTask } from '../../context/taskContext'
import { useBoard } from '../../context/boardContext'

interface BoardColumnProps {
    column: string
}

const BoardColumn: React.FC<BoardColumnProps> = ({ column }) => {
    const { draggedTask, setTaskInfo } = useTask()
    const { updateTask } = useBoard()

    const touchStartPoint = useRef<Touch | null>(null)

    const updateTaskStatus = async (column: string) => {

        if (!draggedTask || draggedTask.status == column) return;

        const body = {
            status: column,
        };
        await taskService.updateTaskStatus(draggedTask?._id, body);

        const updatedTaskInfo = {
            ...draggedTask,
            status: column,
        };

        setTaskInfo(updatedTaskInfo);
        updateTask(updatedTaskInfo);
    }

    const handleDrop = async (e: DragEvent<HTMLDivElement>, column: string) => {
        e.preventDefault()
        updateTaskStatus(column)
    }

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0]
        touchStartPoint.current = touch as Touch
    }

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleTouchEnd = async (e: TouchEvent<HTMLDivElement>) => {
        e.preventDefault()
        const touch = e.changedTouches[0]
        const element = document.elementFromPoint(touch.clientX, touch.clientY)

        if (element && element.closest('[data-column]')) {
            const targetColumn = element.closest('[data-column]')?.getAttribute('data-column')
            if (targetColumn) {
                await updateTaskStatus(targetColumn)
            }
        }
    };

    return (
        <ColumnContainer
            data-column={column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Title>{column}</Title>
            <CardsColumn column={column} />
        </ColumnContainer>
    )
}

export default BoardColumn
