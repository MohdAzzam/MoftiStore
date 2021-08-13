import axiosApi from './axiosApi';


export const ProductHelper = {

    /**
     * Return list of items 
     * 
     * @returns {Promise}
     */
    list: (keyword) => {

        let params = '';
        if (keyword && keyword !== '') {
            params = new URLSearchParams({
                keyword: keyword
            });
        }

        return axiosApi.get("/items/index", { params });
    },
    /**
     * Return items by Category slug and page Number
     * 
     * @param {String} slug 
     * @param {Number} pageNumber 
     * @returns {Promise}
     */
    listBySlug: (slug, pageNumber, keyword) => {
        let params = {
            page: pageNumber
        };
        if (keyword && keyword !== '') {
            params.keyword = keyword;
        }

        params = new URLSearchParams(params);

        return axiosApi.get(`/items/list/${slug}?page=${pageNumber}`, { params })
    },
    /**
     * Return Item by slug
     * 
     * @param {String} slug 
     * @returns {Promise}
     */
    itemBySlug: (slug) => {
        return axiosApi.get(`/items/${slug}`)
    }
}