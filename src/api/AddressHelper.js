import axiosApi from './axiosApi';

export const AddressHelper = {
    /**
     * Return all usser address
     * 
     * @returns {Promise}
     */
    myAdressess: () => {
        return axiosApi.get('/users/my-addresses');
    },
    /**
     * Add new address
     * 
     * @param {Object} data 
     * @returns {Promise}
     */
    addAddress: (data) => {
        return axiosApi.post('/user-address/create', data)
    },
    /**
     * Update address
     * 
     * @param {Number} id 
     * @param {Object} data 
     * @returns 
     */
    updateAddress: (id, data) => {
        return axiosApi.patch(`/user-address/update?id=${id}`, data);
    },
    /**
     * Remove address 
     * 
     * @param {Number} id 
     * @returns 
     */
    deleteAddress: (id) => {
        return axiosApi.delete(`/user-address/delete?id=${id}`)
    }
}

