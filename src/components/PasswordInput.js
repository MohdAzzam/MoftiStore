import React, { useState } from 'react';
import Input from "./Input";
import { ReactComponent as Visibility } from '../assets/visibility-24px.svg';
import { ReactComponent as VisibilityOff } from '../assets/visibility_off-24px.svg';
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
export default function Passwordinput({
    name,
    className,
    label,
    errors,
    onChange,
    defaultValue
}) {

    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);

    const handelShowPassword = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
        setShowPassword((pre) => !pre);
    }
    return (
        <div className='input-wrapper'>
            <label className='visibility-password' onClick={handelShowPassword}>
                {!showPassword ? (<Visibility />) : (<VisibilityOff />)}
            </label>
            <Input className={className} type={inputType} name={name} label={label} errors={errors} onChange={onChange} defaultValue={defaultValue} />
        </div>
    );
}