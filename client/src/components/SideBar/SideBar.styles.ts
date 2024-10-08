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
`

export const SideBarBottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px 0px;
    box-sizing: border-box;
`