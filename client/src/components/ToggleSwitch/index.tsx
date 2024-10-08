import { Switch, Wrapper } from './ToggleSwitch.styles'
import { useTheme } from '../../context/themeContext'

const ToggleSwitch = () => {

    const { theme, toggleTheme } = useTheme()

    return (
        <Wrapper onClick={toggleTheme}>
            <Switch className={`${theme == "dark" && "active"}`}></Switch>
        </Wrapper>
    )
}

export default ToggleSwitch