import React from 'react';
import {
    // BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Cart from './screens/cart/cart';
import CategoryProduct from './screens/categoryProduct/categoryProduct';
import Home from './screens/home/home';
import Login from './screens/login/login';
import Product from './screens/product/product';
import Register from './screens/register/register';
import singleProduct from './screens/singleProduct/singleProduct';

import PrivateRoute from "./components/PrivateRoute";
import Profile from './screens/profile/profile';
import UpdateProfile from './screens/profile/updateProfile';
import UpdatePassword from './screens/profile/updatePassword';
import CheckOut from './screens/checkOut/checkOut';
import ThankYou from './screens/thankYou/thankYou';

/**
 * this is for router
 */
export default function Main() {
    return (
        <Switch>
            <Route exact component={Home} path='/'></Route>
            <Route exact component={Login} path='/login'></Route>
            <Route exact component={Register} path='/register'></Route>
            <Route exact component={Product} path='/product'></Route>
            <Route exact component={CategoryProduct} path='/category-product/:slug'></Route>
            <Route exact component={singleProduct} path='/item/:slug'></Route>
            <PrivateRoute exact component={Cart} path='/cart'></PrivateRoute>
            <PrivateRoute exact component={Profile} path='/profile'></PrivateRoute>
            <PrivateRoute exact component={CheckOut} path='/checkOut'></PrivateRoute>
            <PrivateRoute exact component={ThankYou} path='/thanks'></PrivateRoute>
            <Route exact component={UpdateProfile} path='/update-profile'></Route>
            <Route exact component={UpdatePassword} path='/update-password'></Route>
        </Switch>

    );
}