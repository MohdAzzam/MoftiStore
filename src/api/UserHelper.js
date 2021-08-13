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
     * 
     * @returns 
     */
    me: () => {
        return axiosApi.get('/users/me')
    },
    update: (data) => {
        return axiosApi.put('/users/update-info', data)
    },
    passwordUpdate: (data) => {
        return axiosApi.patch('/users/change-password', data)
    },
    // asc desc name
    myFav: (sort,name='',page) => {
        return axiosApi.get(`/users/my-favorites?expand=item&sort=${sort}&name=${name}&page=${page}`);
    },
    myOrder:()=>{
        return axiosApi.get('/users/my-orders?expand=items.item,address');
    }
   
}