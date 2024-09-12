import React, { useState, useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Select, ConfigProvider } from 'antd';
import {
    getAdmincategories,
    AddProducts,
    AddAds,
    AddPgs,
    getAdsPages,
    AddSize
} from '~/redux/features/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';

const FormAccountSettings = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [cats, setCats] = useState(null);
    const [openQr, setOPenQr] = useState(false);

    const [price, setPrice] = useState(null);
    const [stock, setInstock] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const { getadspage } = useSelector((state) => state.product);
    const [savedId, setSavedId] = useState(null);

    const data = getadspage?.results?.data;

    console.log(savedId);
    useEffect(() => {
        dispatch(getAdsPages());
    }, []);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const images = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(images).then((imagesData) => {
            setSelectedImages(imagesData);
            localStorage.setItem('uploadedImages', JSON.stringify(imagesData));
        });
    };

    const openModal = (id) => {
        setOPenQr(true);
        // setId(id);
    };

    const closeQrModal = () => {
        setOPenQr(false);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    const handleSelected = (e) => {
        console.log(e);
        setSavedId(e);
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('content', description);
        data.append('title', name);
        data.append('page_id', savedId);

        selectedFiles.forEach((file, index) => {
            data.append('files[]', file);
        });

        dispatch(AddAds(data)).then((error) => {
            if(error?.payload?.status === 200){
                toast.success('Page section successfully')

            }
            
        })
    };

    const submit = async () => {
        const data = {
            title: title,
        };

        try {
            const resultAction = await dispatch(AddPgs(data));
            const response = unwrapResult(resultAction);

            console.log(response);

            // Assuming the response contains an id field
            if (response && response.data.data.id) {
                toast.success('Page Added Successfully');
                dispatch(getAdsPages())
                setOPenQr(false);
            }
        } catch (error) {
            // Handle any errors here
            toast.error('Failed to add page')
            setOPenQr(false);

            console.error('Failed to add page:', error);
        }
    };
    const submitSize = () => {
        if(!size){
            toast.error('Enter size')
            return
        }
        const data = {
            size_name: size
        }
        dispatch(AddSize(data)).then((error) => {
            if(error?.payload?.status === 200){
                toast.success('Size created successfully')

            }
            
        })
    }
    return (
        <div className="ps-form--account-settings">
            <div className="mb-10">
                <button onClick={openModal} className="ps-btn py-3 ps-btn--sm">
                    Create page
                </button>
            </div>

            <hr />
            <div className="row mt-40">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Page</label>
                        <div>
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
                                        colorBgContainer: '#f0f0f0',
                                        fontSize: 16,
                                        // optionSelectedFontWeight: 300
                                    },
                                }}>
                                <Select
                                    // styles={customSelectStyles}
                                    id="country"
                                    placeholder="Page "
                                    showSearch
                                    className={` w-[50%] `}
                                    // className=" "
                                    options={data?.map((country) => ({
                                        value: country?.id,
                                        label: country?.page_title,
                                    }))}
                                    onChange={(e) => handleSelected(e)}
                                    required={true}
                                    isClearable
                                    style={{
                                        backgroundColor: 'red',
                                    }}
                                />
                            </ConfigProvider>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Content</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Select Image</label>
                        <div className="form-group--nest">
                            <input
                                className="form-control mb-1"
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                            <button
                                onClick={triggerFileInput}
                                className="ps-btn ps-btn--sm">
                                Choose
                            </button>
                            <div className="image-preview mt-3">
                                {selectedImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`selected-${index}`}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            marginRight: '10px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ps-form__submit">
                <button onClick={handleSubmit} className="ps-btn success">
                    Save Content
                </button>
            </div>
            <div className='my-6'  >
                <p>Create Sizes</p>
                <div>
                    <input
                        className="form-control"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
                <button className="ps-btn success mt-3" onClick={submitSize} >
                                Create Size
                </button>
            </div>
            <Modal
                // title="Print QR"
                open={openQr}
                // onOk={handleOk}
                footer={false}
                onCancel={closeQrModal}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                style={{ marginTop: 0, top: 0 }}>
                <p>Name</p>
                <input
                    className="w-full border border-1 px-3 py-3 mt-4 "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="mt-4">
                    <button
                        className="bg-primary p-2 rounded-lg text-white"
                        onClick={submit}>
                        Submit
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default FormAccountSettings;
