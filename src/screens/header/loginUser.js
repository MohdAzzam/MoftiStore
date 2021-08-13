import { Nav, Navbar } from "react-bootstrap";
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
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
                <Nav.Link href="/"><FormattedMessage id='user.home' /></Nav.Link>
                <Nav.Link href="/"><FormattedMessage id='user.category' /></Nav.Link>
                <Nav.Link href="/profile"><FormattedMessage id='user.profile' /></Nav.Link>
                <div className='btn btn-dark' onClick={handelLogoutUser}><FormattedMessage id='user.logout' /></div>
            </Nav>
        </Navbar.Collapse>
    )
};