import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { UserHelper } from '../../api/UserHelper';
import Input from '../../components/Input';
import GlobalContext from '../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import Loading from '../../components/Loading';
import { setPropertyErrorMessage } from '../../util/helperMethods';
import * as Yup from 'yup';
import { USER_FORM_VALIDATIONS } from "../../util/CommonValidtions";
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from 'react-intl';
import UpdatePassword from './updatePassword';



export default function UpdateProfile() {
    const intl = useIntl();
    const { user, handelUpdateUser } = useContext(GlobalContext.Context);
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const validation = Yup.object().shape({
        phone_number: USER_FORM_VALIDATIONS.PHONE_NUMBER,
        email: USER_FORM_VALIDATIONS.EMAIL

    });

    /**
   * Export Form function
   */
    const { setError, register, watch, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            'first_name': user.first_name,
            'email': user.email,
            'last_name': user.last_name,
            'phone_number': user.phone_number,
            'gender': user.gender
        },
        resolver: yupResolver(validation)
    });
    const model = watch();
    /**
    * On load register the form data
    */
    useEffect(() => {
        register('first_name');
        register('last_name');
        register('email');
        register('phone_number');
        register('gender');
    }, [register])

    const onSubmit = (form) => {
        setLoader(true);
        UserHelper.update(form).then(response => {
            handelUpdateUser(response.data);
            setLoader(false);
            back();
        }).catch(e => {
            const feilds = [
                {
                    name: 'phone_number',
                    key: 'Phone Number',
                    errorMessage: 'phoneNumber.error.taken',
                    errorOptions: { values: { phoneNumber: form.phone_number } }
                },
                {
                    name: 'email',
                    key: 'Email',
                    errorMessage: 'email.error.taken',
                    errorOptions: { values: { email: form.email } }
                }
            ];
            setPropertyErrorMessage(feilds, e.response.data.message, setError)
            setLoader(false);
        })
    }
    /**
     * 
     * Redirect to profile page
     */
    const back = () => {
        history.push('/profile');
    }
    return (
        <Container>
            {loader ? (<Loading />) : []}
            <div className='d-flex justify-content-between mt-4'>
                <p className='profile-edit-text'>تعديل الملف الشخصي</p>
                <p className='profile-back' onClick={back}>  العودة الى حسابي </p>
            </div>
            <Row>
                <div className='form-holder mt-4 '>
                    <p className='profile-text-d  mt-4 mr-4 ml-4'>تعديل البيانات</p>
                    <form className={loader ? 'hold-body' : 'mt-4 mb-4'}>
                        <div className='input-wrapper'>
                            <Input type='text' name='first_name' label='First Name' errors={errors} className='form-control' defaultValue={model.first_name} onChange={(e) => setValue('first_name', e.target.value)} />
                        </div>
                        <div className='input-wrapper'>
                            <Input type='text' name='last_name' label='Last Name' errors={errors} className='form-control ' defaultValue={model.last_name} onChange={(e) => setValue('last_name', e.target.value)} />

                        </div>
                        <div className='input-wrapper'>
                            <Input type='email' name='email' label='Email' errors={errors} className='form-control' defaultValue={model.email} onChange={(e) => setValue('email', e.target.value)} />

                        </div>
                        <div className='input-wrapper'>
                            <Input type='text' name='phone_number' label='Phone Number' errors={errors} defaultValue={model.phone_number} className='form-control' onChange={(e) => setValue('phone_number', e.target.value)} />

                        </div>
                        <div className='input-wrapper'>
                            <div className="form-group input-feild">
                                <label className='input-lable'><FormattedMessage id='user.gender' /></label>
                                <select className="form-control" name='gender' defaultValue={model.gender} onChange={(e) => setValue('gender', e.target.value)}>
                                    <option value='male'>{intl.formatMessage({
                                        id: "male",
                                    })}</option>
                                    <option value='female'>{intl.formatMessage({
                                        id: "female",
                                    })}</option>
                                    <option value='other'>{intl.formatMessage({
                                        id: "other",
                                    })}</option>
                                </select>
                            </div>
                        </div>

                        <div className='d-flex justify-content-around'>
                            <button onClick={handleSubmit(onSubmit)} className="btn user-update"><FormattedMessage id='user.update' /></button>
                            <button onClick={back} className="btn  user-reset"><FormattedMessage id='user.back' /></button>
                        </div>
                    </form>

                </div>
                <UpdatePassword />
            </Row>
        </Container >
    );
}