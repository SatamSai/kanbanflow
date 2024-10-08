import { useState } from 'react'
import { useUser } from '../../context/userContext'
import { MemberEmail, MemberName, Option, ProfileImg, UpdateMemberContainer } from './UpdateRole.styles'
import ProfileImgURL from '../../assets/Profile.svg'
import { CustomDropdown } from '../Input'

const options = ["admin", "editor", "contributor", "viewer", "guest"]

const UpdateRole = () => {

    const { selectedMemberInfo } = useUser()

    const [role, setRole] = useState(selectedMemberInfo?.role || 'guest')

    return (
        <>
            {
                selectedMemberInfo &&
                <UpdateMemberContainer>
                    <ProfileImg src={ProfileImgURL} />
                    <MemberName>{selectedMemberInfo?.user.username}</MemberName>
                    <MemberEmail>{selectedMemberInfo?.user.email}</MemberEmail>
                    <Option>
                        <CustomDropdown label='Member Role' fieldVal={role} handleSetVal={setRole} options={options} />
                    </Option>
                </UpdateMemberContainer>
            }
        </>
    )
}

export default UpdateRole