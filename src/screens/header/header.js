import React, { useContext, useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import GuestUser from './guestUser';
import stroage from '../../util/storage';
import { GLOABL_CONSTANS } from '../../Constant';
import { FormattedMessage } from 'react-intl';
import GlobalContext from '../../context/GlobalContext';
import LoginUser from '../header/loginUser';
import Cart from '../../components/cart';

/**
 * This Component well handel the header if guset or login 
 * and handel change language 
 * @returns { JSX }
 */
export default function Header() {
    const { user } = useContext(GlobalContext.Context);

    const [language, setLanguage] = useState('');
    /**
     *  On load the page 
     * get the langauge from local stroage
     */
    useEffect(() => {
        let lang = stroage.get(GLOABL_CONSTANS.USER_LANG);
        if (!lang) {
            stroage.set(GLOABL_CONSTANS.USER_LANG, GLOABL_CONSTANS.EN_LANG, true);
            lang = GLOABL_CONSTANS.EN_LANG;
        }

        setLanguage(lang === GLOABL_CONSTANS.EN_LANG ? GLOABL_CONSTANS.AR_LANG : GLOABL_CONSTANS.EN_LANG);
    }, []);

    /**
     * Handel change language 
     */
    function handelChangeLanguage() {
        let lang = GLOABL_CONSTANS.AR_LANG;
        if (language !== GLOABL_CONSTANS.AR_LANG) {
            lang = GLOABL_CONSTANS.EN_LANG;
        }

        stroage.remove(GLOABL_CONSTANS.USER_LANG);
        stroage.set(GLOABL_CONSTANS.USER_LANG, lang, true);
        window.location.reload();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><FormattedMessage id='home.title' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {user ? (<LoginUser />) : (<GuestUser />)}
                <button className='btn btn-dark' onClick={handelChangeLanguage}>{language}</button>
                <Cart/>
            </Container>
        </Navbar>
    )
}