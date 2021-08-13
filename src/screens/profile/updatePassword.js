import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { UserHelper } from '../../api/UserHelper';
import GlobalContext from '../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import Passwordinput from '../../components/PasswordInput';
import { useIntl } from 'react-intl';
export default function UpdatePassword() {
    const { handelUpdateUserPassword } = useContext(GlobalContext.Context);
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const intl = useIntl();
    /**
   * Export Form function
   */
    const { setError, register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    /**
    * On load register the form data
    */
    useEffect(() => {
        register('old_password');
        register('new_password');
    }, [])


    const onSubmit = (form) => {
        setLoader(true);
        UserHelper.passwordUpdate(form).then(response => {
            console.log(response.data.data);
            handelUpdateUserPassword(response.data.data);
            setLoader(false);
            history.push('/')

        }).catch(e => {
            console.log(e.response.data.message)
            setPropertyErrorMessage(e.response.data.message);
            setLoader(false);
        })
    }
    /**
    * Check if there is error in feilds seterror 
    * 
    * @param {String} errorMessage 
    */
    function setPropertyErrorMessage(errorMessage) {
        if (errorMessage.includes('Old Password')) {
            setError('old_password', { message: errorMessage });
        } else if (errorMessage.includes('New Password ')) {
            setError('new_password', { message: errorMessage });
        }
    }
    const back = () => {
        history.push('/profile');
    }
    
    return (
        <div className='form-holder mt-4 mr-2 '>
            <p className='profile-text-d  mt-4 mr-4 ml-4'>تعديل البيانات</p>
            <form className={loader ? 'hold-body' : 'mt-4 mb-4'}>
                <Passwordinput name='old_password' label='Old Password' errors={errors} className='form-control' onChange={(e) => setValue('old_password', e.target.value)} />
                <Passwordinput name='new_password' label='New Password' errors={errors} className='form-control' onChange={(e) => setValue('new_password', e.target.value)} />
                <div className='d-flex justify-content-around user-btn-fix'>
                    <button onClick={handleSubmit(onSubmit)} className="btn user-update"><FormattedMessage id='user.update' /></button>
                    {/* <button onClick={resetForm} className="btn  user-reset"><FormattedMessage id='user.back' /></button> */}
                    <input type='reset' value={
                        intl.formatMessage({
                            id: "user.reset",
                        })
                    } className="btn  user-reset" />
                </div>
            </form>

        </div>
    );
}