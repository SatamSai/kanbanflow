import { SideBarBottomContainer, SideBarContainer } from './SideBar.styles'
import BoardsList from '../BoardsList'
import ThemeToggler from '../ThemeToggler'
import HideImgUrl from '../../assets/hide.svg'
import BoardItem from '../BoardItem'

const SideBar = () => {
    const handleOnClick = () => {

    }
    return (
        <SideBarContainer>

            <BoardsList />
            <SideBarBottomContainer>
                <ThemeToggler />
                <BoardItem active={false} boardItemIcon={HideImgUrl} text='Hide SideBar' handleOnClick={handleOnClick} />

            </SideBarBottomContainer>
        </SideBarContainer>
    )
}

export default SideBar