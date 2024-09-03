import React from 'react';
import dynamic from 'next/dynamic';
import {
    getMetrics
} from '~/redux/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CardEarning = () => {
    const dispatch = useDispatch()
    const {getmet} = useSelector(state => state.product)

    const data = getmet?.results?.data?.data
    useEffect(() => {
        dispatch(getMetrics())
    }, [])
    
    const state = {
        series: [44, 55, 41],
        options: {
            chart: {
                height: 500,
                type: 'donut',
            },
            dataLabels: {
                enabled: false,
            },

            legend: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    };

    return (
        <div className="ps-card ps-card--earning">
            <div className="ps-card__header">
                <h4>Earnings</h4>
            </div>
            <div className="ps-card__content">
                <div className="ps-card__chart">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="donut"
                    />
                    <div className="ps-card__information">
                        <i className="icon icon-wallet"></i>
                        <strong>$12,560</strong>
                        <small>Balance</small>
                    </div>
                </div>
                <div className="ps-card__status">
                    <p className="yellow">
                        <strong> {data?.total?.earnings}</strong>
                        <span>Income</span>
                    </p>
                    <p className="red">
                        <strong> $1,021</strong>
                        <span>Taxes</span>
                    </p>
                    <p className="green">
                        <strong> $992.00</strong>
                        <span>Fees</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardEarning;
