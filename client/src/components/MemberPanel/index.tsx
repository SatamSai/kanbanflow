import { BoardContainer, BoardWrapper, MemberCard, MemberEmail, MemberInfo, MemberName, MemberRole, MembersList, NoMembersText } from './MembersPanel.styles'
import { useBoard } from '../../context/boardContext'
import CustomButton from '../CustomButton'
import { useModal } from '../../context/modalContext'
import { Member } from '../../types'
import { useUser } from '../../context/userContext'

const MembersPanel = () => {
    const { currentBoard } = useBoard()

    const { toggleShowModal, setModalKey, setModalTitle } = useModal()

    const { setSelectedUserInfo } = useUser()

    const handleAddMemberClick = () => {
        setModalKey("addMember")
        setModalTitle("Add Member")
        toggleShowModal()
    }

    const handleShowUpdateMemberDialog = (_member: Member) => {
        setModalKey("updateRole")
        setModalTitle("Manage Member")
        toggleShowModal()
        setSelectedUserInfo(_member)

    }
    return (
        <BoardContainer>
            <BoardWrapper>
                {

                    currentBoard?.members &&
                        currentBoard.members?.length > 0 ?
                        <MembersList>
                            {
                                currentBoard?.members?.map(member => {
                                    return <MemberCard onClick={() => handleShowUpdateMemberDialog(member)}>
                                        <MemberInfo>
                                            <MemberName> {member.user.fullname}</MemberName>
                                            <MemberEmail>{member.user.email}</MemberEmail>
                                        </MemberInfo>
                                        <MemberRole>
                                            {member.role}
                                        </MemberRole>
                                    </MemberCard>
                                })
                            }
                        </MembersList> : <NoMembersText>No Members</NoMembersText>
                }
                <CustomButton onClick={handleAddMemberClick} text='Add Member' />
            </BoardWrapper>
        </BoardContainer>
    )
}

export default MembersPanel