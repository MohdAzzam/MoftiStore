
const GLOABL_CONSTANS = Object.freeze({
    USER_LANG: 'user-lang',
    USER_INFO: 'user-info',
    USER_CART: 'user-cart',
    EN_LANG: 'en',
    AR_LANG: 'ar',
    USER_CART_COUNT: 'user-cart-count'
});

const FAVORITE_ACTIONS = Object.freeze({
    ADD: "add",
    REOMVE: "remove"
});

const SORT_ACTIONS = Object.freeze({
    ASC: "asc",
    DESC: "-desc"
});

const VIEWS = Object.freeze({
    FAVORITE: 'FAVORITE',
    ORDERS: 'ORDERS',
    ADDRESS: 'ADDRESS'
}
);


export {
    GLOABL_CONSTANS,
    FAVORITE_ACTIONS,
    SORT_ACTIONS,
    VIEWS
}