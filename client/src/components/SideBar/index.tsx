import { HideImg, HideToggle, SideBarBottomContainer, SideBarContainer } from './SideBar.styles'
import BoardsList from '../BoardsList'
import ThemeToggler from '../ThemeToggler'
import HideImgUrl from '../../assets/hide.svg'
import ShowImgUrl from '../../assets/menu.png'
import { Dispatch, SetStateAction } from 'react'

interface SidebarProps {
    showSidebar: boolean
    setShowSidebar: Dispatch<SetStateAction<boolean>>
}

const SideBar: React.FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
    const handleOnClick = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <SideBarContainer className={`${showSidebar ? 'show' : ''}`}>

            <BoardsList />
            <SideBarBottomContainer>
                <ThemeToggler />
                <HideToggle onClick={handleOnClick} className={`${showSidebar ? 'show' : ''}`}>
                    {
                        showSidebar ? <><HideImg src={HideImgUrl} /> Hide Sidebar</> : <HideImg src={ShowImgUrl} />
                    }
                </HideToggle>
            </SideBarBottomContainer>
        </SideBarContainer>
    )
}

export default SideBar