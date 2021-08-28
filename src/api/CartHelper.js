import axiosApi from './axiosApi';

export const CartHelper = {
    /**
     * Return Current User Cart
     * 
     * @returns {Promise}
     */
    myCart: () => {
        return axiosApi.get('/user-carts/my-cart?expand=items.item');
    },
    /**
     * Add to cart 
     * 
     * @param {Number} id 
     * @param {Number} quantity 
     * @returns 
     */
    addToCart:(id,quantity)=>{
        return axiosApi.post('/user-carts/add-item',{
            itemId:id,
            quantity:quantity
        });
    },
    /**
     * Delete from cart
     * 
     * @param {Number} id 
     * @returns 
     */
    deleteFromCart:(id)=>{
        return axiosApi.delete(`/user-carts/delete-item/${id}?expand=items.item`);
    },
    /**
     * Update quantity
     * 
     * @param {Number} id 
     * @param {Number} quantity 
     * @returns 
     */
    updateItemQuantity:(id,quantity)=>{
        return axiosApi.patch(`/user-carts/update-item-quantity/${id}?expand=items.item`,{
            quantity:quantity
        })
    },
    /**
     * Remove cart
     * 
     * @returns {Promise}
     */
    clearUserCart:()=>{
        return axiosApi.post('/user-carts/clear');
    },
    /**
     * Check out 
     * 
     * @param {Number} id 
     * @returns {Promise}
     */
    checkOut:(id)=>{
        return axiosApi.post('/user-carts/checkout-my-cart?expand=items.item',{
            address_id:id
        });
    }
}