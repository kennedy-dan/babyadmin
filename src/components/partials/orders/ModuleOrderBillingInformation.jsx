import React from 'react';
import { format, parseISO } from "date-fns";

const ModuleOrderBillingInformation = ({data}) => {

    const det =data?.results?.data?.payment

    return (
        <div className="ps-card ps-card--order-information ps-card--small">
            <div className="ps-card__header">
                <h4>Billing Information</h4>
            </div>
            <div className="ps-card__content">
                <p>
                    <strong>Payment Type:</strong> {det?.gateway}
                </p>
          
                <p>
                    <strong>Valid Date:</strong>   {det?.date
                    ? format(parseISO(det?.date), "MMM d, yyyy")
                    : "N/A"}
                </p>
            </div>
        </div>
    );
};

export default ModuleOrderBillingInformation;
