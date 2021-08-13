import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import GlobalContext from '../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import UserFavoirets from './userFavoirets';
import { ReactComponent as Phone } from '../../assets/call-24px.svg';
import { ReactComponent as Edit } from '../../assets/edit-24px.svg';
import Address from './address';
import { VIEWS } from '../../Constant';
import Tab from '../../components/Tab';
import Orders from './orders';
/**
 * 
 * Profile 
 * @returns {JSX}
 */
export default function Profile() {
    let history = useHistory();
    const { user } = useContext(GlobalContext.Context);


    const [view, setView] = useState(VIEWS.FAVORITE);

    /**
     * Redirect to update profile page
     */
    const handelProfile = () => {
        history.push('/update-profile');
    }

    /**
     * Tabs
     * @param {String} name 
     */
    function handlChangeTab(name) {
        setView(name)
    }

    return (
        <article id="profile-warpper">
            <Container className="mt-4">
                <div className='user-head'>
                    <div className='d-flex justify-content-between'>
                        <h1 className='user-name'>{user.first_name + ' ' + user.last_name}</h1>
                        <div className='user-edit d-flex justify-content-between'>
                            <Edit className='mt-3 edit-svg' />
                            <span className='user-profile-edit' onClick={handelProfile}>تعديل حسابي</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Phone className='mb-1' />
                        <label className="ml-2 mr-2 number">{user.phone_number}</label>
                    </div>
                </div>
                <div className='user-tabs mt-4 d-flex'>
                    <Tab label='مفضلتي' onClick={handlChangeTab} activeTab={view} name={VIEWS.FAVORITE} />
                    <Tab label='عنواني' onClick={handlChangeTab} activeTab={view} name={VIEWS.ADDRESS} />
                    <Tab label='طلباتي' onClick={handlChangeTab} activeTab={view} name={VIEWS.ORDERS} />
                </div>
                <div >
                    {view === VIEWS.FAVORITE ? (<UserFavoirets />) : view === VIEWS.ADDRESS ? (<Address />) : view === VIEWS.ORDERS ? (<Orders />) : []}
                </div>
            </Container>
        </article>
    );
}