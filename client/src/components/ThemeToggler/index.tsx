import { ThemeIcon, ThemeTogglerContainer, ThemeTogglerWrapper } from './ThemeToggler.styles'
import DarkThemeIcon from '../../assets/dark.svg'
import LightThemeIcon from '../../assets/light.svg'
import ToggleSwitch from '../ToggleSwitch'

const ThemeToggler = () => {
    return (
        <ThemeTogglerWrapper>
            <ThemeTogglerContainer>
                <ThemeIcon src={LightThemeIcon} height={'22px'} width={'22px'} />
                <ToggleSwitch />
                <ThemeIcon src={DarkThemeIcon} height={'18px'} width={'18px'} />
            </ThemeTogglerContainer>
        </ThemeTogglerWrapper>
    )
}

export default ThemeToggler