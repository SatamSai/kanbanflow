import styled from "styled-components";

interface BoardItemProps {
    active: boolean;
}

export const BoardItemContainer = styled.li<BoardItemProps>`
    display: flex;
    align-items: center;
    margin-right: 30px;
    border-radius: 0px 100px 100px 0px;
    font-size: 15px;
    padding: 15px 20px;
    cursor: pointer;
    background-color:  ${props => props.active ? "#635fc7" : props.theme.colors.primaryBg};
    color: ${props => props.active ? "white" : "#828fa3"};
    &:hover{
        background-color: #635fc722;
        color: #635fc7;
    }
`

export const BoardItemImg = styled.img`
    margin: 0px 3px;
    margin-top:2px;
`
export const BoardItemText = styled.div`
    margin: 0px 8px;
`