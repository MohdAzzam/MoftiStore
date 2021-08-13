import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { ProductHelper } from '../../api/ProductHelper';
import Loading from '../../components/Loading';
import { FaviorateHelper } from '../../api/FaviorateHelper';
import Favorite from "../../components/favorite";
import GlobalContext from '../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { CartHelper } from '../../api/CartHelper';
import toast, { Toaster } from 'react-hot-toast';

/**
 * Handel single product
 * @returns { JSX }
 */
export default function SingleProduct() {
    const history = useHistory();
    const { slug } = useParams();
    const [loader, setLoader] = useState(false);
    const [item, setItem] = useState({});
    const [isFavortie, setIsFavortie] = useState(false);
    const { user, handelCartCount } = useContext(GlobalContext.Context);
    useEffect(() => {
        setLoader(true);

        /**
         * Call api
         */
        ProductHelper.itemBySlug(slug).then(
            response => {
                setLoader(false)
                /**
                 * Save item in state
                 */
                setItem(response.data)
                setIsFavortie(response.data.isFavoriteByCurrentUser)
            }
        ).catch(e => {
            setLoader(false)
        })
    }, [slug]);

    function handleIsFavortieClick(itemId, isFavortieParams) {
        setLoader(true);
        if (!user) { history.push(`/login?ref=${document.URL}`) }
        if (!isFavortieParams) {
            FaviorateHelper.remove(itemId).then(response => {
                setIsFavortie(isFavortieParams);
                setLoader(false);
            }).catch(e => console.log(e))
        } else {
            FaviorateHelper.add(itemId).then(response => {
                setIsFavortie(isFavortieParams);
                setLoader(false)

            }).catch(e => {
                setLoader(false)
            });

        }
    }
    /**
    * Export Form function
    */
    const { setError, register, handleSubmit, setValue, formState: { errors } } = useForm();
    useEffect(() => {
        register('stock');
    }, [])
    const handelForm = (form) => {

        CartHelper.addToCart(item.id, form.stock).then(res => {
            // setShow(true);
            console.log(res.data.totalItemsCount);
            handelCartCount(res.data.totalItemsCount)
            toast.success('Added Successfully');
         
        }).catch(e => {
            toast.error(e.response.data.message);
            
        })

    }

    return (

        <article>
            {loader ? (<Loading />) : (
                <section className='single-item mt-4'>
                    <h2>{item.name}</h2>
                    <img src={item.imageUrl} alt={item.name} />
                    <br />
                    <label><FormattedMessage id='price' /></label>
                    <h4>{item.price}</h4>
                    <label><FormattedMessage id='description' /> </label>
                    <span> {item.description}</span>
                    <div>
                        <Favorite itemId={item.id} isFavortie={isFavortie} onClick={handleIsFavortieClick} />
                    </div>
                    <form >
                        <input type='number' min='1' max={item.stock} required name='stock' className='form-control' onChange={(e) => setValue('stock', e.target.value)} />

                        <button className='btn btn-primary' onClick={handleSubmit(handelForm)}><FormattedMessage id='addToCart' /></button>

                    </form>
                </section>
            )}
           
            <Toaster position="top-right"/>
        </article>
    );
}