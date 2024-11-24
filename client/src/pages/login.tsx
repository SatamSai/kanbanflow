import { MouseEvent, useState } from 'react'
import { Input } from '../components/Input'
import { Form, FormContainer, GoogleLoginButton, GoogleLogo, Logo, Option, OptionLink, Title, Wrapper } from './styles'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import Auth from '../Auth'
import userService from '../services/userServices'
import { useUser } from '../context/userContext'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleLogoUrl from '../assets/google.webp'


interface UserCreds {
    email: string,
    password: string,
}

const Login = () => {
    const [userCreds, setUserCreds] = useState<UserCreds>({
        email: "",
        password: ""
    })
    const { setUserInfo } = useUser()
    const navigate = useNavigate()

    const handleSetEmail = (val: string) => {
        const tempInfo = { ...userCreds }
        tempInfo.email = val
        setUserCreds(tempInfo)
    }

    const handleSetPassword = (val: string) => {
        const tempInfo = { ...userCreds }
        tempInfo.password = val
        setUserCreds(tempInfo)
    }
    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()
        if ((userCreds.password == "") || userCreds.email == "") return

        const loggedInUser = await userService.loginUser(userCreds)

        setUserInfo(loggedInUser.data)
        navigate('/')
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const body = {
                accessToken: tokenResponse.access_token
            }
            const loggedInUser = await userService.googleLogin(body)

            setUserInfo(loggedInUser.data)
            navigate('/')
        },
    });

    return (
        <Auth>
            <Wrapper>
                <Logo>KanbanFlow</Logo>
                <FormContainer>
                    <Title>LOGIN</Title>
                    <Form>
                        <Input label='Email' fieldVal={userCreds.email} handleSetVal={handleSetEmail} />
                        <Input fieldType="password" label='Password' fieldVal={userCreds.password} handleSetVal={handleSetPassword} />
                        <CustomButton text='Submit' onClick={handleSubmit} />
                    </Form>
                    <GoogleLoginButton onClick={() => googleLogin()}>
                        <GoogleLogo src={GoogleLogoUrl} />Sign in with Google
                    </GoogleLoginButton>
                    <Option>Don't have account? <OptionLink href='/register'>Register Here</OptionLink></Option>

                </FormContainer>
            </Wrapper>
        </Auth>
    )
}

export default Login