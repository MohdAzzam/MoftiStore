import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { AddressHelper } from '../../api/AddressHelper';
import AddressForm from "./addressForm";

export default function Address() {
    const [addressess, setAddressess] = useState(false);
    const [addressFormModal, setAddressFormModal] = useState({});

    useEffect(() => {
        AddressHelper.myAdressess().then(response => {
            setAddressess(response.data.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const reloadTable = () => {
        AddressHelper.myAdressess().then(response => {
            setAddressess(response.data.data);
        }).catch(e => {
            console.log(e)
        })
    }

    function handleShowAddForm() {
        setAddressFormModal({
            show: true,
            handleClose: handleCloseAddressForm,
            action: "add",
            onSubmit: handleAddAddress
        });
    }

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

    function handleCloseAddressForm(e) {
        if (e) {
            e.preventDefault();
        }
        setAddressFormModal({});
    }

    function handleAddAddress(data) {
        handleCloseAddressForm();
        AddressHelper.addAddress(data).then((res) => {
            reloadTable();
        }).catch((err) => {

        })
    }

    function handleEditAddress(id, data) {
        handleCloseAddressForm();
        AddressHelper.updateAddress(id, data).then((res) => {
            reloadTable();
        }).catch((err) => {

        })
    }
    const handleDelete =(id)=>{
        AddressHelper.deleteAddress(id).then((res) => {
            reloadTable();
        }).catch((err) => {

        })
    }
    return (
        <Container>

            <div className='d-flex justify-content-between mt-4'>
                <button className='btn btn-primary' onClick={handleShowAddForm}>
                    Add Addressess
                </button>

            </div>
            <AddressForm {...addressFormModal} />
            <Row>
                <Table striped bordered hover className='mt-4'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Regon</th>
                            <th>Street name</th>
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
                                    <td className='btn btn-warning' onClick={() => handleShowEditForm(item)}>Edit</td>
                                    <td className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</td>

                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Row>
        </Container >
    )
}