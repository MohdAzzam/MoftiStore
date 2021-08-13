import axiosApi from './axiosApi';



/**
 * 
 */
export const CartHelper = {

    myCart: () => {
        return axiosApi.get('/user-carts/my-cart?expand=items.item');
    },
    addToCart:(id,quantity)=>{
        return axiosApi.post('/user-carts/add-item',{
            itemId:id,
            quantity:quantity
        });
    },
    deleteFromCart:(id)=>{
        return axiosApi.delete(`/user-carts/delete-item/${id}?expand=items.item`);
    },
    updateItemQuantity:(id,quantity)=>{
        return axiosApi.patch(`/user-carts/update-item-quantity/${id}?expand=items.item`,{
            quantity:quantity
        })
    },
    clearUserCart:()=>{
        return axiosApi.post('/user-carts/clear');
    },
    checkOut:(id)=>{
        return axiosApi.post('/user-carts/checkout-my-cart?expand=items.item',{
            address_id:id
        });
    }
}