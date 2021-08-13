import axiosApi from './axiosApi';


export const UserHelper = {
    /**
     * Login user and return user info
     * 
     * @param {Object} data 
     * @returns {Promise}
     */
    login: (data) => {
        return axiosApi.post('/authorization/login', data)
    },
    /**
     * Regester user  and return his info
     * 
     * @param {*} data 
     * @returns {Promise} 
     */
    register: (data) => {
        return axiosApi.post('/authorization/signup', data)
    },
    /**
     * Return user info 
     * @returns {Promise}
 
     */
    me: () => {
        return axiosApi.get('/users/me')
    },
    /**
     * Update User Info
     * 
     * @param {Object} data 
     * @returns {Promise}
 
     */
    update: (data) => {
        return axiosApi.put('/users/update-info', data)
    },
    /**
     * Update User Password
     * 
     * @param {*} data 
     * @returns {Promise}
 
     */
    passwordUpdate: (data) => {
        return axiosApi.patch('/users/change-password', data)
    },
    // asc desc name
    /**
     * 
     * Return user fav and sort it 
     * @param {String} sort 
     * @param {String} name 
     * @param {Number} page 
     * @returns {Promise}
 
     */
    myFav: (sort, name = '', page) => {
        return axiosApi.get(`/users/my-favorites?expand=item&sort=${sort}&name=${name}&page=${page}`);
    },
    /**
     * Return all order that user purches
     * @returns {Promise}
 
     */
    myOrder: () => {
        return axiosApi.get('/users/my-orders?expand=items.item,address');
    }

}