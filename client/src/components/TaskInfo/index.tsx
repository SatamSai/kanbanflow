import { useEffect } from 'react'
import { CheckBoxGroup, CustomDropdown } from '../Input'
import { TaskDesc } from './TaskInfo.styles'
import { useBoard } from '../../context/boardContext'
import { useTask } from '../../context/taskContext'
import taskService from '../../services/taskServices'

const TaskInfo = () => {

    const { currentBoard, updateTask } = useBoard()

    const { currentTask, setTaskInfo, setCurrentTaskSubTasks } = useTask()

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

    useEffect(() => {
        handleSetTaskInfo()
    }, [])

    return (
        <>
            {
                currentTask &&
                <>
                    <TaskDesc>{currentTask.description}</TaskDesc>
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