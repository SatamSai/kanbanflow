import { MouseEvent, useState } from 'react'
import { Input } from '../components/Input'
import { Form, FormContainer, Logo, Option, OptionLink, Title, Wrapper } from './styles'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Auth from '../Auth'


interface UserInfo {
    email: string,
    password: string,
}

const url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleSetEmail = (val: string) => {
        const tempInfo = { ...userInfo }
        tempInfo.email = val
        setUserInfo(tempInfo)
    }

    const handleSetPassword = (val: string) => {
        const tempInfo = { ...userInfo }
        tempInfo.password = val
        setUserInfo(tempInfo)
    }
    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()
        if ((userInfo.password == "") || userInfo.email == "") return

        const user = await axios.post(url + '/users/login', userInfo, {
            withCredentials: true
        })
        console.log(user)
        navigate('/')
    }
    return (
        <Auth>
            <Wrapper>
                <Logo>KanbanFlow</Logo>
                <FormContainer>
                    <Title>LOGIN</Title>
                    <Form>
                        <Input label='Email' fieldVal={userInfo.email} handleSetVal={handleSetEmail} />
                        <Input fieldType="password" label='Password' fieldVal={userInfo.password} handleSetVal={handleSetPassword} />
                        <CustomButton text='Submit' onClick={handleSubmit} />
                    </Form>
                    <Option>Don't have account? <OptionLink href='/register'>Register Here</OptionLink></Option>

                </FormContainer>
            </Wrapper>
        </Auth>
    )
}

export default Login