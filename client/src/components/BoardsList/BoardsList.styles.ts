import styled from "styled-components";


export const BoardItemContainer = styled.div`
max-height:65%;
`

export const Title = styled.div`
    margin-left: 20px;
    font-size: 12.5px;
    padding: 25px 0px;
    color: #828fa3;
    letter-spacing: 2px;
    @media (max-width: 400px) {
        font-size: 9.5px;
        padding: 25px 0px;
    }
`

export const BoardItems = styled.ul`
    overflow-y: auto;
    height: 100%;
    /* Custom Scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #635fc7;
        border-radius: 10px;
        border: 1px solid transparent;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-track {
        background-color: #e0e0e0;
        border-radius: 10px;
    }
`
