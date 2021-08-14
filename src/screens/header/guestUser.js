import { Nav } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

/**
 * This component hold guest users links
 * 
 * @returns {JSX}
 */
export default function GuestUser() {
    return (
            <Nav className="me-auto">
                <Nav.Link href="/login"><FormattedMessage id='guest.login' /></Nav.Link>
                <Nav.Link href="/register"><FormattedMessage id='guest.register' /></Nav.Link>
            </Nav>
    )
};