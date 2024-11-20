import React, { useEffect, useState } from 'react'
import { CheckBox, CheckBoxFieldContainer, CheckBoxLabel, DeleteIcon, HideImg, HorizontalFlex, InputContainer, InputField, InputLabel, InputTextArea, SuggestionContainer, SuggestionInputWrapper, SuggestionItem, SuggestionState, SuggestionSubtitle, SuggestionText, SuggestionTitle } from './Input.styles'
import DeleteImgUrl from '../../assets/cross.svg'
import CustomButton from '../CustomButton'
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import CheckedIconUrl from '../../assets/check.svg'
import ShowIconUrl from '../../assets/show.svg'
import HideIconUrl from '../../assets/hide.svg'
import { useBoard } from '../../context/boardContext';
import { Task } from '../../types';
import taskService from '../../services/taskServices';

interface InputProps {
    fieldVal: string,
    fieldType?: string,
    label: string,
    handleSetVal: (val: string) => void
}

interface GroupFieldProps {
    fieldVal: Task[],
    label: string,
    handleAddSelectedItem: (_task: Task) => void
    handleRemoveItem: (index: number) => void
}

interface DropdownProps extends InputProps {
    options: string[]
}

interface TaskFieldProps {
    fieldVal: Task[],
    handleAddSelectedItem: (_val: Task) => void
}

interface ColumnFieldProps {
    fieldVal: string,
    index: number,
    handleSetVal: (val: string, index: number) => void
    handleRemoveItem: (index: number) => void
}
interface ColumnsFieldGroupProps {
    fieldVal: string[],
    label: string,
    handleSetVal: (val: string, index: number) => void,
    handleAddNewItem: () => void,
    handleRemoveItem: (index: number) => void
}

interface SelectedItemProps {
    fieldVal: Task
}

interface ChecBoxParams {
    task: Task,
    isChecked: boolean,
    toggleChecked: (_id: string, _isDone: boolean) => void
}

interface CheckBoxGroupParams {
    items: Task[],
    handleToggleCheckItem: (_id: string, _isDone: boolean) => void
}

const Input: React.FC<InputProps> = ({ fieldVal, handleSetVal, label, fieldType = "text" }) => {
    const [show, setShow] = useState<boolean>(fieldType != "password")
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <InputField type={show ? "text" : "password"} value={fieldVal} onChange={e => handleSetVal(e.target.value)} />
            {
                fieldType == "password" &&
                <HideImg src={show ? HideIconUrl : ShowIconUrl} onClick={() => setShow(!show)} />
            }
        </InputContainer>
    )
}

const TextArea: React.FC<InputProps> = ({ fieldVal, handleSetVal, label }) => {
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <InputTextArea value={fieldVal} onChange={e => handleSetVal(e.target.value)} />
        </InputContainer>
    )
}

const SelectedItem: React.FC<SelectedItemProps> = ({ fieldVal }) => {
    return (
        <SuggestionContainer selected absolute={false}>
            <SuggestionItem key={fieldVal._id} selected>
                <SuggestionText>
                    <SuggestionTitle>{fieldVal.title}</SuggestionTitle>
                    <SuggestionSubtitle>{fieldVal.description}</SuggestionSubtitle>
                </SuggestionText>
                <SuggestionState>{fieldVal.status}</SuggestionState>
            </SuggestionItem>
            <DeleteIcon src={DeleteImgUrl} />
        </SuggestionContainer>
    )
}

const SubTaskField: React.FC<TaskFieldProps> = ({ handleAddSelectedItem }) => {

    const [suggestions, setSuggestions] = useState<Task[]>([])

    const [searchTerm, setSearchTerm] = useState<string>("")

    const { currentBoard } = useBoard()

    useEffect(() => {
        const getData = setTimeout(async () => {
            if (searchTerm == "" || !currentBoard) {
                setSuggestions([])
                return
            }

            const params = {
                searchTerm
            }

            const searchResults = await taskService.searchTask(currentBoard._id, params)

            const data = searchResults.data.map((result: Task) => {
                return {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    status: result.status
                }
            })

            setSuggestions(data)

        }, 500)

        return () => clearInterval(getData)
    }, [searchTerm])


    return (
        <SuggestionInputWrapper>
            <HorizontalFlex>
                <InputField value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <div>
                    <DeleteIcon src={DeleteImgUrl} onClick={() => setSearchTerm("")} />
                </div>
            </HorizontalFlex>
            {
                suggestions &&
                <SuggestionContainer selected={false} absolute>
                    {
                        suggestions.map(suggestion => {
                            return (
                                <SuggestionItem selected={false} key={suggestion._id} onClick={() => {
                                    handleAddSelectedItem(suggestion)
                                    setSearchTerm("")
                                }}>
                                    <SuggestionText>
                                        <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                                        <SuggestionSubtitle>{suggestion.description}</SuggestionSubtitle>
                                    </SuggestionText>
                                    <SuggestionState>{suggestion.status}</SuggestionState>
                                </SuggestionItem>
                            )
                        })
                    }
                </SuggestionContainer>
            }
        </SuggestionInputWrapper>
    )
}

const SubTaskGroup: React.FC<GroupFieldProps> = ({ fieldVal, handleAddSelectedItem, label }) => {
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            {
                fieldVal.map(item => {
                    return <SelectedItem fieldVal={item} />
                })
            }
            <SubTaskField fieldVal={fieldVal} handleAddSelectedItem={handleAddSelectedItem} />
        </InputContainer>
    )
}

const ColumnField: React.FC<ColumnFieldProps> = ({ fieldVal, index, handleSetVal, handleRemoveItem }) => {
    return (
        <HorizontalFlex>
            <InputField value={fieldVal} onChange={e => handleSetVal(e.target.value, index)} />
            <div>
                <DeleteIcon src={DeleteImgUrl} onClick={() => handleRemoveItem(index)} />
            </div>
        </HorizontalFlex>
    )
}


const ColumnsFieldGroup: React.FC<ColumnsFieldGroupProps> = ({ label, fieldVal, handleSetVal, handleAddNewItem, handleRemoveItem }) => {
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            {
                fieldVal.map((item, index) => {
                    return <ColumnField key={index} index={index} fieldVal={item} handleSetVal={handleSetVal} handleRemoveItem={handleRemoveItem} />
                })
            }
            <CustomButton text='Add New' onClick={() => handleAddNewItem()} />
        </InputContainer>
    )
}

const CheckBoxField: React.FC<ChecBoxParams> = ({ task, isChecked, toggleChecked }) => {

    return (
        <CheckBoxFieldContainer>
            <CheckBox solid={isChecked} onClick={() => toggleChecked(task._id, !isChecked)}>
                {
                    isChecked && <img src={CheckedIconUrl} alt="" style={{ height: "25px", width: "25px" }} />
                }
            </CheckBox>
            <CheckBoxLabel>{task.title}</CheckBoxLabel>
        </CheckBoxFieldContainer>
    )
}

const CheckBoxGroup: React.FC<CheckBoxGroupParams> = ({ items, handleToggleCheckItem }) => {
    return (
        <InputContainer>
            <InputLabel>Subtasks (1 of 1)</InputLabel>
            {
                items.map(item => {
                    return <CheckBoxField task={item} isChecked={item.isDone} toggleChecked={handleToggleCheckItem} />
                })
            }
        </InputContainer>
    )
}

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
        borderRadius: '5px',
        borderColor: 'rgba(130,143,163,.25)',
        fontSize: '13px',
        height: '40px',
        marginBottom: '5px',
        '@media (max-width: 500px)': {
            fontSize: '10px',
            height: '30px',
        },
    },
    dropdownItem: {
        fontSize: '13px',
        lineHeight: '40px',
        '@media (max-width: 500px)': {
            fontSize: '10px',
            lineHeight: '30px',
        },
    },
    dropdownItemSelected: {
        fontSize: '13px',
        lineHeight: '40px',
        '@media (max-width: 500px)': {
            fontSize: '12px',
            lineHeight: '30px',
        },
    },
    title: {
        borderRadius: '5px',
        fontSize: '13px',
        height: '40px',
        lineHeight: '40px',
        '@media (max-width: 500px)': {
            fontSize: '10px',
            height: '30px',
            lineHeight: '30px',
        },
    },
    caretDownWrapper: {
        height: '40px',
        lineHeight: '40px',
        '@media (max-width: 500px)': {
            height: '35px',
            lineHeight: '30px',
        },
    },
};


const CustomDropdown: React.FC<DropdownProps> = ({ fieldVal, handleSetVal, options, label }) => {

    const localOptions: IDropdownOption[] = options.map(option => {
        return {
            key: option,
            text: option.toUpperCase()
        }
    })

    const onChange = (
        event: React.FormEvent<HTMLDivElement>,
        option?: IDropdownOption,
    ): void => {
        console.log(event)
        if (option) {
            handleSetVal(option.key.toString());
        }
    };

    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <Dropdown
                placeholder="Select an option"
                options={localOptions}
                selectedKey={fieldVal}
                onChange={onChange}
                styles={dropdownStyles}
            />
        </InputContainer>
    );
};
export { Input, TextArea, SubTaskGroup, CustomDropdown, ColumnsFieldGroup, CheckBoxGroup }