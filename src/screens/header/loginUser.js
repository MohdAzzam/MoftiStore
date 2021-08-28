import { Nav } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import GlobalContext from "../../context/GlobalContext";
import { useContext } from "react";

/**
 * This component hold login users links
 * 
 * @returns {JSX}
 */
export default function LoginUser() {
    const { handelLogout } = useContext(GlobalContext.Context);

    /**
     * Handel logout user
     */
    function handelLogoutUser() {
        handelLogout();
        window.location.reload();
    }

    return (
      
            <Nav className="me-auto">
                <Nav.Link href="/"><FormattedMessage id='user.home' /></Nav.Link>
                <Nav.Link href="/"><FormattedMessage id='user.category' /></Nav.Link>
                <Nav.Link href="/profile"><FormattedMessage id='user.profile' /></Nav.Link>
                <Nav.Link href="#"  onClick={handelLogoutUser}><FormattedMessage id='user.logout' /></Nav.Link>
            </Nav>
    )
};