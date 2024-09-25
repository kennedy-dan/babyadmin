'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import FormAccountSettings from '~/components/shared/forms/FormAccountSettings';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const SettingsPage = () => {
    return (
        <ContainerDefault title="Settings">
            <HeaderDashboard title="Settings" description="RBW Settings" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <section className="ps-card">
                        <div className="ps-card__header">
                            <h4>Account Settings</h4>
                            <div>Add a promo flyer to the customer interface below</div>
            <hr />

                        </div>
                        <div className="ps-card__content">
                            <FormAccountSettings />
                        </div>
                    </section>
                </div>
                {/* <div className="ps-section__right"></div> */}
            </section>
        </ContainerDefault>
    );
};
export default SettingsPage
