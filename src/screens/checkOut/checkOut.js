
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AddressHelper } from '../../api/AddressHelper';
import { CartHelper } from '../../api/CartHelper';
import { useHistory } from "react-router-dom";
import GlobalContext from '../../context/GlobalContext'
/**
 * 
 * Check out page 
 * 
 * @returns {JSX}
 */
export default function CheckOut() {
    const { handelCartCount } = useContext(GlobalContext.Context)
    const history = useHistory();
    const [myaddress, setMyaddress] = useState([]);
    const [total, setTotal] = useState(false);
    /**
     * on load page call the my cart api
     */
    useEffect(() => {
        CartHelper.myCart().then(res => {
            console.log(res.data.total);
            setTotal(res.data.total);
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    useEffect(() => {
        register('address_id');
    }, [])
    
    /**
     * on load call my address api 
     */
    useEffect(() => {
        AddressHelper.myAdressess().then(res => {
            let arr = [];
            let addresses = res.data.data;
            /**
             * check if there is address
             */
            if (addresses.length) {
                setValue('address_id', addresses[0].id);
            }
            /**
             * loop over address and add them to array to show them 
             */
            addresses.forEach((item) => {
                arr.push({
                    itemId: item.id,
                    display: `${item.country}  ${item.city}  ${item.region}  ${item.street_name}`
                })
            })
            setMyaddress(arr)
        }).catch(e => {
            console.log(e);
        })
    }, [])

    /**
     * handel checkout
     *  
     * @param {Object} data 
     */
    const handelAddress = (data) => {
        CartHelper.checkOut(data.address_id).then(res=>{
            /**
             * set the cart from context to zero 
             * redirect the user to thanks page
             */
            handelCartCount(0);
            history.push('/thanks')
        }).catch(err=>{
            console.log(err);
        })
    }
    
    return (

        <Container>
            <div className='mt-4'>
                <h4>Check Out Page</h4>
                <h5>Total: {total}</h5>
                <form>
                    <div className="form-group">
                        <label>Select Address </label>
                        <select className="form-control" name='address_id' onChange={(e) => setValue('address_id', e.target.value)}>
                            {myaddress && myaddress.map((item, indx) => {
                                return <option key={indx} value={item.itemId}>{item.display}</option>
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit(handelAddress)}>Submit</button>
                </form>

            </div>

        </Container>
    );
}