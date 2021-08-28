import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as Search } from '../assets/search-24px.svg';
import { ReactComponent as Close } from '../assets/close.svg';


export default function SearchBox(
    { onChange, handelShow = () => { } }
) {
    const [showNameForm, setShowNameForm] = useState(false);
    const inputEl = useRef(null);
    const handleChangeShowNameForm = () => {
        setShowNameForm(!showNameForm)
        handelShow(!showNameForm)
    }

    useEffect(() => {
        if (!showNameForm) {
            onChange('');

            inputEl.current.value = '';
        } else {
            inputEl.current.focus();
        }
    }, [showNameForm, onChange])

    let timer;
    const handleChangeName = (value) => {

        if (timer) {
            clearTimeout(timer);
        }
        const timeout = setTimeout(() => {
            onChange(value);
        }, 1000)
        timer = timeout;
    }
    return (
        <div className='user-search d-flex'>

            <Search className='d-block cursor-pointer' onClick={handleChangeShowNameForm} />
            <form>
                <input ref={inputEl} onChange={(e) => handleChangeName(e.target.value)} type='text' name='itemSearch' className={!showNameForm ? 'd-none' : 'form-control search-input'} placeholder='Search here ...' />
            </form>
            <Close className={showNameForm ? 'd-block cursor-pointer' : 'd-none'} onClick={handleChangeShowNameForm} />
        </div>
    )

}