import React, { DragEvent } from 'react'
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

    const handleDrop = async (e: DragEvent<HTMLDivElement>, column: string) => {

        e.preventDefault()

        if (!draggedTask) return

        const body = {
            status: column
        }
        await taskService.updateTaskStatus(draggedTask?._id, body)

        const updatedTaskInfo = {
            ...draggedTask,
            status: column
        }

        setTaskInfo(updatedTaskInfo)
        updateTask(updatedTaskInfo)
    }

    return (
        <ColumnContainer
            onDragOver={(e) => e.preventDefault()}
            onDrop={e => handleDrop(e, column)}
        >
            <Title>{column}</Title>
            <CardsColumn column={column} />
        </ColumnContainer>
    )
}

export default BoardColumn