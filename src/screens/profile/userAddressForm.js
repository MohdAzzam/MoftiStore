
import { useEffect, useState } from "react";

import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { AddressHelper } from '../../api/AddressHelper';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from "react-bootstrap";

export default function UserAddressForm({
    reloadTable,
    selectedAddressess,
    action,
    isShow,
    onClose,
    afterSubmit
}) {

    const [currentAddress, setCurrentAddress] = useState({
        country: '',
        city: "",
        region: '',
        street_name: ''
    });
    const [show, setShow] = useState(isShow);

    const validation = Yup.object().shape({
        country: Yup.string()
            .required(),
        city: Yup.string().required(),
        region: Yup.string().required(),
        street_name: Yup.string().required()
    });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            country: currentAddress.country,
            city: currentAddress.city,
            region: currentAddress.region,
            street_name: currentAddress.street_name,
        },
        resolver: yupResolver(validation)
    });

    useEffect(() => {
        register('country');
        register('city');
        register('region');
        register('street_name');
    }, [])

    useEffect(() => {
        if (selectedAddressess) {
            setShow(true);
            setCurrentAddress(selectedAddressess)
        } else {
            setCurrentAddress({
                country: '',
                city: '',
                region: '',
                street_name: ''
            });
        }
    }, [selectedAddressess])


    const modal = watch();

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); }

    const handelAddress = (form) => {
        AddressHelper.addAddress(form).then(response => {
            console.log(response.data)
            handleClose();
            reloadTable();
        }).catch(e => {
            console.log(e)
        })
    }
    const handelEditAddress = (form) => {
        console.log('edit', form)
    }

    return (
        <article>
            <button className='btn btn-primary' onClick={handleShow}>
                Add Addressess
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <Input
                            type='text'
                            name='country'
                            label='Country'
                            defaultValue={modal.country}
                            errors={errors}
                            className='form-control'
                            onChange={(e) => setValue('country', e.target.value)}
                        />
                        <Input
                            type='text'
                            name='city'
                            label='City'
                            errors={errors}
                            defaultValue={modal.city}
                            className='form-control'
                            onChange={(e) => setValue('city', e.target.value)}
                        />
                        <Input
                            type='text'
                            name='region'
                            label='Region'
                            errors={errors}
                            defaultValue={modal.region}
                            className='form-control'
                            onChange={(e) => setValue('region', e.target.value)}
                        />
                        <Input
                            type='text'
                            name='street_name'
                            label='Street name'
                            errors={errors}
                            defaultValue={modal.street_name}
                            className='form-control'
                            onChange={(e) => setValue('street_name', e.target.value)}
                        />

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {action === 'edit' ? (
                        <button className='btn btn-primary' onClick={handleSubmit(handelEditAddress)}>
                            Edit
                        </button>

                    ) : (
                        <button className='btn btn-primary' onClick={handleSubmit(handelAddress)}>
                            Add
                        </button>
                    )}
                    <button className='btn btn-secondary' onClick={handleClose}>
                        Close
                    </button>

                </Modal.Footer>
            </Modal>
        </article >
    )
}