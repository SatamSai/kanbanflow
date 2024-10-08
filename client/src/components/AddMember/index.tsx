import React, { useState } from 'react'
import { CustomDropdown, Input } from '../Input'
import CustomButton from '../CustomButton'
import { AddMemberContent, CopyText, Or } from './AddMember.styles'
import axios from 'axios'
import { useBoard } from '../../context/boardContext'

const options = ["admin", "editor", "contributor", "viewer", "guest"]
const url = import.meta.env.VITE_BACKEND_URL;
const baseLink = import.meta.env.VITE_INVITE_BASE_URL


const AddMember = () => {
    const [memberEmail, setMemberEmail] = useState("")
    const [role, setRole] = useState("")
    const [link, setLink] = useState("")
    const [copied, setCopied] = useState(false)
    const { currentBoard } = useBoard()

    const handleGenerateInviteLink = async () => {
        if (link) {
            navigator.clipboard.writeText(link)
            setCopied(true)
            return
        }
        if (currentBoard) {
            const body = {
                boardId: currentBoard._id,
                role: role
            }
            const inviteRes = await axios.post(url + '/board/generateInvite', body, {
                withCredentials: true
            })

            const invitation = inviteRes.data

            setLink(baseLink + invitation.token)
        }
    }

    return (
        <AddMemberContent>
            <CustomDropdown label='Select Role' fieldVal={role} handleSetVal={setRole} options={options} />
            <Input fieldVal={memberEmail} handleSetVal={setMemberEmail} label='User Email' />
            <CustomButton text='Send Invite' onClick={handleGenerateInviteLink} />
            <Or>or</Or>
            <CopyText onClick={handleGenerateInviteLink}>{link ? copied ? "COPIED" : "COPY LINK" : "GENERATE INVITE LINK"}</CopyText>
        </AddMemberContent>
    )
}

export default AddMember