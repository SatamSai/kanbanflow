import { useEffect } from 'react'
import { CheckBoxGroup, CustomDropdown } from '../Input'
import { TaskDesc } from './TaskInfo.styles'
import { useBoard } from '../../context/boardContext'
import axios from 'axios'
import { useTask } from '../../context/taskContext'

const url = import.meta.env.VITE_BACKEND_URL;

const TaskInfo = () => {

    const { currentBoard, updateTask } = useBoard()

    const { currentTask, setTaskInfo, setCurrentTaskSubTasks } = useTask()

    const handleSetStatus = async (_status: string) => {
        if (!currentTask) return

        const body = {
            status: _status
        }

        await axios.patch(url + "/tasks/" + currentTask._id + '/updateStatus', body, {
            withCredentials: true
        })

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

        await axios.patch(url + "/tasks/" + _id + '/updateIsDone', body, {
            withCredentials: true
        })

        const tempSubTasks = [...currentTask.subTasks]

        const updatedSubTaskIndex = tempSubTasks.findIndex(subTask => subTask._id == _id)

        tempSubTasks[updatedSubTaskIndex].isDone = _isDone

        setCurrentTaskSubTasks(tempSubTasks)
    }

    const handleSetTaskInfo = async () => {

        if (!currentTask) return
        const subTaskRes = await axios.get(url + "/tasks/" + currentTask._id + '/getSubTasks', {
            withCredentials: true
        })
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