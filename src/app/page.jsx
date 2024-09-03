'use client';
import React from 'react';
import CardRecentOrders from '~/components/shared/cards/CardRecentOrders';
import CardSaleReport from '~/components/shared/cards/CardSaleReport';
import CardEarning from '~/components/shared/cards/CardEarning';
import CardStatics from '~/components/shared/cards/CardStatics';
import ContainerDashboard from '~/components/layouts/ContainerDashboard';
import CardTopCountries from '~/components/shared/cards/CardTopCountries';
import {
    getMetrics
} from '~/redux/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
export default  function Page() {
    const dispatch = useDispatch()

    const {getmet} = useSelector(state => state.product)

    const data = getmet?.results?.data?.data
    useEffect(() => {
        dispatch(getMetrics())
    }, [])
    return (
        <ContainerDashboard title="Dashboard">
            <section className="ps-dashboard" id="homepage">
                <div className="ps-section__left">
                    <div className="row">
                        <div className="col-xl-8 col-12">
                            <CardSaleReport />
                        </div>
                        {/* <div className="col-xl-4 col-12">
                            <CardEarning />
                        </div> */}
                    </div>
                    <CardRecentOrders />
                </div>
                <div className="ps-section__right">
                    <CardStatics data={data} />
                    {/* <CardTopCountries /> */}
                </div>
            </section>
        </ContainerDashboard>
    );
}
