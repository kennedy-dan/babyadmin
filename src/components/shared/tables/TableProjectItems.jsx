import React, { useState, useEffect } from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { InputText } from 'primereact/inputtext';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
import Image from 'next/image';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Select, ConfigProvider, Modal, Switch } from 'antd';

import {
    getAdminProducts,
    AddCoupons,
    getCoupon,
    getAdmincategories,
    UpdateProducts,
    UpdateStat,
} from '~/redux/features/productSlice';
import { toast } from 'react-toastify';

const TableProjectItems = ({ data, dtc }) => {
    const dispatch = useDispatch();
    const customData = data;
    const [rows, setRows] = useState(15);
    const [openQr, setOPenQr] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { getadmincarts } = useSelector((state) => state.product);
    const catsdata = getadmincarts?.results?.data;

    const [cats, setCats] = useState(null);
    const [first, setFirst] = useState(0);
    const [pge, setPge] = useState(0);
    const [hoveredImage, setHoveredImage] = useState(null); // State to store hovered image
    const [showImageModal, setShowImageModal] = useState(false); // State to control image modal

    const [price, setPrice] = useState(null);
    const [stock, setInstock] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    let searchBar = tableSearchUI(globalFilterValue, (e) =>
        tableSearchFunction(e, filters, setFilters, setGlobalFilterValue)
    );

    useEffect(() => {
        dispatch(getAdmincategories());
    }, []);
    const openModal = (rowData) => {
        setOPenQr(true);
        setId(rowData?.id);
        setInstock(rowData?.in_stock)
        setPrice(rowData?.price)
        setName(rowData?.name)
        setDescription(rowData?.description)
        setSelectedImage(rowData?.image_url)
    };
    const closeQrModal = () => {
        setOPenQr(false);
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem('uploadedImage', reader.result);
                setSelectedImage(reader.result);
                setSelectedFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            const file = new File([blob], 'image.png', { type: blob.type });
            console.log(file);
            return file;
        } catch (error) {
            console.error('Error converting URL to file:', error);
        }
    };

    const handleSubmit = async () => {
        let imagefile;

        imagefile = await handleUpload();
        // const data = {
        //     categoryid: cats,
        //     price: price,
        //     in_stock: stock,
        //     description: description,
        //     name: name,
        //     image: imagefile,
        // };
        const data = new FormData();
        if (cats) {
            data.append('category_id', cats);
        }
        if (price) {
            data.append('price', price);
        }
        if (stock) {
            data.append('in_stock', stock);
        }
        if (description) {
            data.append('description', description);
        }
        if (name) {
            data.append('name', name);
        }

        if (selectedImage) {
            data.append('image', imagefile);
        }
        dispatch(UpdateProducts({ data, id })).then((error) =>{
            if(error?.payload?.status === 200){
        toast.success("Product Updated Successfully")

            }
            dispatch(
                getAdminProducts({
                    page: pge,
                })
            )
}
        );
        setOPenQr(false);

    };

    const onPage = (event) => {
        setLoading(true);
        setFirst(event.first);
        setRows(event.rows);
        setPge(event.page + 1);

        // localStorage.setItem('first', event.first);
        // localStorage.setItem('loading', approvedReservations?.isLoading);
        setTimeout(() => {
            dispatch(
                getAdminProducts({
                    page: event.page + 1,
                })
            ).finally(() => setLoading(false));
        }, 1000);

        // dispatch(fetchData({ first: event.first, rows: event.rows }));
    };

    // Function to handle the Switch toggle
    const handleStatusToggle = (checked, rowData) => {
        const status = checked ? 'Active' : 'Inactive';
        const data = {
            product_id: rowData.id,
            status: status,
        };
        dispatch(UpdateStat(data)).then((error) =>{
            console.log(error)
            if(error?.payload?.status === 200){
                    toast.success('Status updated successfully')
                    console.log('yhhhok')
            }
            dispatch(getAdminProducts({ page: pge }))
        }
        );
    };

    const handleImageHover = (imageUrl) => {
        setHoveredImage(imageUrl);
        setShowImageModal(true);
    };

    const handleImageHoverLeave = () => {
        setShowImageModal(false);
    };

    let columns = [
        // {
        //     field: 'image',
        //     header: 'image',
        //     isSort: true,
        //     body: (rowData, options) => {
        //         return (
        //             <div
                       
        //                 >
        //                 <Image
        //                     width={500}
        //                     height={500}
        //                     src={rowData?.image_url}
        //                     alt=""
        //                     className="w-20 h-20"
        //                 />
        //             </div>
        //         );
        //     },
        // },
        {
            field: 'id',
            header: 'id',
            isSort: true,
            body: (rowData, options) => {
                return (
                <span  onMouseEnter={() => handleImageHover(rowData.image_url)}>
                {options.rowIndex + 1}
                </span>
                ) 
            },
        },

        {
            field: 'name',
            header: 'name',
            isSort: true,
            body: (rowData) => {
                return <p>{rowData?.name}</p>;
            },
        },
        {
            field: 'category',
            header: 'category',
            isSort: true,
            body: (rowData) => {
                return <p>{rowData?.category?.name}</p>;
            },
        },

        {
            field: 'stock',
            header: 'stock',
            body: (rowData, index) => {
                return <p>{rowData?.in_stock}</p>;
            },
        },

        {
            field: 'price',
            header: 'Price',
            body: (rowData, index) => {
                return <p>{rowData?.price}</p>;
            },
        },
        {
            field: 'status',
            header: 'Status',
            body: (rowData) => {
                return (
                    <Switch
                        checked={rowData?.status === 'Active'}
                        onChange={(checked) =>
                            handleStatusToggle(checked, rowData)
                        }
                    />
                );
            },
        },

        {
            field: 'Update',
            header: 'Update',
            body: (rowData) => {
                return (
                    <div>
                        <button onClick={() => openModal(rowData)}>
                            Update
                        </button>
                    </div>
                );
            },
        },
    ];

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleSelected = (e) => {
        console.log(e);
        setCats(e);
    };

    console.log(dtc?.pagination_meta?.total);

    return (
        <div className="table-responsive">
            <DataTable
                value={customData}
                // loading={reservationHistory?.isLoading}
                // paginatorF
                totalRecords={dtc?.pagination_meta?.total}
                onPage={onPage}
                first={first}
                paginator
                loading={loading}
                lazy
                rows={rows}
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
            </DataTable>
            <Modal
                open={showImageModal}
                onCancel={handleImageHoverLeave}
                width={200}
                footer={null}>
                <Image
                    src={hoveredImage}
                    alt="Hovered Image"
                    width={500}
                    height={500}
                    className='w-60 h-60 object-cover'
                />
            </Modal>
            <Modal
                // title="Print QR"
                open={openQr}
                // onOk={handleOk}
                footer={false}
                onCancel={closeQrModal}
                width={800}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', width: '' }}
                style={{ marginTop: 0, top: 0 }}>
                <section className="ps-new-item">
                    <div
                        className="ps-form ps-form--new-product"
                        // action=""
                    >
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <figure className="ps-block--form-box">
                                        <figcaption>General</figcaption>
                                        <div className="ps-block__content">
                                            <div className="form-group">
                                                <label>
                                                    Product Name<sup>*</sup>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter product name..."
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>
                                                    Product Summary<sup>*</sup>
                                                </label>
                                                <text-area
                                                    className="form-control"
                                                    rows="6"
                                                    placeholder="Enter product description..."></text-area>
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                     Price<sup>*</sup>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder=""
                                                    value={price}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                />
                                            </div>
                                         
                                            <div className="form-group">
                                                <label>
                                                    Sale Quantity<sup>*</sup>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder=""
                                                    value={stock}
                                                    onChange={(e) =>
                                                        setInstock(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>
                                                    Product Description
                                                    <sup>*</sup>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="6"
                                                    value={description}
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value
                                                        )
                                                    }></textarea>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <figure className="ps-block--form-box">
                                        <figcaption>Product Images</figcaption>
                                        <div className="ps-block__content">
                                            <div className="form-group">
                                                <label>Product Gallery</label>
                                                <div className="form-group--nest">
                                                    <input
                                                        className="form-control mb-1"
                                                        id="fileInput"
                                                        type="file"
                                                        accept="image/*"
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                        onChange={
                                                            handleImageUpload
                                                        }
                                                    />
                                                    <button
                                                        onClick={
                                                            triggerFileInput
                                                        }
                                                        className="ps-btn ps-btn--sm">
                                                        Choose
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="form-group form-group--nest">
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Select: {
                                                                optionSelectedFontWeight: 600,
                                                            },
                                                        },
                                                        // ...customTheme,
                                                        token: {
                                                            borderRadius: 0,
                                                            controlHeight: 60,
                                                            colorBgContainer:
                                                                '#f0f0f0',
                                                            fontSize: 16,
                                                            // optionSelectedFontWeight: 300
                                                        },
                                                    }}>
                                                    <Select
                                                        // styles={customSelectStyles}
                                                        // id="country"
                                                        placeholder="Category "
                                                        showSearch
                                                        className={` w-full `}
                                                        // className=" "
                                                        options={catsdata?.map(
                                                            (country) => ({
                                                                value: country?.id,
                                                                label: country?.name,
                                                            })
                                                        )}
                                                        onChange={(e) =>
                                                            handleSelected(e)
                                                        }
                                                        required={true}
                                                        isClearable
                                                        style={{
                                                            backgroundColor:
                                                                'red',
                                                        }}
                                                    />
                                                </ConfigProvider>
                                            </div>

                                            <div>
                                                <Image width={500} height={500} src={selectedImage} alt='' className='w-[200px] h-[200px]' />
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button onClick={handleSubmit} className="ps-btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
            </Modal>
        </div>
    );
};

export default TableProjectItems;
