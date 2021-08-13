import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Input from '../../components/Input';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';
import { UserHelper } from '../../api/UserHelper';
import Loading from '../../components/Loading';
import { useHistory } from "react-router-dom";
import GlobalContext from '../../context/GlobalContext';

/**
 * 
 * @returns { JSX }
 */
export default function Register() {
    let history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const { handelLoginUser } = useContext(GlobalContext.Context);

    /**
     * Validation Schema
     */
    const validation = Yup.object().shape({
        email: Yup.string().email('please type a correct email')
            .required('email.req'),
        password: Yup.string().required('password.req'),
        username: Yup.string().required('username.req'),
        phoneNumber: Yup.string().required('phonenum.req')

    });

    /**
    * Export Form function
    */
    const { setError, register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    });

    /**
     * On load register the form data
     */
    useEffect(() => {
        register('email');
        register('username');
        register('phoneNumber');
        register('password');

    }, [])

    /**
     * On Submit the from call the register api 
     * 
     * @param {Object} form 
     */
    const onSubmit = (form) => {
        setIsLoading(true);
        /**
         * Call register api
         */
        UserHelper.register(form).then(response => {
            /**
             * Call handel login user and save the data into global context 
             */
            handelLoginUser(response.data);
            setIsLoading(false);
            history.push('/');

        }).catch(e => {
            /**
             * When data not valid map over message to set it with right propirtes 
             */
            setPropertyErrorMessage(e.response.data.message);
            setIsLoading(false);
        })

    }

    /**
     * Check if there is error in feilds seterror 
     * 
     * @param {String} errorMessage 
     */
    function setPropertyErrorMessage(errorMessage) {
        if (errorMessage.includes('username')) {
            setError('username', { message: errorMessage });
        } else if (errorMessage.includes('email')) {
            setError('email', { message: errorMessage });
        } else if (errorMessage.includes('phone number')) {
            setError('phoneNumber', { message: errorMessage });
        }
    }

    return (
        <Container className='mt-4'>
            {isLoading ? (<Loading />) : []}
            <form className={isLoading ? 'hold-body' : ''}>
                <Input type='text' name='username' label='User Name' errors={errors} className='form-control' onChange={(e) => setValue('username', e.target.value)} />
                <Input type='email' name='email' label='Email' errors={errors} className='form-control' onChange={(e) => setValue('email', e.target.value)} />
                <Input type='text' name='phoneNumber' label='Phone Number' errors={errors} className='form-control' onChange={(e) => setValue('phoneNumber', e.target.value)} />
                <Input type='password' name='password' label='Password' errors={errors} className='form-control' onChange={(e) => setValue('password', e.target.value)} />
                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary"><FormattedMessage id='guest.register' /></button>
            </form>
        </Container>)
}