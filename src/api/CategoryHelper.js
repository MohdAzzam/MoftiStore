import axiosApi from './axiosApi';



/**
 * 
 */
export const CategoryHelper = {
    /**
     * List of category 
     * 
     * @returns {Promise}
     */
    list: () => {
        return axiosApi.get('/category/index');
    }
    
}