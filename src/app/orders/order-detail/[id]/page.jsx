'use client';
import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import ModuleOrderShippingInformation from '~/components/partials/orders/ModuleOrderShippingInformation';
import ModuleOrderBillingInformation from '~/components/partials/orders/ModuleOrderBillingInformation';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { orderHistoryId } from '~/redux/features/productSlice';
import Image from 'next/image';
import { Select, ConfigProvider, Modal, Switch } from 'antd';

const OrderDetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { getOrderid } = useSelector((state) => state.product);
    const [hoveredImage, setHoveredImage] = useState(null); // State to store hovered image
    const [showImageModal, setShowImageModal] = useState(false); //
    const { id } = params;

    useEffect(() => {
        dispatch(orderHistoryId(id));
    }, [id]);

    const det = getOrderid?.results?.data?.items;

    console.log(det);

    const handleImageHover = (imageUrl) => {
        setHoveredImage(imageUrl);
        setShowImageModal(true);
    };

    const handleImageHoverLeave = () => {
        setShowImageModal(false);
    };

    return (
        <ContainerDefault title="Order Detail">
            <HeaderDashboard
                title="Order Detail"
                description="Rbw Order Detail"
            />
            <section className="ps-dashboard">
                <div className="ps-section__left">
                    <div className="row">
                        <div className="col-md-4">
                            <ModuleOrderShippingInformation data={getOrderid} />
                        </div>
                        <div className="col-md-4">
                            <ModuleOrderBillingInformation data={getOrderid} />
                        </div>
                        {/* <div className="col-md-4">
                            <ModuleOrderShippingInformation data={getOrderid}  />
                        </div> */}
                    </div>
                    <div className="ps-card ps-card--track-order">
                        <div className="ps-card__header">
                            <h4>
                                {' '}
                                Order Number:{' '}
                                {getOrderid?.results?.data?.reference}
                            </h4>
                        </div>
                        <div className="ps-card__content">
                            <div className="table-responsive">
                                <table className="table ps-table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>

                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Size</th>
                                            <th className='flex justify-end' >Price</th>
                                            {/* <th>Total</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {det?.map((item) => (
                                            <tr>
                                                <td>
                                                    <div
                                                        onMouseEnter={() =>
                                                            handleImageHover(
                                                                item?.image_url
                                                            )
                                                        }>
                                                        <Image
                                                            width={500}
                                                            height={500}
                                                            src={
                                                                item?.image_url
                                                            }
                                                            alt=""
                                                            className="w-20 h-20"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#">
                                                        {item?.product_name}
                                                    </a>
                                                </td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.product_size?.size_name}</td>
                                                <td>{item?.unit_price}</td>
                                                {/* <td>{item?.unit_price}</td> */}
                                            </tr>
                                        ))}

                                        <tr>
                                            <td colSpan="3">
                                                <strong>Sub Total:</strong>
                                            </td>
                                            <td>
                                                <strong>
                                                    {
                                                        getOrderid?.results
                                                            ?.data?.payment
                                                            ?.amount
                                                    }
                                                </strong>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td colSpan="3">
                                                <strong>
                                                    Shipping Charge:
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>$24.00</strong>
                                            </td>
                                        </tr> */}
                                        {/* <tr>
                                            <td colSpan="3">
                                                <strong>Estimated:</strong>
                                            </td>
                                            <td>
                                                <strong>$12.00</strong>
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td colSpan="3">
                                                <strong>Total:</strong>
                                            </td>
                                            <td>
                                                <strong>
                                                    {
                                                        getOrderid?.results
                                                            ?.data?.payment
                                                            ?.amount
                                                    }
                                                </strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-section__right">
                    {/* <div className="ps-card ps-card--track-order">
                        <div className="ps-card__header">
                            <h4>Track Order</h4>
                        </div>
                        <div className="ps-card__content">
                            <div className="ps-block--track-order">
                                <div className="ps-block__header">
                                    <div className="row">
                                        <div className="col-6">
                                            <figure>
                                                <figcaption>
                                                    Order ID:
                                                </figcaption>
                                                <p>#ABD-235711</p>
                                            </figure>
                                        </div>
                                        <div className="col-6">
                                            <figure>
                                                <figcaption>
                                                    Tracking ID:
                                                </figcaption>
                                                <p>21191818abs1</p>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <div className="ps-block__content">
                                    <div className="ps-block__timeline">
                                        <figure className="active">
                                            <figcaption>
                                                Order Placed
                                            </figcaption>
                                            <p>
                                                Sep 19, 2024{' '}
                                                <small>7:00am</small>
                                            </p>
                                        </figure>
                                        <figure className="active">
                                            <figcaption>Packed</figcaption>
                                            <p>
                                                Sep 19, 2024{' '}
                                                <small>10:00am</small>
                                            </p>
                                        </figure>
                                        <figure className="active">
                                            <figcaption>Shipped</figcaption>
                                            <p>
                                                Sep 19, 2024{' '}
                                                <small>4:00pm</small>
                                            </p>
                                        </figure>
                                        <figure>
                                            <figcaption>Delivered</figcaption>
                                            <p>
                                                Estimated delivery within 1 day
                                            </p>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
            <Modal
                open={showImageModal}
                onCancel={handleImageHoverLeave}
                width={400}
                footer={null}>
                <Image
                    src={hoveredImage}
                    alt="Hovered Image"
                    width={1000}
                    height={1000}
                    className="w-[400px] h-[400px] object-cover"
                />
            </Modal>
        </ContainerDefault>
    );
};
export default OrderDetailPage;
