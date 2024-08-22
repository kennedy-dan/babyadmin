import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import { useDispatch, useSelector } from 'react-redux';
import { getLP } from '~/redux/features/productSlice';
import { DataTable } from 'primereact/datatable';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';

import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
const TableLoyal = () => {
    const dispatch = useDispatch();
    const { getlp } = useSelector((state) => state.product);
    const [rows, setRows] = useState(10);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    let searchBar = tableSearchUI(globalFilterValue, (e) =>
        tableSearchFunction(e, filters, setFilters, setGlobalFilterValue)
    );
    useEffect(() => {
        dispatch(getLP())
    }, [])

    const data = getlp?.results?.data?.data
    const customData = data;

    let columns = [
        // {
        //   field: "id",
        //   header: "id",
        //   isSort: true,
        //   body: (rowData, options) => {
        //     return options.rowIndex + 1;
        //   },
        // },
    
        {
          field: "Point Value",
          header: "Point Value",
          isSort: true,
          body: (rowData) => {
            return <p>{rowData?.point_value}</p>;
          },
        },
    
        {
          field: "Point Allocation",
          header: "Point Allocation",
          body: (rowData, index) => {
            return <p>{rowData?.point_allocation}</p>;
          },
        },

        {
            field: "Min Points For Redemption",
            header: "Min Points For Redemption",
            body: (rowData, index) => {
              return <p>{rowData?.min_points_for_redemption}</p>;
            },
          },

          {
            field: "Points Expiry Day",
            header: "Points Expiry Day",
            body: (rowData, index) => {
              return <p>{rowData?.points_expiry_days}</p>;
            },
          },  {
            field: "Max Points Balance",
            header: "Max Points Balance",
            body: (rowData, index) => {
              return <p>{rowData?.max_points_balance}</p>;
            },
          }
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
    return (
        <div className="table-responsive">
            <DataTable
                value={customData}
                // loading={reservationHistory?.isLoading}
                // paginatorF
                // paginator
                rows={rows}
                // rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '30rem' }}
                style={{ position: 'inherit', fontSize: '12px' }}
             >
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
            </DataTable>
        </div>
    );
};

export default TableLoyal;
