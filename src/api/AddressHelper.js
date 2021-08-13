import axiosApi from './axiosApi';

export const AddressHelper = {
    myAdressess: () => {
        return axiosApi.get('/users/my-addresses');
    },
    addAddress: (data) => {
        return axiosApi.post('/user-address/create', data)
    },
    updateAddress: (id, data) => {
        return axiosApi.patch(`/user-address/update?id=${id}`, data);
    },
    deleteAddress: (id) => {
        return axiosApi.delete(`/user-address/delete?id=${id}`)
    }
}

