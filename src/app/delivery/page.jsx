'use client';
import React, { useState, useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableCustomerItems from '~/components/shared/tables/TableCustomerItems';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { Select, Modal, DatePicker, ConfigProvider } from 'antd';
import locations  from '~/components/data/location';
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ClipLoader } from 'react-spinners';
import { Dropdown, Menu } from 'antd';


import { useDispatch, useSelector } from 'react-redux';
import { getstate, AddLoc } from '~/redux/features/productSlice';
import { getLoca, delLoca, updLoca } from '~/redux/features/loationslice';
const DeliveryPage = () => {
    const [openTrack, setOpenTrack] = useState(false);
    const [openupTrack, setupOpenTrack] = useState(false);
    const [cities, setCities] = useState(null);
    const [loc, setLoc] = useState(null);
    const {statess} = useSelector(state => state.product)
    const {loca} = useSelector(state => state.location)
    const [delMod, setDelMod] = useState(false);
    const [delid, setdelId] = useState(null);

    const data = statess?.results?.data
    const dispatch = useDispatch()

    useEffect(() => {
    //   dispatch(getstates())
        
      dispatch(getstate())
    
    }, [])

    useEffect(() => {
        dispatch(getLoca())
      
      }, [])
   
    useEffect(() => {
        if(statess?.results?.data){
            setLoc(statess?.results?.data)
            // const locations = loc.sort(compare);

        }
      }, [statess?.results?.data])

      console.log(loc)
    const customData = loca?.results?.data

    const [formData, setFormData] = useState({
        state_id: '',
        city_id: '',
        price: '',
    });

    const [upformData, setupFormData] = useState({
        state_id: '',
        city_id: '',
        state: '',
        city: '',
        price: '',
    });
    const handleTrackClose = () => {
        setOpenTrack(false);
    };
    const handleTrackOpen = () => {
        setOpenTrack(true);
    
        // if (rowData) {
        //     setFormData({
        //         state_id: rowData.state?.id || '', // Set the state ID
        //         city_id: rowData.city?.id || '', // Set the city ID
        //         price: rowData.price || '', // Set the price
        //     });
        // }
    };

    const handleupTrackClose = () => {
        setupOpenTrack(false);
    };

    const handleupTrackOpen = (rowData) => {
        setupOpenTrack(true);
    
        if (rowData) {
            setupFormData({
                state_id: rowData.state?.id || '', // Set the state ID
                city_id: rowData.city?.id || '', // Set the city ID
                state: rowData.state?.name || '', // Set the state ID
                city: rowData.city?.name || '', // Set the city ID
                price: rowData.price || '', // Set the price
                id: rowData.id
            });
        }
    };
    console.log(formData.price)
    const opendelModal = (id) => {
        setDelMod(true);
        setdelId(id);
    };
    const customSelectStyles = {
        control: () => ({
            display: 'flex',
            border: '1px solid #ccc',
            height: '4rem',
            borderRadius: 24.2162,
            background: '#f0f0f0',
        }),
        menuList: (provided) => ({
            ...provided,
            textTransform: 'capitalize',
        }),
        input: (provided) => ({
            ...provided,
            margin: 0,
        }),
        singleValue: (provided) => ({
            ...provided,
            textTransform: 'capitalize',
            margin: 0,
        }),
        multiValue: (provided) => ({
            ...provided,
            textTransform: 'capitalize',
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: 13,
        }),
        valueContainer: (provided) => ({
            ...provided,
            fontSize: '100%',
            padding: '0 22.7027px',
        }),
        placeholder: (provided) => ({
            ...provided,
            margin: 0,
            color: '#9BA3AF',
        }),
    };

    function updateFormData(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function upupdateFormData(e) {
        const { name, value } = e.target;
        setupFormData({
            ...upformData,
            [name]: value,
        });
    }

    useEffect(() => {
        if (formData.state_id || upformData.state_id) {
            // Find the selected state in the data
            const selectedState = loc?.find(state => state.id === formData.state_id || upformData.state_id);

            console.log(selectedState)
            
            // Set cities for the selected state
            if (selectedState) {
                setCities(selectedState.cities.map(city => city));
            } else {
                setCities(null);
            }
        } else {
            setCities(null);
        }
    }, [formData.state_id, loc, upformData.state_id]);
    console.log(formData.state_id)
    console.log(formData.city_id)
    const closedelModal = () => {
        setDelMod(false);
    };

    const deleteCats = () => {
        dispatch(delLoca({ id: delid })).then(() => {
            dispatch(getLoca()).then((error) => {
                if (error?.payload?.code === 200) {
                    toast.success('Delivery deleted successfully');
                }
            });
        });
        setDelMod(false);

    };


    function handleSubmit(e) {
        e.preventDefault();

        if(!formData.city_id || !formData.state_id || !formData.price){
            return
        }
        dispatch(AddLoc(formData)).then(() => {
            toast.success("Location added successfully")
            setOpenTrack(false)
            dispatch(getLoca())



        })
      }

      function handleupSubmit(e) {
        e.preventDefault();

        if(!upformData.city_id || !upformData.state_id || !upformData.price){
            return
        }

        const data = {
            city_id : upformData.city_id,
            state_id : upformData.state_id,
            price : upformData.price,
        }
        dispatch(updLoca({id:upformData.id, data:data})).then(() => {
            toast.success("Location edited successfully")
            setupOpenTrack(false)
            dispatch(getLoca())



        })
      }
      console.log(customData)
      const menuView = (rowData) => {
        console.log(rowData);
        return (
            <Menu>
                <Menu.Item key={0}>
                    <button onClick={() => handleupTrackOpen(rowData)}>
                        <i className="icon-pencil mr-2"></i>
                        Edit
                    </button>
                </Menu.Item>
                <Menu.Item key={0}>
                    <button onClick={() => opendelModal(rowData.id)}>
                        <i className="icon-trash2 mr-2"></i>
                        Delete
                    </button>
                </Menu.Item>
            </Menu>
        );
    };
      let columns = [
        {
            field: 'id',
            header: 'S/N',
            isSort: true,
            body: (rowData, options) => {
                return (
                    <div>
                        <div> {options.rowIndex + 1}</div>
                    </div>
                );
            },
        },

        {
            field: 'State ',
            header: 'State',
            isSort: true,
            body: (rowData) => {
                return (
                    <div >
                        <p className="text-blue-700 underline">
                            {rowData?.state?.name}
                        </p>
                    </div>
                );
            },
        },

        {
            field: 'City',
            header: 'City',
            isSort: true,
            body: (rowData) => {
                return <p>{rowData?.city?.name}</p>;
            },
        },

        {
            field: 'Price',
            header: 'Price',
            body: (rowData, index) => {
              
                return <p>{rowData?.price}</p>;
            },
        },
        {
            field: 'Action',
            header: 'Action',
            body: (rowData) => {
                return (
                    <div>
                        <Dropdown
                            overlay={() => menuView(rowData)}
                            className="ps-dropdown">
                            <a
                                onClick={(e) => e.preventDefault()}
                                className="ps-dropdown__toggle">
                                <i className="icon-ellipsis"></i>
                            </a>
                        </Dropdown>
                    </div>
                );
            },
        },
    ];
    return (
        <ContainerDefault title="Delivery">
            <HeaderDashboard
                title="Delivery"
                description="RBW Customer Listing"
            />
            <section className="ps-items-listing">
                <div className="flex justify-between">
                    <div>
                        <input
                            className="outline-none border border-1 border-gray-500 rounded-sm px-2 py-2 "
                            placeholder="search"
                        />
                    </div>
                    <div onClick={handleTrackOpen}>
                        <button className="bg-[#003057] text-white px-3 py-2 ">
                            Add Location
                        </button>
                    </div>
                </div>
                {loca?.isLoading && (
                <div className="flex justify-enter">
                    <ClipLoader />
                </div>
            )}
            {!loca?.isLoading && <div >  <DataTable
                value={customData}
                // loading={reservationHistory?.isLoading}
                // paginatorF
                // totalRecords={dtc?.pagination_meta?.total}
                // onPage={onPage}
                // lazy
                // paginator
                // rows={rows}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '30rem' }}
                style={{ position: 'inherit', fontSize: '16px' }}
                // header={searchBar}
                globalFilterFields={[
                    'name',
                    'price',
                    // "reserved_start_time",
                    // "comment",
                ]}>
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
            </DataTable></div> }
          
            </section>
            <Modal
                width={800}
                style={{ height: '', width: '600px' }}
                open={openTrack}
        footer={null}

                onCancel={handleTrackClose}>
          <form className="w-full" onSubmit={handleSubmit}>

                <div>
                    <p className="text-center font-semibold text-[18px]">
                        Add New Location
                    </p>
                    <div>
                        <p className="mt-5">State</p>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        optionSelectedFontWeight: 600,
                                    },
                                },
                                // ...customTheme,
                                token: {
                                    borderRadius: 7,
                                    controlHeight: 60,
                                    colorBgContainer: '#f0f0f0',
                                    fontSize: 16,
                                    // optionSelectedFontWeight: 300
                                },
                            }}>
                            <Select
                                styles={customSelectStyles}
                                id="state"
                                placeholder="State"
                                className={` w-full`}
                                showSearch
                                options={loc?.map((location) => ({
                                    value: location.id,
                                    label: location.name,
                                }))}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        state_id: e || '',
                                    })
                                }
                                isClearable
                                classNamePrefix="react-select"
                            />
                        </ConfigProvider>
                    </div>
                    <div className="mt-5">
                        <p>City</p>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        optionSelectedFontWeight: 600,
                                    },
                                },
                                // ...customTheme,
                                token: {
                                    borderRadius: 7,
                                    controlHeight: 60,
                                    colorBgContainer: '#f0f0f0',
                                    fontSize: 16,
                                    // optionSelectedFontWeight: 300
                                },
                            }}>
                            <Select
                                styles={customSelectStyles}
                                id="city"
                                placeholder="City"
                                showSearch
                                className={` w-full `}
                                options={cities?.map((city) => ({
                                    value: city?.id,
                                    label: city?.city_name,
                                }))}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        city_id: e || '',
                                    })
                                }
                                isClearable
                                isDisabled={formData.state_id === ''}
                                classNamePrefix="react-select"
                            />
                        </ConfigProvider>
                    </div>

                    <p className="mt-5">Price</p>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={updateFormData}
                        className="text-[16px] outline-none border border-1 border-gray-500 rounded-sm px-2 py-3 w-full"
                    />
                </div>
                <div className="flex justify-center mt-5" >
                    <button className="bg-[#003057] text-white px-3 py-2 ">
                        Add Location
                    </button>{' '}
                </div>
                </form>
            </Modal>
            <Modal
                width={800}
                style={{ height: '', width: '600px' }}
                open={openupTrack}
        footer={null}

                onCancel={handleupTrackClose}>
          <form className="w-full" onSubmit={handleupSubmit}>

                <div>
                    <p className="text-center font-semibold text-[18px]">
                        Update Location
                    </p>
                    <div>
                        <p className="mt-5">State</p>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        optionSelectedFontWeight: 600,
                                    },
                                },
                                // ...customTheme,
                                token: {
                                    borderRadius: 7,
                                    controlHeight: 60,
                                    colorBgContainer: '#f0f0f0',
                                    fontSize: 16,
                                    // optionSelectedFontWeight: 300
                                },
                            }}>
                            <Select
                                styles={customSelectStyles}
                                id="state"
                                placeholder="State"
                                className={` w-full`}
                                defaultValue={upformData.state || ''}
                                showSearch
                                // value={upformData.state || ''} // Bind to formData.state_id

                                options={loc?.map((location) => ({
                                    value: location.id,
                                    label: location.name,
                                }))}
                                onChange={(e) =>
                                    setupFormData({
                                        ...upformData,
                                        state_id: e || '',
                                    })
                                }
                                isClearable
                                classNamePrefix="react-select"
                            />
                        </ConfigProvider>
                    </div>
                    <div className="mt-5">
                        <p>City</p>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        optionSelectedFontWeight: 600,
                                    },
                                },
                                // ...customTheme,
                                token: {
                                    borderRadius: 7,
                                    controlHeight: 60,
                                    colorBgContainer: '#f0f0f0',
                                    fontSize: 16,
                                    // optionSelectedFontWeight: 300
                                },
                            }}>
                            <Select
                                styles={customSelectStyles}
                                id="city"
                                placeholder="City"
                                defaultValue={upformData.city || undefined} // Bind to formData.state_id
                                showSearch
                                className={` w-full `}
                                options={cities?.map((city) => ({
                                    value: city?.id,
                                    label: city?.city_name,
                                }))}
                                onChange={(e) =>
                                    setupFormData({
                                        ...upformData,
                                        city_id: e || '',
                                    })
                                }
                                isClearable
                                isDisabled={formData.state_id === ''}
                                classNamePrefix="react-select"
                            />
                        </ConfigProvider>
                    </div>

                    <p className="mt-5">Price</p>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={upformData.price}
                        onChange={upupdateFormData}
                        className="text-[16px] outline-none border border-1 border-gray-500 rounded-sm px-2 py-3 w-full"
                    />
                </div>
                <div className="flex justify-center mt-5" >
                    <button className="bg-[#003057] text-white px-3 py-2 ">
                        Update Location
                    </button>{' '}
                </div>
                </form>
            </Modal>
            <Modal
                // title="Print QR"
                open={delMod}
                // onOk={handleOk}
                footer={false}
                onCancel={closedelModal}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                style={{ marginTop: 0 }}>
                <p>Delete Location?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-green-600 rounded-md text-white px-4 py-2"
                        onClick={deleteCats}>
                        Yes
                    </button>
                    <button
                        className="bg-red-700 rounded-md text-white px-4 py-2"
                        onClick={closedelModal}>
                        No
                    </button>
                </div>
            </Modal>
        </ContainerDefault>
    );
};

export default DeliveryPage;
