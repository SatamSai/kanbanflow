import { useEffect, useState } from 'react'
import { ColumnsFieldGroup, Input, TextArea } from '../Input'
import CustomButton from '../CustomButton'
import { Board } from '../../types'
import { useBoard } from '../../context/boardContext'
import axios from 'axios'
import { useModal } from '../../context/modalContext'

const defaultBoard: Board = {
    _id: "",
    title: "",
    description: "",
    columns: []
}

const url = import.meta.env.VITE_BACKEND_URL;

const CreateBoard = () => {

    const [board, setBoard] = useState<Board>(defaultBoard)

    const { setUserAllBoards, editableBoard } = useBoard()
    const { toggleShowModal } = useModal()

    const handleSetTitle = (_title: string) => {
        if (!board) return
        setBoard({
            ...board,
            title: _title
        })
    }

    const handleSetDescription = (_description: string) => {
        if (!board) return
        setBoard({
            ...board,
            description: _description
        })

    }

    const handleSetColumnVal = (_val: string, index: number) => {
        if (!board) return
        const columns = [...board.columns]
        columns[index] = _val

        setBoard({
            ...board,
            columns: columns
        })
    }

    const handleRemoveColumn = (index: number) => {
        if (!board) return

        const columns = [...board.columns]
        columns.splice(index, 1)
        setBoard({
            ...board,
            columns: columns
        })
    }

    const handleAddNewColumn = () => {
        if (!board) return

        const columns = [...board.columns]
        columns.push("")
        setBoard({
            ...board,
            columns: columns
        })
    }
    const handleCreateBoard = async () => {
        if (!board) return

        if (board.title == "" || board.description == "" || board.columns.filter(column => column == "").length > 0) return

        const body = {
            title: board.title,
            description: board.description,
            columns: board.columns
        }

        await axios.post(url + '/board', body, {
            withCredentials: true
        })
        setTimeout(() => {
            setUserAllBoards()
            toggleShowModal()
        }, 300)
    }

    useEffect(() => {
        if (!editableBoard) return
        setBoard(editableBoard)
    }, [editableBoard])

    return (
        <>
            {
                board &&
                <>
                    <Input label='Board Title' fieldVal={board?.title} handleSetVal={handleSetTitle} />
                    <TextArea label='Board Description' fieldVal={board.description} handleSetVal={handleSetDescription} />
                    <ColumnsFieldGroup label='Board Columns' fieldVal={board.columns} handleSetVal={handleSetColumnVal} handleAddNewItem={handleAddNewColumn} handleRemoveItem={handleRemoveColumn} />
                    <CustomButton text='Create Board' onClick={handleCreateBoard} />
                </>
            }
        </>
    )
}

export default CreateBoard