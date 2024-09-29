import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistory } from '~/redux/features/productSlice';
import { DataTable } from 'primereact/datatable';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
import { ClipLoader } from 'react-spinners';

import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
const TableOrdersItems = () => {
    const dispatch = useDispatch();
    const { getOrder } = useSelector((state) => state.product);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15);
    const [loading, setLoading] = useState(false);
    const [searchValue, setsearchValue] = useState('');

    const [pge, setPge] = useState(0);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    let searchBar = tableSearchUI(globalFilterValue, (e) =>
        tableSearchFunction(e, filters, setFilters, setGlobalFilterValue)
    );
    useEffect(() => {
        dispatch(orderHistory());
    }, []);

    const data = getOrder?.results?.data?.data?.data;
    const dtc = getOrder?.results?.data?.data;
    const customData = data;

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            // if ( searchValue) {
            console.log(searchValue);
            dispatch(
                orderHistory({
                    search: searchValue,
                })
            );
            // }
        }, 500); // Adjust delay time as needed

        return () => clearTimeout(delaySearch);
    }, [searchValue]);

    let columns = [
        {
            field: 'id',
            header: 'S/N',
            isSort: true,
            body: (rowData, options) => {
                return (
                    <Link href={`/orders/order-detail/${rowData?.id}`}>
                        <div> {options.rowIndex + 1}</div>
                    </Link>
                );
            },
        },

        {
            field: 'Order Number ',
            header: 'Order Number',
            isSort: true,
            body: (rowData) => {
                return (
                    <Link href={`/orders/order-detail/${rowData?.id}`}>
                        <p className="text-blue-700 underline">
                            {rowData?.reference}
                        </p>
                    </Link>
                );
            },
        },

        {
            field: 'name',
            header: 'Name',
            isSort: true,
            body: (rowData) => {
                return <p>{rowData.user?.first_name}</p>;
            },
        },

        {
            field: 'status',
            header: 'Status',
            body: (rowData, index) => {
                let badgeView;
                if (rowData?.payment?.status === 'Completed') {
                    badgeView = <span className="ps-badge success">Paid</span>;
                } else {
                    badgeView = (
                        <span className="ps-badge gray">
                            {rowData?.payment?.status}
                        </span>
                    );
                }
                return <p>{badgeView}</p>;
            },
        },
        {
            field: 'price',
            header: 'Price',
            body: (rowData, index) => {
                return <p>{rowData?.payment?.amount}</p>;
            },
        },
    ];

    // const tableItemsView = data?.map((item) => {
    //     let badgeView, fullfillmentView;
    //     const menuView = (
    //         <Menu>
    //             <Menu.Item key={0}>
    //                 <a className="dropdown-item" href="#">
    //                     Edit
    //                 </a>
    //             </Menu.Item>
    //             <Menu.Item key={0}>
    //                 <a className="dropdown-item" href="#">
    //                     <i className="icon-t"></i>
    //                     Delete
    //                 </a>
    //             </Menu.Item>
    //         </Menu>
    //     );
    //     if (item?.payment?.status === 'Completed') {
    //         badgeView = <span className="ps-badge success">Paid</span>;
    //     } else {
    //         badgeView = <span className="ps-badge gray">{item?.payment?.status}</span>;
    //     }
    //     switch (item.fullfillment) {
    //         case 'In Progress':
    //             fullfillmentView = (
    //                 <span className="ps-fullfillment warning">In Progress</span>
    //             );
    //             break;
    //         case 'Cancel':
    //             fullfillmentView = (
    //                 <span className="ps-fullfillment danger">Cancel</span>
    //             );
    //             break;
    //         default:
    //             fullfillmentView = (
    //                 <span className="ps-fullfillment success">delivered</span>
    //             );
    //             break;
    //     }
    //     return (
    //         <tr key={item?.id}>
    //             <td>{item?.id}</td>
    //             {/* <td>
    //                 <Link href="/orders/order-detail">
    //                     {item?.items?.map(info =>
    //                     <strong>{info?.product_name}, </strong>

    //                      )}

    //                 </Link>
    //             </td> */}
    //             <td>
    //             <Link href={`/orders/order-detail/${item?.id}`}>

    //                 <strong>{item?.user?.first_name}</strong>
    //                 </Link>
    //             </td>
    //             <td>{badgeView}</td>
    //             {/* <td>{fullfillmentView}</td> */}
    //             <td>
    //                 <strong>{item?.payment?.amount}</strong>
    //             </td>
    //             <td>
    //                 <DropdownAction />
    //             </td>
    //         </tr>
    //     );
    // });
    console.log(dtc?.pagination_meta?.total);

    const onPage = (event) => {
        setLoading(true);
        setFirst(event.first);
        setRows(event.rows);
        setPge(event.page + 1);

        // localStorage.setItem('first', event.first);
        // localStorage.setItem('loading', approvedReservations?.isLoading);
        setTimeout(() => {
            dispatch(
                orderHistory({
                    page: event.page + 1,
                })
            ).finally(() => setLoading(false));
        }, 1000);

        // dispatch(fetchData({ first: event.first, rows: event.rows }));
    };
    return (
        <div className="table-responsive">
            <div className="flex justify-end my-7">
                <div>
                    <input
                        value={searchValue}
                        onChange={(e) => setsearchValue(e.target.value)}
                        className="text-black font-semibold px-4 py-2 rounded-md border-2"
                        placeholder="Search"
                    />
                </div>
            </div>
            {getOrder?.isLoading && (
                <div className="flex justify-enter">
                    <ClipLoader />
                </div>
            )}
            {!getOrder?.isLoading && <div >  <DataTable
                value={customData}
                // loading={reservationHistory?.isLoading}
                // paginatorF
                totalRecords={dtc?.pagination_meta?.total}
                onPage={onPage}
                lazy
                paginator
                rows={rows}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '30rem' }}
                style={{ position: 'inherit', fontSize: '16px' }}
                // header={searchBar}
                globalFilterFields={[
                    'name',
                    'price',
                    // "reserved_start_time",
                    // "comment",
                ]}>
                {columns.map((col, i) => {
                    return (
                        <Column
                            key={i}
                            field={col?.field}
                            header={col?.header}
                            body={col?.body}
                            //   headerStyle={{ backgroundColor: '#f0f0f0' }}
                        />
                    );
                })}
            </DataTable></div> }

          
        </div>
    );
};

export default TableOrdersItems;
