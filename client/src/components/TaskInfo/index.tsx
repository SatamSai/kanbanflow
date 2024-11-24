import { useEffect, useMemo, useState } from 'react'
import { CheckBoxGroup, CustomDropdown, UserAssignment } from '../Input'
import { TaskDesc } from './TaskInfo.styles'
import { useBoard } from '../../context/boardContext'
import { useTask } from '../../context/taskContext'
import taskService from '../../services/taskServices'
import baordService from '../../services/boardServices'
import { Member } from '../../types'
import { InputLabel } from '../Input/Input.styles'

const TaskInfo = () => {

    const { currentBoard, updateTask } = useBoard()

    const { currentTask, setTaskInfo, setCurrentTaskSubTasks } = useTask()

    const [searchTerm, setSearchTerm] = useState<string>(currentTask?.assignedTo.fullname || "")

    const [members, setMembers] = useState<Member[]>([])

    const [suggestions, setSuggestions] = useState<Member[]>([])

    const handleSetStatus = async (_status: string) => {
        if (!currentTask) return

        const body = {
            status: _status
        }

        await taskService.updateTaskStatus(currentTask._id, body)

        const updatedTaskInfo = {
            ...currentTask,
            status: _status
        }

        setTaskInfo(updatedTaskInfo)
        updateTask(updatedTaskInfo)
    }

    const handleSetIsDone = async (_id: string, _isDone: boolean) => {
        if (!currentTask?.subTasks) return

        const body = {
            isDone: _isDone
        }

        await taskService.updateTaskIsDone(_id, body)

        const tempSubTasks = [...currentTask.subTasks]

        const updatedSubTaskIndex = tempSubTasks.findIndex(subTask => subTask._id == _id)

        tempSubTasks[updatedSubTaskIndex].isDone = _isDone

        setCurrentTaskSubTasks(tempSubTasks)
    }

    const handleSetTaskInfo = async () => {
        if (!currentTask) return
        const subTaskRes = await taskService.getSubTasks(currentTask._id)
        setCurrentTaskSubTasks(subTaskRes.data)
    }

    const handleSetMembers = async () => {
        if (!currentBoard) return
        const members = await baordService.getBoardMembers(currentBoard._id)

        setMembers(members.data)
    }

    const selectUser = async (_id: string) => {
        if (currentTask) {
            const body = {
                userId: _id
            }
            const task = await taskService.assignTask(currentTask._id, body)
            updateTask(task.data)
        }
        setSuggestions([])
    }

    useEffect(() => {
        handleSetTaskInfo()
        handleSetMembers()
    }, [])


    useEffect(() => {
        if (searchTerm == "") setSuggestions([])
        else {
            const filteredMembers = members.filter(member => member.user.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
            setSuggestions(filteredMembers)
        }
    }, [searchTerm])

    return (
        <>
            {
                currentTask &&
                <>
                    <InputLabel>Description:</InputLabel>
                    <TaskDesc>{currentTask.description}</TaskDesc>
                    <UserAssignment searchTerm={searchTerm} setSearchTerm={setSearchTerm} suggestions={suggestions} selectUser={selectUser} />
                    {
                        currentTask.subTasks && currentTask.subTasks.length > 0 &&
                        <CheckBoxGroup items={currentTask.subTasks} handleToggleCheckItem={handleSetIsDone} />

                    }
                    <CustomDropdown label='Task Status' fieldVal={currentTask.status} handleSetVal={handleSetStatus} options={currentBoard?.columns || []} />
                </>
            }
        </>
    )
}

export default TaskInfo