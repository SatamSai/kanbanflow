import styled from "styled-components";

export const CardContainer = styled.div`
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    padding: 25px 18px;
    box-shadow: rgba(100, 100, 111, 0.15) 0px 7px 29px 0px;
    border-radius: 5px;
    cursor: pointer;
    @media (max-width: 400px) {
        padding: 18px 13px;
        margin-top: 15px;
    }
`
export const CardHeader = styled.h1`
    font-size: 15px;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.primaryText};
    @media (max-width: 400px) {
        font-size: 10px;
        margin-bottom: 10px;
    }
`

export const CardContent = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.secondaryText};
    @media (max-width: 400px) {
        font-size: 9px;
    }
`