import React, { useEffect, useState, useRef } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CategoryHelper } from '../../api/CategoryHelper';
import { ProductHelper } from '../../api/ProductHelper';
import Product from '../product/product';
import { useHistory } from "react-router-dom";
import { ReactComponent as Search } from '../../assets/search-24px.svg';
import { ReactComponent as Close } from '../../assets/close.svg';

/**
 * 
 * @returns 
 */
export default function Home() {
    const inputEl = useRef(null);
    const history = useHistory();
    const [category, setCategory] = useState(false);
    const [items, setItem] = useState(false);
    const [showNameForm, setShowNameForm] = useState(false)
    const [name, setName] = useState();

    /**
     * On load return list of category from the api 
     */
    useEffect(() => {
        CategoryHelper.list().then(response => {
            setCategory(response.data.data)
        }).catch(e => {
            console.log(e);
        })
    }, [])

    // /**
    //  * 
    //  * On load return list of product from the api 
    //  */
    // useEffect(() => {
    //     ProductHelper.list().then(response => {

    //         setItem(response.data.data);
    //     })
    //         .catch(e => console.log(e))
    // }, [])

    /**
     * When user click on caegory will redirect to category product 
     * 
     * @param {String} slug 
     */
    const handelCategory = (slug) => {
        history.push(`/category-product/${slug}`);
    }
    const handleChangeShowNameForm = () => {
        setShowNameForm(!showNameForm)
    }
    useEffect(() => {
        if (!showNameForm) {
            setName('');
            inputEl.current.value = '';
        } else {
            inputEl.current.focus();
        }
    }, [showNameForm])

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

    /**
     * 
     * On load return list of product from the api 
     */
    useEffect(() => {
        if (name === '' || name) {
            ProductHelper.list(name).then(res => {
                setItem(res.data.data);
            }).catch(e => {
                console.log(e)
            })

        }
    }, [name])
    return (
        <Container >
            <Row >
                {category && category.map((item, indx) => {
                    return (
                        <Col className='col-lg-4 col-sm-12 mt-4 ' key={indx} onClick={() => handelCategory(item.slug)}>
                            <Card style={{ width: '18rem' }} >
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>

                                </Card.Body>

                            </Card>
                        </Col>)
                })}

        

            </Row>
            <div className='user-search d-flex mt-4'>
                {/* <Sort className={showNameForm ? 'd-none' : 'd-block'} onChange={setSort} sort={sort} /> */}
                <Search className='d-block cursor-pointer' onClick={handleChangeShowNameForm} />
                <form>
                    <input ref={inputEl} onChange={(e) => handleChangeName(e.target.value)} type='text' name='itemSearch' className={!showNameForm ? 'd-none' : 'form-control search-input'} placeholder='Search here ...' />
                </form>
                <Close className={showNameForm ? 'd-block cursor-pointer' : 'd-none'} onClick={handleChangeShowNameForm} />
            </div>
            <Product products={items} />
        </Container>
    )
}