/**
 * name: axiosApi.js
 * desc: the axios instance should be decalred here.
 */

import axios from 'axios';
import storage from '../util/storage';
import { GLOABL_CONSTANS } from '../Constant';
/**
 * declare the instance. 
 * hold the api link to reduce redandant 
 */
const instance = axios.create({
    baseURL: "http://admin.comprehensive-first-aid.net/api",
    params: {},
});

/**
 * Add a request interceptor
 */
instance.interceptors.request.use(async config => {
    /**
     * Get User form localStorage 
     * add accessToken to the request headers
     * add Accept Language to the request headers
     * 
     */
    const user = storage.get('user-info');
    if (user && user['access_token']) {
        config.headers['Authorization'] = `Bearer ${user['access_token']}`
    }

    let lang = storage.get(GLOABL_CONSTANS.USER_LANG);
    config.headers['Accept-Language'] = lang

    return config;

});

/**
 * export instance as default.
 */
export default instance;