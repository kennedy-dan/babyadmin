import React from 'react';

const CardStatics = ({data}) => {
    console.log(data)

    return(
        <section className="ps-card ps-card--statics">
        <div className="ps-card__header">
            <h4>Statics</h4>
            <div className="ps-card__sortby">
                <i className="icon-calendar-empty"></i>
                <div className="form-group--select">
                    <select className="form-control">
                        <option value="1">Last 30 days</option>
                        <option value="2">Last 90 days</option>
                        <option value="3">Last 180 days</option>
                    </select>
                    <i className="icon-chevron-down"></i>
                </div>
            </div>
        </div>
        <div className="ps-card__content">
            <div className="ps-block--stat yellow">
                <div className="ps-block__left">
                    <span>
                        <i className="icon-cart"></i>
                    </span>
                </div>
                <div className="ps-block__content">
                    <p>Orders</p>
                    <h4>
                        {data?.total_orders}
                      
                    </h4>
                </div>
            </div>
       
            <div className="ps-block--stat green">
                <div className="ps-block__left">
                    <span>
                        <i className="icon-cart"></i>
                    </span>
                </div>
                <div className="ps-block__content">
                    <p>Earning</p>
                    <h4>
                    {data?.total_earnings}
                      
                    </h4>
                </div>
            </div>
        </div>
    </section>
    )

}

export default CardStatics;
