import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { AddressHelper } from '../../api/AddressHelper';
import AddressForm from "./addressForm";

/**
 * Address
 * 
 * @returns {JSX}
 */
export default function Address() {
    const [addressess, setAddressess] = useState(false);
    const [addressFormModal, setAddressFormModal] = useState({});
    /**
     * on load call the address api
     */
    useEffect(() => {
        AddressHelper.myAdressess().then(response => {
            setAddressess(response.data.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])
    /**
     * after adding new address call the api again throw this function
     */
    const reloadTable = () => {
        AddressHelper.myAdressess().then(response => {
            setAddressess(response.data.data);
        }).catch(e => {
            console.log(e)
        })
    }
    /**
     * Show add modal
     */
    function handleShowAddForm() {
        setAddressFormModal({
            show: true,
            handleClose: handleCloseAddressForm,
            action: "add",
            onSubmit: handleAddAddress
        });
    }

    /**
     * Show edit modal
     * 
     * @param {Object} item 
     */
    function handleShowEditForm(item) {

        setAddressFormModal({
            show: true,
            handleClose: handleCloseAddressForm,
            action: "edit",
            onSubmit: handleEditAddress,
            address: item,
            entityId: item.id
        });
    }
    /**
     * Close modal 
     * @param {*} e 
     */
    function handleCloseAddressForm(e) {
        if (e) {
            e.preventDefault();
        }
        setAddressFormModal({});
    }
    /**
     * Add addresss 
     * 
     * @param {*} data 
     */
    function handleAddAddress(data) {
        handleCloseAddressForm();
        AddressHelper.addAddress(data).then((res) => {
            reloadTable();
        }).catch((err) => {

        })
    }

    /**
     * Update address
     * 
     * @param {Number} id 
     * @param {*} data 
     */
    function handleEditAddress(id, data) {
        handleCloseAddressForm();
        AddressHelper.updateAddress(id, data).then((res) => {
            reloadTable();
        }).catch((err) => {

        })
    }
    /**
     * 
     * Delete address
     * @param {Number} id 
     */
    const handleDelete = (id) => {
        AddressHelper.deleteAddress(id).then((res) => {
            reloadTable();
        }).catch((err) => {

        })
    }
    return (
        <Container>

            <div className='d-flex justify-content-between mt-4'>
                <button className='btn btn-primary' onClick={handleShowAddForm}>
                    <FormattedMessage id='Add Addressess'/>
                </button>

            </div>
            <AddressForm {...addressFormModal} />
            <Row>
                <Table striped bordered hover className='mt-4'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                <FormattedMessage id='Country' />

                            </th>
                            <th>
                                <FormattedMessage id='City' />

                            </th>
                            <th>
                                <FormattedMessage id='Regon' />
                            </th>
                            <th>
                                <FormattedMessage id='Street name' />

                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {addressess && addressess.map((item, indx) => {
                            return (
                                <tr key={indx}>
                                    <td>{indx + 1}</td>
                                    <td>{item.country}</td>
                                    <td>{item.city}</td>
                                    <td>{item.region}</td>
                                    <td>{item.street_name}</td>
                                    <td className='btn btn-warning' onClick={() => handleShowEditForm(item)}>
                                        <FormattedMessage id='Edit'/>
                                    </td>
                                    <td className='btn btn-danger' onClick={() => handleDelete(item.id)}>
                                        <FormattedMessage id='Delete'/>
                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Row>
        </Container >
    )
}