import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { UserHelper } from '../../api/UserHelper';

/**
 * Oeders 
 * 
 * @returns {JSX}
 */
export default function Orders() {
    const [orders, setOrders] = useState(false);
    const [ordersItem, setOrderItem] = useState(false);
    const [show, setShow] = useState(false);
    /**
     * on load call the api 
     */
    useEffect(() => {
        UserHelper.myOrder().then(response => {
            setOrders(response.data.data);

        }).catch(err => {
            console.log(err)
        })
    }, [])
    /**
     * Toggel the data
     * @param {*} data 
     */
    const handelShowItem = (data) => {
        setShow(!show);
        setOrderItem(data);
    }
    return (
        <Container>
            <Row>
                <Table striped bordered hover className='mt-4'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                <FormattedMessage id='Created At' />
                            </th>
                            <th>
                                <FormattedMessage id='Status' />
                            </th>
                            <th><FormattedMessage id='Total' /></th>
                            <th><FormattedMessage id='Address' /></th>
                            <th><FormattedMessage id='Items' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((item, indx) => {
                            return (
                                <tr key={indx}>
                                    <td>{indx + 1}</td>
                                    <td>{item.created_at}</td>
                                    <td>{item.status}</td>
                                    <td>{item.total}</td>
                                    <td>{item.address['country'] + item.address['city']}</td>
                                    <td className='btn btn-primary p-1 mt-1 mr-2 ml-2' onClick={() => handelShowItem(item.items)}>
                                        <FormattedMessage id='Show Items' />
                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Row>
            <Row className={ordersItem && show ? 'd-block' : 'd-none'}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th><FormattedMessage id='name'/></th>
                            <th><FormattedMessage id='price'/></th>
                            <th><FormattedMessage id='Image'/></th>
                            <th><FormattedMessage id='Quantity'/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersItem && ordersItem.map((item, indx) => {
                            return (
                                <tr key={indx}>
                                    <td>{indx + 1}</td>
                                    <td>{item.item.name}</td>
                                    <td >{item.item.price}</td>
                                    <td ><img className='table-image' src={item.item.featuredImage} alt={item.item.name} /></td>
                                    <td>{item.quantity}</td>
                                </tr>
                            );
                        })
                        }

                    </tbody>
                </Table>

            </Row>

        </Container>
    )
}