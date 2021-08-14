import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { CartHelper } from "../../api/CartHelper";
import GlobalContext from '../../context/GlobalContext'
import Loading from '../../components/Loading';
import { useHistory } from "react-router-dom";

/**
 * 
 * Cart Screen
 * 
 * @returns {JSX}
 */

export default function Cart() {

    const { handelCartCount } = useContext(GlobalContext.Context)
    const [userCart, setUserCart] = useState(false);
    const [message, setMessage] = useState(false);
    const [load, isLoad] = useState(false);
    const history = useHistory();
    /**
     * on Load return the cart from the api 
     */
    useEffect(() => {
        CartHelper.myCart().then((res) => {
            setUserCart(res.data)
        }).catch(e => console.log(e))
    }, [])
    /**
     * Delte item from cart
     * 
     * @param {Number} id 
     */
    const handeldelete = (id) => {
        CartHelper.deleteFromCart(id).then(res => {
            setUserCart(res.data)
            handelCartCount(res.data.totalItemsCount)
        }).catch(e => {
            console.log(e);
        })
    }
    /**
     * Update Quantity
     * 
     * @param {Number} id 
     * @param {Number} quantity 
     */
    const handelQuantityUpdate = (id, quantity) => {
        /**
         * check if quantity less than 1 return warning to user
         */
        if (quantity < 1) {
            setMessage({
                type: 'warning',
                message: 'Quantity cannt be less than 1 '
            })
        } else {
            /**
             * send the data to the api to update
             */
            isLoad(true);
            CartHelper.updateItemQuantity(id, quantity).then(res => {
                isLoad(false);
                setUserCart(res.data)
                setMessage({
                    type: 'success',
                    message: 'Quantity updated successfully'
                })
            }).catch(e => {
                isLoad(false);

                setMessage({
                    type: 'warning',
                    message: e.response.data.message
                })
            })

        }

    }
    /**
     * Redirect to check out page
     */
    const handelCheckOut = () => {

        history.push('/checkOut');
    }
    /**
     * Call the api to clear cart content 
     */
    const handelClearCart = () => {
        CartHelper.clearUserCart().then(res => {
            console.log(res)
            setUserCart([]);
            handelCartCount(0);

        }).catch(e => {
            console.log(e)
        })
    }
    
    return (
        <article className='container'>
            {load ? (<Loading />) : []}
            {message ? (
                <div className={message.type === "success" ? "alert alert-success" : "alert alert-warning"}>
                    <FormattedMessage id={message.message} />
                </div>
            ) : []}
            {/* <Container > */}
                {userCart.total === 0 ? (
                    <h4 className='mt-4 text-center'>Cart Empty </h4>
                ) : (
                    <Row>
                        <Table striped bordered hover className='mt-4'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Total Price</th>
                                    <th className='btn btn-danger  ' onClick={handelClearCart}>Clear Cart</th>

                                </tr>
                            </thead>
                            <tbody>
                                {userCart && userCart.items && userCart.items.map((item, indx) => {
                                    return (
                                        <tr key={indx}>
                                            <td>{indx + 1}</td>
                                            <td>{item.item.name}</td>
                                            <td><input type='number' min='1' max={item.stock} defaultValue={item.quantity} className='form-control' onChange={(e) => handelQuantityUpdate(item.item_id, e.target.value)} /> </td>
                                            <td>{item.item.price}</td>
                                            <td><img width='200' height='200' src={item.item.imageUrl} alt={item.name} /></td>
                                            <td>{item.total}</td>
                                            <td><div onClick={() => handeldelete(item.item_id)} className='btn btn-danger'>Delete</div></td>
                                        </tr>
                                    )
                                })}
                                <tr className='text-center mt-4'>
                                    <td colSpan='7'>
                                        <FormattedMessage id='total' />:
                                        {userCart.total}
                                        <button className='btn btn-success ml-4 mr-4' onClick={handelCheckOut}>Check out</button>
                                    </td>

                                </tr>
                            </tbody>
                        </Table>
                    </Row>

                )}

            {/* </Container> */}
        </article>
    )
}
