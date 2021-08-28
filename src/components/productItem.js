
import React, { useState, useContext } from "react";
// import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import Favorite from "./favorite";
import GlobalContext from '../context/GlobalContext';
import { FaviorateHelper } from '../api/FaviorateHelper';
import Loading from '../components/Loading'
import { FAVORITE_ACTIONS } from '../Constant';

const noop = () => { }

/**
 * Return Product Item 
 * 
 * @param { Object } item 
 * @returns { JSX }
 */
export default function ProductItem({ item, onChangeFavorite = noop }) {
    let history = useHistory();
    const [isFavortie, setIsFavortie] = useState(item.isFavoriteByCurrentUser);
    const [load, setLoad] = useState(false);
    /**
     * 
     * when user click on item redirect product page by slug 
     * @param {String} slug
     */
    function handelProduct(slug) {
        history.push(`/item/${slug}`)
    }

    const { user } = useContext(GlobalContext.Context);
    /**
     * If user not login redirect to login page 
     * If not Fav add it to Fav otherwise remove it from the fav
     * 
     * @param {Number} itemId 
     * @param {Boolean} isFavortieParams 
     */
    function handleIsFavortieClick(itemId, isFavortieParams) {
        setLoad(true);
        if (!user) history.push('/login')
        if (!isFavortieParams) {
            FaviorateHelper.remove(itemId).then(response => {
                setIsFavortie(isFavortieParams);
                onChangeFavorite(FAVORITE_ACTIONS.REOMVE, itemId);
                setLoad(false);
            }).catch(e => console.log(e))
        } else {
            FaviorateHelper.add(itemId).then(response => {
                setIsFavortie(isFavortieParams);
                onChangeFavorite(FAVORITE_ACTIONS.ADD, itemId);
                setLoad(false)

            }).catch(e => {
                setLoad(false)
            });

        }
    }

    return (
        <article className=" col-lg-3 col-12">
            {load ? (<Loading />) : []}
            <div className='product-item d-lg-block d-none mt-4 '>
                <img className='item-image' src={item.featuredImage} alt={item.name} onClick={() => handelProduct(item.slug)} />
                <div className='d-flex justify-content-between mt-4 mr-2 ml-2'>
                    <p className='item-name'>{item.name}</p>
                    <Favorite className='item-fav' itemId={item.id} isFavortie={isFavortie} onClick={handleIsFavortieClick} />
                </div>
                <p className='item-date mr-2 ml-2'>{item.created_at}</p>
                <p className='item-price mt-4  mr-2 ml-2'>{item.price}</p>
            </div>

            <div className='d-lg-none d-block product-item-small mt-4 '>
                <div className='d-flex '>
                    <img className='item-image ' src={item.featuredImage} alt={item.name} onClick={() => handelProduct(item.slug)} />
                    <div className="product-content">
                        <div className='d-flex justify-content-between mt-3'>
                            <p className='item-date'>{item.created_at}</p>
                            <Favorite className='item-fav ml-2 mr-2' itemId={item.id} isFavortie={isFavortie} onClick={handleIsFavortieClick} />
                        </div>
                        <p className='item-name'>{item.name}</p>
                        <p className='item-price '>{item.price}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}