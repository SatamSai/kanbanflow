import styled from "styled-components";

export const ModalWrapper = styled.div`
    background-color: #00000077;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 3;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primaryText};
`

export const ModalContainer = styled.div`
    max-width: 480px;
    width: 90%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.primaryBg};
    padding: 32px;
    border-radius: 6px;
    @media (max-width: 450px) {
        padding: 24px;
    }
`

export const ModalTitle = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    margin-bottom: 24px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 450px) {
        margin-bottom: 20px;
        font-size: 14px;
    }
`

export const ModalTitleText = styled.div``
export const ModalContent = styled.div`
`