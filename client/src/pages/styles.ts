import styled from "styled-components";

interface PanelOption {
    isActive: boolean
}

export const Wrapper = styled.div`
    height: 100dvh;
    width: 100dvw;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

export const FormContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 450px;
    width: 90%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    padding: 20px 40px;
    @media (max-width: 450px) {
        padding: 23px;
    }
`

export const Logo = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 60px;
    margin-bottom: 25px;
    @media (max-width: 450px) {
        font-size: 30px;
    }
`

export const Title = styled.div`
    margin-top: 20px;
    font-size: 25px;
    color: ${({ theme }) => theme.colors.primaryText};
    box-sizing: border-box;
    @media (max-width: 450px) {
        font-size: 18px;
    }
`
export const Form = styled.form`
    box-sizing: border-box;
    width: 100%;
    padding: 20px 0px;
    @media (max-width: 450px) {
        padding: 10px 0px;
    }
`


export const Option = styled.div`
    font-size: 13px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primaryText};
    @media (max-width: 450px) {
        margin-top: 5px;
        font-size: 9px;
    }
`
export const OptionLink = styled.a`
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.secondaryText};
    text-decoration: underline;
    cursor: pointer;
`


export const PanelWrapper = styled.div`
    display: flex;
    flex-direction:column;
    width: calc(100% - 270px);
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    transition: width 0.3s ease;
    overflow: hidden;
    &.show{
        width: 100%;
    }
`
export const PanelHeading = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 30px;

    padding-top: 10px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.primaryBg};
`
export const PanelOption = styled.div<PanelOption>`
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.secondaryBg : theme.colors.primaryBg};
    border-radius: 10px 10px 0px 0px;
    height:45px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryText};
    @media (max-width: 450px) {
        height:35px;
        width: 110px;
        font-size: 12px;
    }
`

export const PanelBody = styled.div`
    height: calc(100% - 55px);
    width: 100%;
`

export const Sections = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

export const GoogleLogo = styled.img`
    height: 30px;
    margin-top: 1px;
`

export const GoogleLoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    font-size: 13px;
    border-radius: 100px;
    border: 0px;
    cursor: pointer;
    font-weight: 700;
    background-color: white;
    color:${({ theme }) => theme.colors.primary};
    margin: 0px 20px;
    gap: 10px;
    margin-top: -10px;
    margin-bottom: 20px;
    @media (max-width: 450px) {
        height: 30px;
        font-size: 9.5px;
    }
`