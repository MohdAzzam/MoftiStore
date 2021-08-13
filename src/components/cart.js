import React, { useContext } from 'react';
import { ReactComponent as ShoppingCart } from '../media/shopping-cart.svg';
import GlobalContext from '../context/GlobalContext';
import { useHistory } from "react-router-dom";
/**
 * Custom cart component
 * 
 * @returns {JSX}
 */
export default function Cart() {
    const history = useHistory();
    const { userCartCount } = useContext(GlobalContext.Context);
    /**
     * Redirect user to cart page
     */
    const handelCartPage = () => {
        history.push('/cart');
    }
    return (
        <div>
            <ShoppingCart className='svg-img shopping-cart' onClick={handelCartPage} /> <label className='user-cart'>{userCartCount}</label>
        </div>
    );
}