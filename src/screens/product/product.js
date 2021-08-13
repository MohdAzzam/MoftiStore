import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductItem from '../../components/productItem';

/**
 * Handel products
 * 
 * @param { Array } products 
 * @returns { JSX }
 */
export default function Product({ products }) {

    return (
        <Container className='mt-4 mb-4'>
            <Row>
                {products && products.map((item, indx) => {
                    return (
                        <ProductItem item={item} key={indx} />
                    )
                })}
            </Row>
        </Container>
    );
}