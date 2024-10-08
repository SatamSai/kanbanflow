import styled from "styled-components";

export const UpdateMemberContainer = styled.div`
display:flex;
align-items: center;
flex-direction: column;
`

export const ProfileImg = styled.img`
    border: 5px solid ${({ theme }) => theme.colors.secondaryText};
    height: 80px;
    border-radius: 50%;
    background-color: white;
    margin-bottom: 30px;
`


export const MemberName = styled.div`
    font-size: 26px;
    margin-bottom: 5px;
    text-transform: uppercase;
    margin-bottom: 10px;
`

export const MemberEmail = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 15px;
`
export const Option = styled.div`
    width: 100%;
    margin-top:30px;
`