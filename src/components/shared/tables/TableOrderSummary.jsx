import React, {useState, useEffect} from 'react';
import { orderHistory } from '~/redux/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import DropdownAction from '~/components/elements/basic/DropdownAction';

const TableOrderSummary = () => {
    const { getOrder } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const data = getOrder?.results?.data?.data?.data;
    useEffect(() => {
        dispatch(orderHistory());
    }, []);

    const tableItemsView = data?.slice(0,5)?.map((item) => {
        let badgeView, fullfillmentView;
   
        if (item?.payment?.status === 'Completed') {
            badgeView = <span className="ps-badge success">Paid</span>;
        } else {
            badgeView = <span className="ps-badge gray">{item?.payment?.status}</span>;
        }
        switch (item.fullfillment) {
            case 'In Progress':
                fullfillmentView = (
                    <span className="ps-fullfillment warning">In Progress</span>
                );
                break;
            case 'Cancel':
                fullfillmentView = (
                    <span className="ps-fullfillment danger">Cancel</span>
                );
                break;
            default:
                fullfillmentView = (
                    <span className="ps-fullfillment success">delivered</span>
                );
                break;
        }
        return (
            <tr key={item?.id}>
                <td>{item?.id}</td>
                {/* <td>
                    <Link href="/orders/order-detail">
                        {item?.items?.map(info =>
                        <strong>{info?.product_name}, </strong>

                         )}

                    </Link>
                </td> */}
                <td>
                <Link href={`/orders/order-detail/${item?.id}`}>

                    <strong>{item?.user?.first_name}</strong>
                    </Link>
                </td>
                <td>{badgeView}</td>
                {/* <td>{fullfillmentView}</td> */}
                <td>
                    <strong>{item?.payment?.amount}</strong>
                </td>
                <td>
                    <DropdownAction />
                </td>
            </tr>
        );
    });

    return (
        <div className="table-responsive">
          <table className="table ps-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>users name</th>

                        <th>Payment</th>
                        {/* <th>Fullfillment</th> */}
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
    </div>
    )


}

export default TableOrderSummary;
