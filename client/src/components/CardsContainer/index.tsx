import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Container } from './CardsContainer.styles'
import Card from '../Card'
import { useBoard } from '../../context/boardContext'
import { Task } from '../../types'

interface CardsColumnProps {
    column: string
}

const CardsColumn: React.FC<CardsColumnProps> = ({ column }) => {

    const [columnTasks, setColumnTasks] = useState<Task[]>([])

    const { currentBoard } = useBoard()

    useEffect(() => {
        if (currentBoard?.tasks) {
            const filteredTasks = currentBoard.tasks.filter(task => task.status == column)
            setColumnTasks(filteredTasks)
        }
    }, [currentBoard?.tasks])

    return (
        <Container>
            {
                columnTasks.map(task => {
                    return <Card task={task} key={task._id} />
                })
            }
        </Container>
    )
}

export default CardsColumn