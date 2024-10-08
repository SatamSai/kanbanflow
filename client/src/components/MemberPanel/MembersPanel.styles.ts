import styled from "styled-components";



export const BoardContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
`

export const BoardWrapper = styled.div`
    height:100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
`

export const MembersList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow-y:auto;
    width: 100%;
    margin-bottom: 30px;
    height: calc(100% - 85px);
    /* Custom Scrollbar */
    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #635fc7;
        border-radius: 10px;
        border: 2px solid transparent;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primaryBg};
        border-radius: 5px;
    }
`

export const NoMembersText = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 85px);
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.secondaryText}; ;
`

export const MemberCard = styled.div`
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme }) => theme.colors.primaryBg};
    border-radius: 10px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    margin:15px;
`

export const MemberInfo = styled.div``

export const MemberRole = styled.div`
font-size:13px;
text-transform: uppercase;
`

export const MemberName = styled.div`
    font-size: 18px;
    margin-bottom: 5px;
`
export const MemberEmail = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 11px;
`