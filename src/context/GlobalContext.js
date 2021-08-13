import React, { createContext, useCallback, useState } from 'react';
import storage from '../util/storage';
import { GLOABL_CONSTANS } from "../Constant";
const Context = createContext();
/**
 * Get user from local stroage
 * 
 * @returns {Object|Boolean}
 */
function getUser() {
    const user = storage.get(GLOABL_CONSTANS.USER_INFO);
    if (!user) return false;

    return user;
}

function getUserCartCount() {
    let userCart = storage.get(GLOABL_CONSTANS.USER_CART_COUNT);
    if (userCart) {
        return userCart;
    }

    return [];
}

/**
 * decaleare Gloabal Context Provider 
 * 
 * @param {*} children 
 * @returns {Provider}
 */
function Provider({ children }) {
    const [user, setUser] = useState(getUser());
    // const [userCart, setUserCart] = useState(getUserCart());
    const [userCartCount, setUserCartCount] = useState(getUserCartCount());
    /**
     * Logout user by removeing userinfo from localstorage
     */
    const handelLogout = useCallback(() => {
        storage.remove(GLOABL_CONSTANS.USER_INFO);
        setUser(false);
    }, [])

    /**
     * Login user and add userinfo to localstorage
     */
    const handelLoginUser = useCallback((data) => {
        setUser(data);
        storage.set(GLOABL_CONSTANS.USER_INFO, data);

    }, []);
    const handelUpdateUser = useCallback((data) => {
        setUser(data);
        storage.set(GLOABL_CONSTANS.USER_INFO, data);

    }, [])
    const handelUpdateUserPassword = useCallback((data) => {
        handelLogout();
        // setUser(data);
        // storage.set(GLOABL_CONSTANS.USER_INFO, data);

    }, [])
    // const handelAddToUserCart = useCallback((stock, data) => {
    //     if (data.stock < stock) {
    //         return false;
    //     }
    //     stock = parseInt(stock);
    //     let temporaryUserCart = [...userCart];
    //     let item = data;
    //     let itemIndex = -1;

    //     temporaryUserCart.forEach((element, index) => {
    //         if (element.id === data.id) {
    //             item = element;
    //             itemIndex = index;
    //             return;
    //         }
    //     });

    //     if (itemIndex !== -1) {
    //         let quantity = item.quantity + stock;
    //         if (item.stock < quantity) {
    //             return true;
    //         }
    //         stock = quantity;
    //         temporaryUserCart.splice(itemIndex, 1);
    //     }

    //     item.quantity = stock;
    //     temporaryUserCart.push(item);
    //     storage.set(GLOABL_CONSTANS.USER_CART, temporaryUserCart);
    //     setUserCart(temporaryUserCart);
    //     return "Done added to cart";

    // }, [userCart])
    // const handelDeleteFromCart = useCallback((itemIndx) => {
    //     let temporaryUserCart = [...userCart];
    //     temporaryUserCart.splice(itemIndx, 1)
    //     setUserCart(temporaryUserCart);
    //     storage.set(GLOABL_CONSTANS.USER_CART, temporaryUserCart);
    //     console.log('you did it', itemIndx);
    // }, [userCart])

    // const handelQuantity = useCallback((itemIndex, quantity) => {
    //     let temporaryUserCart = [...userCart];
    //     let item = temporaryUserCart[itemIndex];
    //     if (item) {
    //         let newQuantity = parseInt(quantity);
    //         if (item.stock >= newQuantity) {
    //             item.quantity = newQuantity;
    //             setUserCart(temporaryUserCart);
    //             storage.set(GLOABL_CONSTANS.USER_CART, temporaryUserCart);
    //         }
    //     }
    // }, [userCart])
    const handelCartCount = useCallback((number) => {
        setUserCartCount(number);
        storage.set(GLOABL_CONSTANS.USER_CART_COUNT,number,1);
    }, [])
    return (
        <Context.Provider value={{
            user,
            handelLoginUser,
            handelLogout,
            // handelAddToUserCart,
            // userCart,
            handelUpdateUser,
            handelUpdateUserPassword,
            // handelDeleteFromCart,
            // handelQuantity,
            handelCartCount,
            userCartCount

        }}>
            {children}
        </Context.Provider>
    );
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Context,
    Provider,
    Consumer: Context.Consumer,
};
