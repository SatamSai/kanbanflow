import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    width: 50px;
    background-color: #635fc7;
    height: 21px;
    border-radius: 20px;
    cursor: pointer;
    &:hover{
        background-color:#a8a4ff
    }
`
export const Switch = styled.div`
    position: absolute;
    top: 3px;
    background-color:white;
    height: 15px;
    width: 15px;
    border-radius: 8px;
    transform: translateX(3px);
    transition: transform 0.3s ease-out;
    &.active{
        transform: translateX(32px);
        transition: transform 0.3s ease-out;
    }
`