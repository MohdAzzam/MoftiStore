import React from 'react';
import { FormattedMessage } from 'react-intl';
/**
 * Custom input component 
 * 
 * @param { String } type 
 * @param { String } name 
 * @param { String } className 
 * @param { String } label 
 * @param { Array } errors 
 * @param {*} onChange 
 * @returns { JSX }
 */
export default function Input({
    type,
    name,
    className,
    label,
    errors,
    onChange,
    defaultValue
}) {
    return (
        <div className='form-group input-feild'>
            <label className='input-lable'>

                <FormattedMessage id={label} />
            </label>
            <input type={type} name={name} className={className} onChange={onChange} defaultValue={defaultValue ? defaultValue : ''} />
            {
                !!errors[name]?.message &&
                <label className='error-message'>

                    <FormattedMessage defaultMessage={errors[name]?.message} id={errors[name]?.message} values={errors[name]?.options?.values ? errors[name]?.options.values : errors[name]?.options} />
                </label>
            }
        </div>
    );
}