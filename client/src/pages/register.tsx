import { MouseEvent, useState } from 'react'
import { Input } from '../components/Input'
import { Form, FormContainer, Logo, Option, OptionLink, Title, Wrapper } from './styles'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import Auth from '../Auth'
import { useUser } from '../context/userContext'
import userService from '../services/userServices'


interface UserInfo {
    username: string,
    email: string,
    password: string,
}

const Register = () => {
    const [user, setUser] = useState<UserInfo>({
        username: "",
        email: "",
        password: ""
    })

    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const navigate = useNavigate()
    const { setUserInfo } = useUser()


    const handleSetEmail = (val: string) => {
        const tempInfo = { ...user }
        tempInfo.email = val
        setUser(tempInfo)
    }

    const handleSetUsername = (val: string) => {
        const tempInfo = { ...user }
        tempInfo.username = val
        setUser(tempInfo)
    }

    const handleSetPassword = (val: string) => {
        const tempInfo = { ...user }
        tempInfo.password = val
        setUser(tempInfo)
    }

    const verifyEmail = (_email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(_email)
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()
        if ((user.password != confirmPassword || confirmPassword == "") || !verifyEmail(user.email) || user.username == "") return

        await userService.registerUser(user)

        const credsBody = {
            email: user.email,
            password: user.password
        }

        const loggedInUser = await userService.loginUser(credsBody)
        setUserInfo(loggedInUser.data)
        navigate('/')
    }

    return (
        <Auth>
            <Wrapper>
                <Logo>KanbanFlow</Logo>
                <FormContainer>
                    <Title>REGISTER</Title>
                    <Form>
                        <Input label='Username' fieldVal={user.username} handleSetVal={handleSetUsername} />
                        <Input label='Email' fieldVal={user.email} handleSetVal={handleSetEmail} />
                        <Input fieldType="password" label='Password' fieldVal={user.password} handleSetVal={handleSetPassword} />
                        <Input fieldType="password" label='Confirm Password' fieldVal={confirmPassword} handleSetVal={setConfirmPassword} />
                        <CustomButton text='Submit' onClick={(e) => handleSubmit(e)} />
                    </Form>
                    <Option>Already have an account? <OptionLink href='/login'>Login Here</OptionLink></Option>
                </FormContainer>
            </Wrapper>
        </Auth>
    )
}

export default Register