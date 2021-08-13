import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import Input from "../../components/Input";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function AddressForm({
    show,
    handleClose,
    action,
    onSubmit,
    address,
    entityId
}) {

    const validation = Yup.object().shape({
        country: Yup.string()
            .required(),
        city: Yup.string().required(),
        region: Yup.string().required(),
        street_name: Yup.string().required()
    });

    const { register, unregister, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    });

    useEffect(() => {
        register('country');
        register('city');
        register('region');
        register('street_name');

        return () => {
            unregister('country');
            unregister('city');
            unregister('region');
            unregister('street_name');
        };
    }, [register, unregister])


    useEffect(() => {
        setValue("country", address?.country || '');
        setValue("city", address?.city || '');
        setValue("region", address?.region || '');
        setValue("street_name", address?.street_name || '');
    }, [address, setValue])

    const model = watch();

    function handleSubmitData(data) {
        if (action === "add") {
            onSubmit(data);
            return;
        }
        onSubmit(entityId, data);
    }

    function handleCloseModal(e) {
        if(e){
            e.preventDefault();
        }
        reset();
        handleClose();
    }

    return (
        <article className="address-form">
            {show ? (
                <Modal show={show} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{action === "add" ? "Add Address" : "Edit address"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Input
                                type='text'
                                name='country'
                                label='Country'
                                errors={errors}
                                className='form-control'
                                onChange={(e) => setValue('country', e.target.value)}
                                defaultValue={model.country}
                            />
                            <Input
                                type='text'
                                name='city'
                                label='City'
                                errors={errors}
                                className='form-control'
                                onChange={(e) => setValue('city', e.target.value)}
                                defaultValue={model.city}
                            />
                            <Input
                                type='text'
                                name='region'
                                label='Region'
                                errors={errors}
                                className='form-control'
                                onChange={(e) => setValue('region', e.target.value)}
                                defaultValue={model.region}
                            />
                            <Input
                                type='text'
                                name='street_name'
                                label='Street name'
                                errors={errors}
                                className='form-control'
                                onChange={(e) => setValue('street_name', e.target.value)}
                                defaultValue={model.street_name}
                            />

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={handleSubmit(handleSubmitData)} >
                            {action === 'add' ? "Add" : "Save"}
                        </button>
                        <button className='btn btn-secondary' onClick={handleCloseModal}>
                            Close
                        </button>

                    </Modal.Footer>
                </Modal>
            ) : []}
        </article>
    );
}