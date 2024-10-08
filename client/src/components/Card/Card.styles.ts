import styled from "styled-components";

export const CardContainer = styled.div`
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    padding: 25px 18px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    cursor: pointer;
`
export const CardHeader = styled.h1`
    font-size: 15px;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.primaryText};
`

export const CardContent = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.secondaryText};
`