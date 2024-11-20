import styled from "styled-components";

interface InputProps {
    half?: boolean
}

interface CheckBoxProps {
    onClick: () => void,
    solid: boolean
}
interface SuggestionContainerProps {
    absolute: boolean
    selected: boolean
}

interface SuggestedItemProps {
    selected: boolean
}

export const InputContainer = styled.div<InputProps>`
    width: ${({ half }) => half ? '50%' : '100%'};
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    @media (max-width: 400px) {
        margin-bottom: 13px;
    }
`

export const InputLabel = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.secondaryText};
    margin-bottom: 8px;
    @media (max-width: 400px) {
        font-size: 9px;
        margin-bottom: 6px;
    }
`

export const InputField = styled.input`
    width: 100%;
    height:40px;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid rgba(130,143,163,.25);
    padding: 0px 10px;
    box-sizing: border-box;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primaryText};
    &:focus{
        border: 0.5 solid red;
    }
    @media (max-width: 400px) {
        font-size: 10px;
        padding: 0px 8px;
        height:30px;
    }
`

export const HideImg = styled.img`
    position: absolute;
    bottom: 7px;
    right: 7px;
    height: 25px;
    cursor: pointer;
`

export const InputTextArea = styled.textarea`
    width: 100%;
    height:120px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid rgba(130,143,163,.25);
    color: ${({ theme }) => theme.colors.primaryText};
    padding: 10px 10px;
    box-sizing: border-box;
    font-size: 13px;
    &:focus{
        border: 0.5 solid red;
    }
    @media (max-width: 400px) {
        font-size: 10px;
        padding: 7px 7px;
        height:90px;
    }
`

export const HorizontalFlex = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`


export const CheckBoxFieldContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 14px 10px;
    background-color: blue;
    margin-bottom: 5px;
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    &:hover{
        background-color: #635fc740;
    }
    @media (max-width: 400px) {
        padding: 9px 7px;
    }
`

export const DeleteIcon = styled.img`
    height: 15px;
    width: 15px;
    margin-left: 15px;
    cursor: pointer;
    @media (max-width: 400px) {
        height: 11px;
        width: 11px;
    }
`

export const CheckBox = styled.div<CheckBoxProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16px;
    width: 16px;
    background-color: ${props => props.solid ? "#635fc7" : "white"};
    border-radius: 4px;
    margin-right: 20px;
    border: 1px solid #635fc7;
    cursor: pointer;
    @media (max-width: 400px) {
        height: 11px;
        width: 11px;
        border-radius: 2.5px;
        margin-right: 10px;
    }
`


export const CheckBoxLabel = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primaryText};
    @media (max-width: 400px) {
        font-size: 8.5px;
    }
`

export const SuggestionInputWrapper = styled.div`
    position: relative;
    width:100%;
`

export const SuggestionContainer = styled.div<SuggestionContainerProps>`
    position: ${props => props.absolute && "absolute"};
    display: flex;
    flex-direction: ${props => props.selected ? 'row' : 'column'};
    align-items:center;
    top: 42px;
    max-height: 170px;
    overflow-y: auto;
    width: 100%;
    z-index: 5;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: ${props => props.selected ? '10px' : '0px'};

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
    @media (max-width: 400px) {
        top: 30px;
    }
`


export const SuggestionItem = styled.div<SuggestedItemProps>`
    display: flex;
    align-items: center;
    padding: 10px 10px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid gray;
    color: ${props => props.selected ? 'white' : props.theme.colors.primaryText};
    background-color: ${props => props.selected ? '#635fc7' : props.theme.colors.secondaryBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    @media (max-width: 400px) {
        padding: 8px 8px;
    }
`

export const SuggestionText = styled.div`

`

export const SuggestionTitle = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    @media (max-width: 400px) {
        font-size: 10px;
    }
`

export const SuggestionSubtitle = styled.div`
    font-size: 10px;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    @media (max-width: 400px) {
        font-size: 8px;
    }
`

export const SuggestionState = styled.div`
    font-size:12px;
    @media (max-width: 400px) {
        font-size: 8.5px;
    }
`