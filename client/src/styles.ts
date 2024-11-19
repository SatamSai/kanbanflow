import styled from "styled-components";

export const ContentWrapper = styled.div`
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    padding-top:80px;
    box-sizing: border-box;
    display: flex;
    @media (max-width: 400px) {
        padding-top:60px;
    }
`


export const Options = styled.div`
    display: flex;
    align-items: center;
`

export const OptionImg = styled.img`
    height: 18px;
    margin-left: 20px;
    cursor: pointer;
`
