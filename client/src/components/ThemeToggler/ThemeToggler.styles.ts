import styled from "styled-components";

export const ThemeTogglerWrapper = styled.div`
    padding: 0px 20px;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 450px) {
        padding: 0px 12px;
    }
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
    @media (max-width: 450px) {
        padding: 13px 20px;
        justify-content: center;
        gap: 17px;
    }
`

export const ThemeIcon = styled.img`
    @media (max-width: 450px) {
        scale: 0.85;
    }
`