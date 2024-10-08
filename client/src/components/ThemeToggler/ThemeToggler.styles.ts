import styled from "styled-components";

export const ThemeTogglerWrapper = styled.div`
    padding: 0px 20px;
    width: 100%;
    box-sizing: border-box;
`

export const ThemeTogglerContainer = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    padding: 18px 30px;
    border-radius:7px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
`

export const ThemeIcon = styled.img``