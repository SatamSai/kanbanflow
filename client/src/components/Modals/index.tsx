import Modal from '../Modal'
import CreateTask from '../CreateTask'
import CreateBoard from '../CreateBoard'
import TaskInfo from '../TaskInfo'
import { useModal } from '../../context/modalContext'
import { useTask } from '../../context/taskContext'
import axios from 'axios'
import { useBoard } from '../../context/boardContext'
import AddMember from '../AddMember'
import UpdateRole from '../UpdateRole'
import InviteModal from '../InviteModal'

interface Props {
    closeModal: () => void
}

const url = import.meta.env.VITE_BACKEND_URL;

const Modals = ({ closeModal }: Props) => {
    const { show, key, setModalKey, toggleShowModal } = useModal()
    const { setEditableTaskInfo, currentTask } = useTask()
    const { deleteTask } = useBoard()

    const handleOpenEditModal = () => {
        setModalKey("editTask")
        setEditableTaskInfo(currentTask)
    }

    const handleDeleteTask = async () => {
        if (!currentTask) return

        await axios.delete(url + '/tasks/' + currentTask._id, {
            withCredentials: true
        })
        deleteTask(currentTask._id)
        toggleShowModal()
    }
    return (
        <>{
            show && <>
                {
                    key == "createTask" || key == "editTask" ?
                        <Modal handleOpenEditModal={handleOpenEditModal} closeModal={closeModal}>
                            <CreateTask />
                        </Modal> :
                        key == "createBoard" || key == "editBoard" ?
                            <Modal closeModal={closeModal}>
                                <CreateBoard />
                            </Modal> :
                            key == "taskInfo" ?
                                <Modal closeModal={closeModal} handleDeleteItem={handleDeleteTask} handleOpenEditModal={handleOpenEditModal}>
                                    <TaskInfo />
                                </Modal> :
                                key == "addMember" ?
                                    <Modal closeModal={closeModal}>
                                        <AddMember />
                                    </Modal> :
                                    key == "updateRole" ?
                                        <Modal closeModal={closeModal}>
                                            <UpdateRole />
                                        </Modal> :
                                        key == "inviteModal" ?
                                            <Modal closeModal={closeModal}>
                                                <InviteModal />
                                            </Modal> :
                                            <></>
                }
            </>
        }
        </>
    )
}

export default Modals