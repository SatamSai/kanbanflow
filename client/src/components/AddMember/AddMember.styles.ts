import styled from "styled-components";

export const AddMemberContent = styled.div`
color: ${({ theme }) => theme.colors.primaryText};

`

export const CopyText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    padding: 20px;
    box-sizing: border-box;
    border: 1px dashed ${({ theme }) => theme.colors.secondaryText};
    cursor: pointer;
    &:hover{
        border-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
    }
    @media (max-width: 450px) {
        font-size: 11px;
        padding: 12px;
    }
`

export const Or = styled.p`
padding: 30px 0px;
box-sizing: border-box;
    width: 100%;
    text-align: center;
    @media (max-width: 450px) {
        padding: 10px 0px;
    }
`