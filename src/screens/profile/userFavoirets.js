
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserHelper } from '../../api/UserHelper';
import ProductItem from '../../components/productItem';
import { FAVORITE_ACTIONS } from '../../Constant';
import Sort from '../../components/sort';
import { FormattedMessage } from 'react-intl';
import { SORT_ACTIONS } from '../../Constant';
import Loading from '../../components/Loading';
import Pagination from "../../components/BasePagination";
import SearchBox from '../../components/search';

export default function UserFavoirets() {
    const [isLoading, setIsLoading] = useState(false);
    const [sort, setSort] = useState(SORT_ACTIONS.DESC);
    const [name, setName] = useState();
    const [show,setShow]=useState(false);
    const [myFaviorets, setMyFaviorets] = useState(false);
    const [extra, setExtra] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        setIsLoading(true);
        UserHelper.myFav(sort, name, pageNumber).then(response => {
            setMyFaviorets(response.data.data)
            setExtra(response.data['_meta']);
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
            console.log(e)
        })
    }, [sort, name, pageNumber])


    /**
     * 
     * @param {*} action 
     * @param {*} itemId 
     * @returns 
     */
    function onChangeFavorite(action, itemId) {
        if (action !== FAVORITE_ACTIONS.REOMVE) return;
        let temporaryList = [...myFaviorets];
        let itemIndex = -1;
        temporaryList.forEach((element, index) => {
            if (element.item.id === itemId) {
                itemIndex = index;
                return;
            }
        });

        if (itemIndex !== -1) {
            temporaryList.splice(itemIndex, 1);
            setMyFaviorets(temporaryList);
        }
    }

    // const handelSearch = (childData) => {
    //     setName(childData);

    // }

    const handelShow=(bool)=>{
        // console.log(bool);
        setShow(bool);
    }



    return (
        <article>
            {isLoading ? (<Loading />) : []}
            {/** Filter form */}
            <section className={isLoading ? 'hold-body' : "filter-form"}>
                <div className='mt-4 d-flex'>
                    <label className='my-fav'><FormattedMessage id='FAVORITE' /></label>

                    <div className='user-search d-flex'>
                        <Sort className={show ? 'd-none' : 'd-block'} onChange={setSort} sort={sort} />
                    </div>
                        <SearchBox onChange={setName} handelShow={handelShow}/>
                </div>
            </section>

            {/** Favrotie items */}
            <section className="favorite-data">
                <Container className='mb-4 p-0'>
                    <Row >
                        {myFaviorets && myFaviorets.map((item) => {
                            return (
                                <ProductItem key={item.id} item={item.item} onChangeFavorite={onChangeFavorite} />
                            )
                        })}
                    </Row>
                </Container>
            </section>
            {extra ? (
                <Pagination
                    currentPageParam={extra.currentPage}
                    perPage={extra.perPage}
                    totalItemsCount={extra.totalCount}
                    pageRangeDisplayed={extra.pageCount}
                    onChange={setPageNumber}
                />

            ) : []}
        </article>

    );
}