import styled from "styled-components";

interface PanelOption {
    isActive: boolean
}

export const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
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
    padding: 20px;
    max-width: 400px;
    width: 95%;
    background-color: ${({ theme }) => theme.colors.primaryBg};
`

export const Logo = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 60px;
    margin-bottom: 25px;
`

export const Title = styled.div`
    margin-top: 20px;
    font-size: 25px;
    color: ${({ theme }) => theme.colors.primaryText};
    box-sizing: border-box;
`
export const Form = styled.form`
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
`


export const Option = styled.div`
    font-size: 13px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primaryText};
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