import React, { useState } from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { InputText } from 'primereact/inputtext';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
import Image from 'next/image';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Select, ConfigProvider, Modal } from 'antd';

import {
    getAdminProducts,
    AddCoupons,
    getCoupon,
    UpdateProducts,
} from '~/redux/features/productSlice';

const TableProjectItems = ({ data }) => {
  const dispatch = useDispatch()
    const customData = data;
    const [rows, setRows] = useState(10);
    const [openQr, setOPenQr] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cats, setCats] = useState(null);
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
    const openModal = (id) => {
        setOPenQr(true);
        setId(id);
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
      console.log(file)
    return file
    
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
        data.append('category_id', cats);
        data.append('price', price);
        data.append('in_stock', stock);
        data.append('description', description);
        data.append('name', name);
        data.append('image', imagefile);
        dispatch(UpdateProducts({data, id}));
    };

    let columns = [
        {
            field: 'image',
            header: 'image',
            isSort: true,
            body: (rowData, options) => {
                return (
                    <Image
                        width={500}
                        height={500}
                        src={rowData?.image_url}
                        alt=""
                        className="w-20 h-20"
                    />
                );
            },
        },
        {
            field: 'id',
            header: 'id',
            isSort: true,
            body: (rowData, options) => {
                return options.rowIndex + 1;
            },
        },

        {
            field: 'name',
            header: 'name',
            isSort: true,
            body: (rowData) => {
                return <p>{rowData.name}</p>;
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
            field: 'Update',
            header: 'Update',
            body: (rowData) => {
                return (
                    <div>
                        <button onClick={() => openModal(rowData?.id)}>
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

    return (
        <div className="table-responsive">
            <DataTable
                value={customData}
                // loading={reservationHistory?.isLoading}
                // paginatorF
                paginator
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
                // title="Print QR"
                open={openQr}
                // onOk={handleOk}
                footer={false}
                onCancel={closeQrModal}
                width={'100vh'}
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
                                                Regular Price<sup>*</sup>
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
                                                Sale Price<sup>*</sup>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder=""
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
                                                    setInstock(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                Product Description<sup>*</sup>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                rows="6"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                                ></textarea>
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
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageUpload}
                                                />
                                                <button
                                                    onClick={triggerFileInput}
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
                                                    options={data?.map(
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
                                                        backgroundColor: 'red',
                                                    }}
                                                />
                                            </ConfigProvider>
                                        </div>
                                   
                                    </div>
                                </figure>
                          
                             
                            </div>
                        </div>
                    </div>
                    <div className="ps-form__bottom">
                        <a
                            className="ps-btn ps-btn--black"
                            href="products.html">
                            Back
                        </a>
                        <button className="ps-btn ps-btn--gray">Cancel</button>
                        <button onClick={handleSubmit} className="ps-btn">Submit</button>
                    </div>
                </div>
            </section>
            </Modal>
        </div>
    );
};

export default TableProjectItems;
