'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import FormAccountSettings from '~/components/shared/forms/FormAccountSettings';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import {
    getAdminProducts,
    AddCoupons,
    getCoupon,
} from '~/redux/features/productSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Select, Modal, DatePicker } from 'antd';

const Coupons = () => {
    const dispatch = useDispatch();
    const [openTrack, setOpenTrack] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [discount, setDiscount] = useState(null);

    const { allproducts, getcoup } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getCoupon());
    }, []);
    const coup = getcoup?.results?.data?.data;

    const handleTrackClose = () => {
        setOpenTrack(false);
    };

    const handleTrackOpen = () => {
        setOpenTrack(true);
        console.log('yeaaah');
        // dispatch(getSingleProduct(id));
    };

    const handleAddCoupon = () => {
        if (selectedDate) {
            const data = {
                expiry_date: selectedDate,
                discount: discount,
            };
            dispatch(AddCoupons(data)).then(() => {
                dispatch(getCoupon());
            });
            handleTrackClose();
        } else {
            alert('Please select a date');
        }
    };
    return (
        <ContainerDefault title="coupons">
            <HeaderDashboard title="coupons" description="RBW Settings" />
            <section className="ps-dashboard ">
                <div className="">
                    <div className="ps-section__actions">
                        <button
                            onClick={handleTrackOpen}
                            className="ps-btn success">
                            <i className="icon icon-plus mr-2" />
                            Add Coupon
                        </button>
                    </div>

                    <div>
                    <div className="grid grid-cols-2 font-bold mt-3 gap-6">
                        <p>Code</p>
                        <p>Discount Percentage</p>
                    </div>
                    {coup
                        ?.slice()
                        .reverse()
                        .map((item) => (
                            <div
                                className="grid grid-cols-2 gap-6"
                                key={item.code}>
                                <p>{item.code}</p> <p>{item?.discount}</p>{' '}
                            </div>
                        ))}
                </div>
                </div>
               
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
                                className="py-3 px-2 border border-1 "
                            />
                        </div>
                    </div>
                </Modal>
            </section>
        </ContainerDefault>
    );
};

export default Coupons;
