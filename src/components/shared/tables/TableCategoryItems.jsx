import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmincategories } from '~/redux/features/productSlice';

const TableCategoryItems = () => {
    const dispatch = useDispatch();
    const {getadmincarts} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdmincategories())
    }, []);

    const data = getadmincarts?.results?.data

    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>Category name</th>
                        <th>Slug</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                </thead>
                {data?.map(items =>    <tbody>
                    <tr>
                        <td>
                            <strong>{items?.name}</strong>
                        </td>
                        <td>{items?.name}</td>
                        <td>Jul 21, 2024</td>
                        <td>
                            <div className="dropdown">
                                <a
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className="icon-ellipsis"></i>
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#">
                                        Edit
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                  
                </tbody> )}
             
            </table>
        </div>
    );
};

export default TableCategoryItems;
