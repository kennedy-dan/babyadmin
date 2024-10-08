import React from 'react';

const ModuleOrderShippingInformation = ({data}) => {
    const det = data?.results?.data
    return (
        <div className="ps-card ps-card--order-information ps-card--small">
            <div className="ps-card__header">
                <h4>Shipping Information</h4>
            </div>
            <div className="ps-card__content">
                <h5>{det?.user?.first_name}</h5>
                <p>
                    <strong>Address:{det?.delivery_address?.address}</strong> 
                </p>
                <p>
                    <strong>Phone No: {det?.delivery_address?.phone}</strong> 
                </p>
                <p>
                    <strong>Email:</strong> {det?.user?.email}
                </p>
            </div>
        </div>
    );
};

export default ModuleOrderShippingInformation;
