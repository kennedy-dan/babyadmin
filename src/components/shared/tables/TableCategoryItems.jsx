import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAdmincategories,
    updateAdminCats,
} from '~/redux/features/productSlice';
import { DataTable } from 'primereact/datatable';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
import { Column } from 'primereact/column';
import { Modal, Button } from 'antd';

import { FilterMatchMode } from 'primereact/api';
const TableCategoryItems = () => {
    const dispatch = useDispatch();
    const [openQr, setOPenQr] = useState(false);
    const [id, setId] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const { getadmincarts } = useSelector((state) => state.product);

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
    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    const openModal = (id) => {
        setOPenQr(true);
        setId(id);
    };

    const closeQrModal = () => {
        setOPenQr(false);
    };

    const [rows, setRows] = useState(10);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

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

    const data = getadmincarts?.results?.data;
    const customData = data;

    const handleUpdate = async () => {
      let imagefile

      imagefile = await handleUpload();
        console.log(id);
        const data = new FormData();
     
        data.append("name", name);
        data.append("image", imagefile);
        dispatch(updateAdminCats({ data: data, id: id }));
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

    let columns = [
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
            field: 'name',
            header: 'Slug',
            isSort: true,
            body: (rowData) => {
                return <p>{rowData.name}</p>;
            },
        },

        {
            field: '',
            header: 'Action',
            isSort: true,
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
                header={searchBar}
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
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                style={{ marginTop: 0, top: 0 }}>
                <p>Name</p>
                <input
                    className="w-full border border-1 px-3 py-3 mt-4 "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <p>Select Image</p>
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
                    <img alt='' src={selectedImage} className='w-16 h-16 ml-4 object-contain' />
                </div>
                <div className='mt-4' >
                    <button className='bg-primary p-2 rounded-lg text-white' onClick={handleUpdate}>Update</button>
                </div>
            </Modal>
        </div>
    );
};

export default TableCategoryItems;
