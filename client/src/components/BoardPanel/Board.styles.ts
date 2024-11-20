import styled from "styled-components";



export const BoardContainer = styled.div`
position: relative;
    height: 100%;
    width: 100%;
`

export const BoardWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    /* Custom Scrollbar */
    &::-webkit-scrollbar {
        height: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #635fc7;
        border-radius: 10px;
        border: 2px solid transparent;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-track {
        background-color: #e0e0e0;
        border-radius: 5px;
    }
`

export const FloatingWrapper = styled.div`
    position: absolute;
    bottom: 30px;
    right:30px;
    width: 150px;
    overflow: hidden;
    
`