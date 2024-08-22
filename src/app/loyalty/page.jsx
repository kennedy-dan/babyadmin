'use client';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import FormAccountSettings from '~/components/shared/forms/FormAccountSettings';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { createLP, getLP } from '~/redux/features/productSlice';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableLoyal from '~/components/shared/tables/TableLoyal';
const LoyaltyPage = () => {
    const dispatch = useDispatch()
    const { getlp } = useSelector((state) => state.product);

    const [pointV, setPointV] = useState(null)
    const [pointA, setPointA] = useState(null)
    const [pointMin, setPointMin] = useState(null)
    const [pointEx, setPointEx] = useState(null)
    const [pointMax, setPointMax] = useState(null)

    const data = getlp?.results?.data?.data
    const customData = data
    console.log(customData)


    const createLoaylP = () => {

        const data = {
            point_value: pointV,
            point_allocation: pointA,
            min_points_for_redemption: pointMin,
            points_expiry_days: pointEx,
            max_points_balance: pointMax
        }
        dispatch(createLP(data))
    }


    return (
        <ContainerDefault title="Settings">
            <HeaderDashboard title="Settings" description="Martfury Settings" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                <TableLoyal />
                </div>
                <div className="ps-section__right">
                <section className="ps-card">
                        <div className="ps-card__header">
                            <h4>Update / Add</h4>
                        </div>
                        <div className="ps-card__content">
                            <div>
                                <p>Point Value</p>
                                <input value={pointV} onChange={e => setPointV(e.target.value)} type='number' className='border border-1 w-1/2 px-3 rounded-lg py-6' />
                            </div>
                        </div>

                        <div className="ps-card__content mt-6">
                            <div>
                                <p>Point Allocation</p>
                                <input value={pointA} onChange={e => setPointA(e.target.value)} type='number' className='border border-1 w-1/2 px-3 rounded-lg py-6' />
                            </div>
                        </div>

                        <div className="ps-card__content mt-6">
                            <div>
                                <p>Minnimum Point for Redemption</p>
                                <input value={pointMin} onChange={e => setPointMin(e.target.value)} type='number' className='border border-1 w-1/2 px-3 rounded-lg py-6' />
                            </div>
                        </div>

                        <div className="ps-card__content mt-6">
                            <div>
                                <p> Point Expiry Date</p>
                                <input value={pointEx} onChange={e => setPointEx(e.target.value)} type='number' className='border border-1 w-1/2 px-3 rounded-lg py-6' />
                            </div>
                        </div>

                        
                        <div className="ps-card__content mt-6">
                            <div>
                                <p>Maximum Point Balance</p>
                                <input value={pointMax} onChange={e => setPointMax(e.target.value)} type='number' className='border border-1 w-1/2 px-3 rounded-lg py-6' />
                            </div>
                        </div>

                        <button onClick={createLoaylP} className="ps-btn">Submit</button>
                    </section>
                </div>
            </section>
        </ContainerDefault>
    );
};
export default LoyaltyPage
