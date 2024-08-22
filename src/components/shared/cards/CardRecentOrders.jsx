import React from 'react';
import TableOrderSummary from '~/components/shared/tables/TableOrderSummary';
import Link from 'next/link';

const CardRecentOrders = () => (
    <div className="ps-card">
        <div className="ps-card__header">
            <h4>Recent Orders</h4>
        </div>

        <div className="ps-card__content">
            <TableOrderSummary />
        </div>

        <div className="ps-card__footer">
            <Link className="ps-card__morelink" href="/orders">
                View Full Orders
                <i className="icon icon-chevron-right"></i>
            </Link>
        </div>
    </div>
);

export default CardRecentOrders;
