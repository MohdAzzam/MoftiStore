import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ProductHelper } from '../../api/ProductHelper';
import Product from '../product/product';
import Loading from '../../components/Loading';
import Pagination from "../../components/BasePagination";
import { ReactComponent as Search } from '../../assets/search-24px.svg';
import { ReactComponent as Close } from '../../assets/close.svg';

/**
 * Return all product in  category 
 * @returns {JSX}
 */
export default function CategoryProduct() {
    const inputEl = useRef(null);
    const { slug } = useParams();
    const [categoryItems, setCategoryItems] = useState([]);
    const [loadingLoad, setLoading] = useState(false);
    const [extra, setExtra] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [showNameForm, setShowNameForm] = useState(false)
    const [name, setName] = useState();
    /**
     * It call when change on slug or page number
     * 
     */
    useEffect(() => {
        setLoading(true);
        /**
         * Call api 
         */
        ProductHelper.listBySlug(slug, pageNumber,name).then(
            response => {
                /**
                 * Save the _meta from api that hold info about the pagination as nextlink 
                 * total count ...etc 
                 * 
                 */
                setExtra(response.data['_meta']);
                /**
                 * Save the Products
                 */
                setCategoryItems(response.data.data);
                setLoading(false);
            }
        ).catch(e => {
            console.log(e)
            setLoading(false);
        })
    }, [slug, pageNumber,name]);

    useEffect(() => {
        if (!showNameForm) {
            setName('');
            inputEl.current.value = '';
        } else {
            inputEl.current.focus();
        }
    }, [showNameForm])
    const handleChangeShowNameForm = () => {
        setShowNameForm(!showNameForm)
    }
    let timer;
    const handleChangeName = (value) => {
        if (timer) {
            clearTimeout(timer);
        }
        const timeout = setTimeout(() => {
            setName(value);
        }, 1000)
        timer = timeout;
    }
    return (
        <article className='mb-4 '>
            <div className='user-search d-flex mt-4'>
                <Search className='d-block cursor-pointer' onClick={handleChangeShowNameForm} />
                <form>
                    <input ref={inputEl} onChange={(e) => handleChangeName(e.target.value)} type='text' name='itemSearch' className={!showNameForm ? 'd-none' : 'form-control search-input'} placeholder='Search here ...' />
                </form>
                <Close className={showNameForm ? 'd-block cursor-pointer' : 'd-none'} onClick={handleChangeShowNameForm} />
            </div>
            {loadingLoad ? (<Loading />) : (
                <>
                    <Product products={categoryItems} />
                    <Pagination
                        currentPageParam={extra.currentPage}
                        perPage={extra.perPage}
                        totalItemsCount={extra.totalCount}
                        pageRangeDisplayed={extra.pageCount}
                        onChange={setPageNumber}
                    />
                </>
            )}
        </article>
    );
}