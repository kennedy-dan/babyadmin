'use client';

import React, { useState, useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Select, ConfigProvider } from 'antd';
import { getAdmincategories, AddProducts } from '~/redux/features/productSlice';

const CreateProductPage = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cats, setCats] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setInstock] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { getadmincarts } = useSelector((state) => state.product);

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
        let imagefile

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
        data.append("category_id", cats);
        data.append("price", price);
        data.append("in_stock", stock);
        data.append("description", description);
        data.append("name", name);
        data.append("image", imagefile);
        dispatch(AddProducts(data))
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
    const data = getadmincarts?.results?.data;
    const handleSelected = (e) => {
        console.log(e);
        setCats(e);
    };

    useEffect(() => {
        dispatch(getAdmincategories());
    }, []);
    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    return (
        <ContainerDefault title="Create new product">
            <HeaderDashboard
                title="Create Product"
                description="Martfury Create New Product "
            />
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
                                                    id="country"
                                                    placeholder="Country "
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
                                        <div className="form-group">
                                            <label>Video (optional)</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter video URL"
                                            />
                                        </div>
                                    </div>
                                </figure>
                                <figure className="ps-block--form-box">
                                    <figcaption>Inventory</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>
                                                SKU<sup>*</sup>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="form-group form-group--select">
                                            <label>Status</label>
                                            <div className="form-group__content">
                                                <select
                                                    className="ps-select"
                                                    title="Status">
                                                    <option value="1">
                                                        Status 1
                                                    </option>
                                                    <option value="2">
                                                        Status 2
                                                    </option>
                                                    <option value="3">
                                                        Status 3
                                                    </option>
                                                    <option value="4">
                                                        Status 4
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                                <figure className="ps-block--form-box">
                                    <figcaption>Meta</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group form-group--select">
                                            <label>Brand</label>
                                            <div className="form-group__content">
                                                <select
                                                    className="ps-select"
                                                    title="Brand">
                                                    <option value="1">
                                                        Brand 1
                                                    </option>
                                                    <option value="2">
                                                        Brand 2
                                                    </option>
                                                    <option value="3">
                                                        Brand 3
                                                    </option>
                                                    <option value="4">
                                                        Brand 4
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Tags</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                            />
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
        </ContainerDefault>
    );
};
export default connect((state) => state.app)(CreateProductPage);
