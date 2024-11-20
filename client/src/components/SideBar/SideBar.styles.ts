import styled from "styled-components";

export const SideBarContainer = styled.div`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    width: 270px;
    padding-top: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: margin 0.3s ease;
    overflow: visible;
    margin-left: -270px;
    z-index: 5;
    &.show{
        margin-left: 0px;
    }
    @media (max-width: 450px) {
        padding-top: 3px;
    }
`

export const SideBarBottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px 0px;
    box-sizing: border-box;
    @media (max-width: 450px) {
        padding: 25px 0px;
    }
`

export const HideToggle = styled.div`
margin-top: 20px;
    border-radius: 0px 100px 100px 0px;
    font-size: 15px;
    height:55px;
    padding-right: 10px;
    width: 100%;
    cursor: pointer;
    color:  #828fa3;
    background-color: ${props => props.theme.colors.primaryBg};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: end;
    z-index: 10;
    margin-left: 120px;
    transition: border 0.3s ease, margin 0.3s ease, justify-content 0.3s ease;
    &:hover{
        background-color: #635fc722;
        color: #635fc7;
    }

    &.show{
        border-radius: 0px;
        margin-left: 0px;
        justify-content: center;
    }
    @media (max-width: 450px) {
        font-size: 13px;
        height:45px;
    }
`

export const HideImg = styled.img`
    margin: 0px 10px;
    margin-top:2px;
    height: 30px;
    @media (max-width: 450px) {
        height: 22px;
    }
`