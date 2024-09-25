import React, { useState, useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Select, ConfigProvider } from 'antd';
import { IoIosClose, IoMdAdd } from 'react-icons/io';

import {
    getAdmincategories,
    AddProducts,
    AddAds,
    AddPgs,
    getAdsPages,
    AddSize,
    delSize,
    getsizes,
    delAdsPages,
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
    const { getadspage, sizes } = useSelector((state) => state.product);
    const [savedId, setSavedId] = useState(null);

    const data = getadspage?.results?.data;
    const sizeData = sizes?.results?.data;
    console.log(savedId);
    useEffect(() => {
        dispatch(getAdsPages());
        dispatch(getsizes());
    }, []);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        const images = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(images).then((newImagesData) => {
            setSelectedImages((prevImages) => [
                ...prevImages,
                ...newImagesData,
            ]);
            const allImages = JSON.parse(
                localStorage.getItem('uploadedImages') || '[]'
            );
            const updatedImages = [...allImages, ...newImagesData];
            localStorage.setItem(
                'uploadedImages',
                JSON.stringify(updatedImages)
            );
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

    const delSizes = (id) => {
        dispatch(delSize(id)).then(() => {
            dispatch(getsizes());
            toast.success('size deleted successfully ');
        });
    };

    const delPages = (id) => {
        dispatch(delAdsPages(id)).then(() => {
            dispatch(getAdsPages());
            toast.success('Page deleted successfully ');
        });
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('content', 'home page');
        data.append('title', 'home page');
        data.append('page_id', 16);

        selectedFiles.forEach((file, index) => {
            data.append('files[]', file);
        });

        dispatch(AddAds(data)).then((error) => {
            if (error?.payload?.status === 200) {
                toast.success('Page section successfully');
            }
        });
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
                dispatch(getAdsPages());
                setOPenQr(false);
            }
        } catch (error) {
            // Handle any errors here
            toast.error('Failed to add page');
            setOPenQr(false);

            console.error('Failed to add page:', error);
        }
    };
    const submitSize = () => {
        if (!size) {
            toast.error('Enter size');
            return;
        }
        const data = {
            size_name: size,
        };
        dispatch(AddSize(data)).then((error) => {
            if (error?.payload?.status === 200) {
                toast.success('Size created successfully');
            }
        });
    };
    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    
        // Update localStorage
        const storedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
        const updatedStoredImages = storedImages.filter((_, index) => index !== indexToRemove);
        localStorage.setItem('uploadedImages', JSON.stringify(updatedStoredImages));
    };
    const customOptionRender = (option) => (
        <div className="flex justify-between items-center">
            <span>{option.label}</span>
            <IoIosClose
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={(e) => delPages(option.value)}
            />
        </div>
    );
    return (
        <div className="ps-form--account-">
            {/* <div className="mb-10">
                <button onClick={openModal} className="ps-btn py-3 ps-btn--sm">
                    Create page
                </button>
            </div> */}

            {/* <hr /> */}
            <div className="row">
                {/* <div className="col-sm-6">
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
                                    optionRender={customOptionRender}
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
                </div> */}
                <div className="col-sm-12">
                    <div className="form-group">
                        {/* <label>Select Image</label> */}
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

                         
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <p>Home Page Top Ads</p> 
                    <div
                        onClick={triggerFileInput}
                        className="bg-gray-300 rounded-3xl w-full flex items-center justify-center h-[200px] ">
                        <div>
                            <div className='text-center flex justify-center w-full' >
                            <IoMdAdd size={22} />

                            </div>
                            <div className='text-center' >Click here to add Images</div>
                        </div>
                    </div>
                </div>
                <hr className="mt-3" />
            </div>
            <div className="image-preview mt-3 flex space-x-5 ">
            {selectedImages.map((image, index) => (
        <div key={index} className="relative inline-block">
            <img
                src={image}
                alt={`selected-${index}`}
                style={{
                    width: '100px',
                    height: '100px',
                    marginRight: '10px',
                    objectFit: 'cover',
                }}
            />
            <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                style={{ transform: 'translate(50%, -50%)' }}
            >
                ×
            </button>
        </div>
    ))}
                            </div>
            <div className="ps-form__submit mt-6">
                <p>Create page</p>
                <p>Click the button bellow to create a new papge</p>
                <button
                    onClick={handleSubmit}
                    className="bg-[#003057] py-3 px-5 rounded-lg">
                    <div className="text-white">Create Page</div>
                </button>
            </div>
            <div className="w-full h-[1px] bg-gray-500 mt-3 "></div>
            <div className="my-16">
                <p>Create Sizes</p>
                <div>
                    <input
                        className="form-control"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                </div>
                <button
                    className="bg-[#003057]  mt-3 py-3 px-5 rounded-lg"
                    onClick={submitSize}>
                    <div className="text-white"> Create Size</div>
                </button>
                <div>
                    <div className="border rounded-md py-6 px-6 mt-8  border-black">
                        <div className="grid grid-cols-6 gap-4 ">
                            {sizeData?.map((items) => (
                                <div className="flex items-center justify-between bg-gray-400 rounded-md space-x-3 px-3 py-3 ">
                                    <div>{items?.size_name}</div>
                                    <div onClick={() => delSizes(items?.id)}>
                                        <IoIosClose size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
