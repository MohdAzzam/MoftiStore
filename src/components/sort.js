import React, { useEffect, useState } from 'react';
import { ReactComponent as TextRoutateUp } from '../assets/text_rotate_vertical-24px.svg';
import { ReactComponent as TextRoutateDown } from '../assets/text_rotate_2_vertical-24px.svg';
import { SORT_ACTIONS } from "../Constant";


/**
 * Add or Remove Fav
 * 
 * @param { Boolean } isSort 
 * @param { Number } itemId 
 * @param {*} onClick 
 * @returns {JSX}
 */
export default function Sort({ className, sort, onChange }) {

    const [isAscending, setIsAscending] = useState(false);

    useEffect(() => {
        setIsAscending(sort === SORT_ACTIONS.ASC)
    }, [sort])

    function handleChangeSort() {
        if (isAscending) {
            onChange(SORT_ACTIONS.DESC);
            setIsAscending(false);
            return;
        }
        onChange(SORT_ACTIONS.ASC);
    }

    return (
        <article className={className}>
            <div className="cursor-pointer" onClick={handleChangeSort}>
                {isAscending ? (<TextRoutateUp />) : (<TextRoutateDown />)}
            </div>
        </article>
    );
}