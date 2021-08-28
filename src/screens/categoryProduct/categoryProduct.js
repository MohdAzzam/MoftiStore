import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ProductHelper } from '../../api/ProductHelper';
import Product from '../product/product';
import Loading from '../../components/Loading';
import Pagination from "../../components/BasePagination";
import SearchBox from '../../components/search';

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
        ProductHelper.listBySlug(slug, pageNumber, name).then(
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
    }, [slug, pageNumber, name]);

    const handelSearch = (childData) => {

        setName(childData);
    }

    return (
        <article className='mb-4 container'>
            <SearchBox onChange={handelSearch} />
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