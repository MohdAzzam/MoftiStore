import axiosApi from './axiosApi';

export  const FaviorateHelper ={
    /**
     * Add to fav
     * 
     * @param {Number} id 
     * @returns {Promise}
     */
    add:(id)=>{
        return axiosApi.post('/user-favorites/create',{
            item_id:id
        });
    },
    /**
     * Remove from fav
     * 
     * @param {Number} id 
     * @returns {Promise}
     */
    remove:(id)=>{
        return axiosApi.delete(`/user-favorites/delete/${id}`);
    }
  
}