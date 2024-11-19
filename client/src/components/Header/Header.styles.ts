import styled from "styled-components";

export const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0px 25px;
    color: ${({ theme }) => theme.colors.primaryText};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; 
    @media (max-width: 400px) {
        height: 60px;
        padding: 0px 15px;
    }
`

export const HeadingContainer = styled.div`
    display: flex;
    align-items: center;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
    @media (max-width: 400px) {
        margin-right: 50px;
    }
`

export const LogoImg = styled.img`
    height: 25px;
    width: 25px;
    @media (max-width: 400px) {
        height: 20px;
        width: 20px;
    }
`
export const LogoText = styled.div`
    font-size: 32px;
    margin-left: 15px;
    @media (max-width: 400px) {
        font-size: 25px;
        margin-left: 10px;
    }
`
export const Title = styled.h3`
    font-size: 21px;
    margin-right: 30px;
    @media (max-width: 400px) {
        font-size: 16px;
        margin-right: 10px;
    }
`

export const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
`

export const NewTaskButton = styled.button`
    font-size: 16px;
    padding: 15px 24px;
    margin-right: 24px;
    border-radius: 100px;
    border: 0px;
    cursor: pointer;
    background-color: #635fc7;
    font-weight: 700;
    color: white;
    &:hover{
        background-color: #a8a4ff;
    }
`

export const OtherOptions = styled.div``
export const OtherOptionsIcon = styled.img`
    cursor: pointer;
`
export const Options = styled.ul`
    display: none;
`
export const Option = styled.li``