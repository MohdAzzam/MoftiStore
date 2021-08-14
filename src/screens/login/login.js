
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Input from '../../components/Input';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';
import { UserHelper } from '../../api/UserHelper'
import GlobalContext from '../../context/GlobalContext';
import Loading from '../../components/Loading';
import { useHistory } from "react-router-dom";
import { getQueryParams } from '../../util/helperMethods';
import Passwordinput from '../../components/PasswordInput';


/**
 * Handel login
 * 
 * @returns {JSX}
 */
export default function Login() {
    let history = useHistory();
    const query = getQueryParams();
    const [isLoding, setIsLoading] = useState(false);

    const { handelLoginUser } = useContext(GlobalContext.Context);

    /**
     * Schema validation 
     */
    const validation = Yup.object().shape({
        username: Yup.string()
            .required('username.req'),
        password: Yup.string().required('password.req'),

    });

    /**
     * Export Form function
     */
    const { setError, register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    });

    /**
     * On load register the from data
     */
    useEffect(() => {
        register('username');
        register('password');

    }, [])

    /**
     * On Submit the from call the login api 
     * 
     * @param {*} form 
     */
    const onSubmit = (form) => {
        setIsLoading(true);
        /**
         *  Call api
         */
        UserHelper.login(form).then(response => {
            // console.log(response.data)
            /**
             * Call handel login user and save the data into global context 
             */
            handelLoginUser(response.data);
            setIsLoading(false);
            if (query.get('ref')) {
                // console.log(query.get('ref'))
                window.location.replace(query.get('ref'))

            } else {

                history.push('/');
            }


        }).catch(e => {
            /**
             * When credantionals not valid set error 
             */
            setError('password', { message: 'User name Or Password incorret' });
            setIsLoading(false);
        })
    }

    return (

        <Container className='mt-4'>
            {isLoding ? (<Loading />) : []}
            <div className='row justify-content-center '>
                <div className='col-lg-6 col-sm-12'>
                    <form className={isLoding ? 'hold-body' : ''}>
                        <Input type='text' name='username' label='User Name' errors={errors} className='form-control' onChange={(e) => setValue('username', e.target.value)} />

                        <Passwordinput name='password' label='Password' errors={errors} className='form-control' onChange={(e) => setValue('password', e.target.value)} />
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary"><FormattedMessage id='guest.login' /></button>
                    </form>

                </div>



            </div>

        </Container>)
}