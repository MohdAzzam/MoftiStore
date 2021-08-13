import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { UserHelper } from '../../api/UserHelper';

export default function Orders() {
    const [orders, setOrders] = useState(false);
    const [ordersItem, setOrderItem] = useState(false);
    const [show,setShow]=useState(false);
    useEffect(() => {
        UserHelper.myOrder().then(response => {
            setOrders(response.data.data);

        }).catch(err => {
            console.log(err)
        })
    }, [])
    const handelShowItem = (data) => {
        console.log(data)
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
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Items</th>
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
                                    <td className='btn btn-primary p-1 mt-1 mr-2 ml-2' onClick={() => handelShowItem(item.items)}>Show Items</td>

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
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersItem && ordersItem.map((item, indx) => {
                            return (
                                <tr key={indx}>
                                    <td>{indx + 1}</td>
                                    <td>{item.item.name}</td>
                                    <td >{item.item.price}</td>
                                    <td ><img className='table-image' src={item.item.imageUrl} alt={item.item.name} /></td>
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