import { useEffect, useState } from 'react'
import Auth from '../Auth'
import { FormContainer, Title, Wrapper } from './styles'
import { Input } from '../components/Input'
import CustomButton from '../components/CustomButton'
import { ProfileImg } from '../components/UpdateRole/UpdateRole.styles'
import ProfileImgURL from '../assets/Profile.svg'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import userService from '../services/userServices'

const Fullname = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [fullname, setFullname] = useState("")

    const { setUserInfo } = useUser()

    const navigate = useNavigate()

    useEffect(() => {
        setFullname(firstName + ' ' + lastName)
    }, [firstName, lastName])

    const handleSubmitInfo = async () => {

        const body = {
            fullname
        }

        const user = await userService.submitUserInfo(body)

        setUserInfo(user.data)
        navigate('/')
    }

    return (
        <Auth>
            <Wrapper>
                <FormContainer>
                    <Title>USER INFO</Title>
                    <ProfileImg src={ProfileImgURL} style={{ marginTop: '30px' }} />
                    <Input label='First Name' fieldVal={firstName} handleSetVal={setFirstName} />
                    <Input label='LastName' fieldVal={lastName} handleSetVal={setLastName} />
                    <CustomButton text='Submit' onClick={handleSubmitInfo} />
                </FormContainer>
            </Wrapper>
        </Auth>
    )
}

export default Fullname