import React from 'react';
import { ReactComponent as Heart } from '../media/heart.svg';
import { ReactComponent as Like } from '../media/love.svg';
/**
 * Add or Remove Fav
 * 
 * @param { Boolean } isFavortie 
 * @param { Number } itemId 
 * @param {*} onClick 
 * @returns {JSX}
 */
export default function Favorite({ isFavortie, itemId, onClick, className = '' }) {
    return (
        <article className={className}>

            <div onClick={() => onClick(itemId, !isFavortie)}>

                {isFavortie ? (<Heart className='svg-img cursor-pointer' />) : (<Like className='svg-img cursor-pointer' />)}
            </div>

        </article>
    );
}