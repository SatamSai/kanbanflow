import React from 'react'
import { ColumnContainer } from './BoardColumn.styles'
import { Title } from '../BoardsList/BoardsList.styles'
import CardsColumn from '../CardsContainer'



interface BoardColumnProps {
    column: string
}

const BoardColumn: React.FC<BoardColumnProps> = ({ column }) => {
    return (
        <ColumnContainer>
            <Title>{column}</Title>
            <CardsColumn column={column} />
        </ColumnContainer>
    )
}

export default BoardColumn