'use client';
import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableProjectItems from '~/components/shared/tables/TableProjectItems';
import { Select, Modal, DatePicker } from 'antd';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from 'next/link';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, AddCoupons } from '~/redux/features/productSlice';

const { Option } = Select;
const ProductPage = () => {
    const dispatch = useDispatch();
    const [openTrack, setOpenTrack] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [discount, setDiscount] = useState(null);

    const { allproducts } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, []);

    const handleTrackClose = () => {
        setOpenTrack(false);
    };

    const handleTrackOpen = () => {
        setOpenTrack(true);
        console.log('yeaaah');
        // dispatch(getSingleProduct(id));
    };

    const data = allproducts?.results?.data?.data?.data;
    const columnData= allproducts?.results?.data?.data?.data;

    const handleAddCoupon = () => {
        if (selectedDate) {
            const data = {
                expiry_date: selectedDate,
                discount: discount,
            };
            dispatch(AddCoupons(data));
            handleTrackClose();
        } else {
            alert('Please select a date');
        }
    };

    return (
        <ContainerDefault title="Products">
            <HeaderDashboard
                title="Products"
                description="Martfury Product Listing "
            />
            <section className="ps-items-listing">
                <div className="ps-section__actions">
                    <Link
                        href="/products/create-product"
                        className="ps-btn success">
                        <i className="icon icon-plus mr-2" />
                        New Product
                    </Link>
                </div>
                <div className="ps-section__actions">
                    <button
                        onClick={handleTrackOpen}
                        className="ps-btn success">
                        <i className="icon icon-plus mr-2" />
                        Add Coupon
                    </button>
                </div>
                <div className="ps-section__header">
                   
                </div>
                <div className="ps-section__content">
                    <TableProjectItems data={data} />
                </div>
                {/* <div className="ps-section__footer">
                    <p>Show 10 in 30 items.</p>
                    <Pagination />
                </div> */}
                <Modal
                    width={800}
                    style={{ height: '', width: '600px' }}
                    open={openTrack}
                    onCancel={handleTrackClose}
                    footer={[
                        <button
                            key="submit"
                            className="ps-btn success"
                            onClick={handleAddCoupon}>
                            Add Coupon
                        </button>,
                    ]}>
                    <div>
                        <h2>Add Coupon</h2>
                        <DatePicker
                            style={{ width: '100%' }}
                            format="YYYY-MM-DD"
                            onChange={(date, dateString) =>
                                setSelectedDate(dateString)
                            }
                        />
                        <div>
                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className='py-3 px-2 border border-1 '
                            />
                        </div>
                    </div>
                </Modal>
            </section>
        </ContainerDefault>
    );
};
export default ProductPage;
