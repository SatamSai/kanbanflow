import styled from "styled-components";


export const CreateColumnContainer = styled.div`    
    margin-left: 30px;
    width: 270px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 20px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.transparentBg};
    &:hover{
        color:#635fc7 ;
    }
`

export const CreateColumnText = styled.div`
`