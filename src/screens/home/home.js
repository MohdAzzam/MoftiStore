import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CategoryHelper } from '../../api/CategoryHelper';
import { ProductHelper } from '../../api/ProductHelper';
import Product from '../product/product';
import { useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import SearchBox from '../../components/search';


/**
 * 
 * @returns 
 */
export default function Home() {
    // const inputEl = useRef(null);
    const history = useHistory();
    const [category, setCategory] = useState(false);
    const [items, setItem] = useState(false);
    const [name, setName] = useState('');

    /**
     * On load return list of category from the api 
     */
    useEffect(() => {
        CategoryHelper.list().then(response => {
            setCategory(response.data.data)
        }).catch(e => {
            toast.error(<FormattedMessage id='generalErr' />);

        })
    }, [])
    /**
     * On load return list of product from the api 
     */
    useEffect(() => {
        ProductHelper.list(name).then(res => {
            setItem(res.data.data);
        }).catch(e => {
            toast.error(<FormattedMessage id='generalErr' />);
        })

    }, [name])

    /**
     * When user click on caegory will redirect to category product 
     * 
     * @param {String} slug 
     */
    const handelCategory = (slug) => {
        history.push(`/category-product/${slug}`);
    }

    const handelSearch = (childData)=>{
        setName(childData);
    }

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
            <SearchBox onChange={handelSearch}/>
        
            <Product products={items} />
            <Toaster position="top-right" />

        </Container>
    )
}