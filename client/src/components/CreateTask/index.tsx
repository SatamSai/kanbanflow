import { useEffect, useState } from 'react'
import { CustomDropdown, SubTaskGroup, Input, TextArea } from '../Input'
import CustomButton from '../CustomButton'
import { useBoard } from '../../context/boardContext'
import axios from 'axios'
import { useModal } from '../../context/modalContext'
import { Task } from '../../types'
import { useTask } from '../../context/taskContext'


const defaultInput: Task = {
    _id: "",
    title: "",
    description: "",
    isDone: false,
    subTasks: [],
    priority: "Very Low",
    status: "Unassigned"
}

const priorityOptions: string[] = [
    "Very Low",
    "Low",
    "Medium",
    "High",
    "Very High"
]

const url = import.meta.env.VITE_BACKEND_URL;

const CreateTask = () => {
    const [task, setTask] = useState<Task>(defaultInput)

    const { currentBoard, updateCurrentBoardAllTasks } = useBoard()
    const { toggleShowModal } = useModal()
    const { editableTaskInfo } = useTask()

    const handleSetTitle = (_title: string) => {
        setTask({
            ...task,
            title: _title
        })
    }

    const handleSetDescription = (_description: string) => {
        setTask({
            ...task,
            description: _description
        })
    }

    // const handleSetSubtasks = (_task: Task, index: number) => {
    //     if (task.subTasks) {
    //         const subtasks = [...task.subTasks]
    //         subtasks[index] = _task
    //         setTask({
    //             ...task,
    //             subTasks: subtasks
    //         })
    //     }
    // }

    const handleAddNewSubTask = (_task: Task) => {
        if (task.subTasks) {
            const subtasks = [...task.subTasks]
            subtasks.push(_task)
            setTask({
                ...task,
                subTasks: subtasks
            })
        }
    }

    const handleDeleteSubTask = (index: number) => {
        if (task.subTasks) {
            const subtasks = [...task.subTasks]
            subtasks.splice(index, 1)
            setTask({
                ...task,
                subTasks: subtasks
            })
        }
    }

    const handleSetStatus = (_status: string) => {
        setTask({
            ...task,
            status: _status
        })
    }

    const handleSetPriority = (_priority: string) => {
        setTask({
            ...task,
            priority: _priority
        })
    }

    const handleCreateTask = async () => {
        if (task.subTasks && currentBoard) {
            const { _id, ...tempTask } = task
            const body = {
                ...tempTask,
                subTasks: task.subTasks.map(subTask => subTask._id)
            }
            await axios.post(url + '/tasks/board/' + currentBoard._id + '/createTask', body, {
                withCredentials: true
            })
            setTimeout(() => {
                updateCurrentBoardAllTasks(currentBoard._id)
            }, 1000)
            toggleShowModal()
        }
    }

    const handleUpdateTask = async () => {
        if (task.subTasks && currentBoard) {
            const body = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                subTasks: task.subTasks.map(subTask => subTask._id)
            }
            await axios.patch(url + '/tasks/' + task._id, body, {
                withCredentials: true
            })
            setTimeout(() => {
                updateCurrentBoardAllTasks(currentBoard._id)
            }, 1000)

            toggleShowModal()
        }
    }

    useEffect(() => {
        console.log("HERE")
        console.log(editableTaskInfo)
        if (editableTaskInfo)
            setTask(editableTaskInfo)
    }, [editableTaskInfo])

    return (
        <>
            <Input label='Task Title' fieldVal={task.title} handleSetVal={handleSetTitle} />
            <TextArea label='Task Description' fieldVal={task.description} handleSetVal={handleSetDescription} />
            {
                task.subTasks &&
                <SubTaskGroup label='Sub Tasks' handleAddSelectedItem={handleAddNewSubTask} fieldVal={task.subTasks} handleRemoveItem={handleDeleteSubTask} />
            }
            <CustomDropdown label='Task Status' fieldVal={task.status} handleSetVal={handleSetStatus} options={currentBoard?.columns || []} />
            <CustomDropdown label='Task Priority' fieldVal={task.priority} handleSetVal={handleSetPriority} options={priorityOptions} />
            <CustomButton text={editableTaskInfo ? 'Update Task' : 'Create Task'} onClick={editableTaskInfo ? handleUpdateTask : handleCreateTask} />
        </>
    )
}

export default CreateTask