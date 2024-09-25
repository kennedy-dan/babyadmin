import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAdmincategories,
    updateAdminCats,
    deleteAdminCats
} from '~/redux/features/productSlice';
import { DataTable } from 'primereact/datatable';
import { IoTrashBinSharp } from "react-icons/io5";

import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
import { Column } from 'primereact/column';
import { Modal, Button } from 'antd';
import Image from'next/image'
import { FilterMatchMode } from 'primereact/api';
import { toast } from 'react-toastify';
const TableCategoryItems = () => {
    const dispatch = useDispatch();
    const [openQr, setOPenQr] = useState(false);
    const [delMod, setDelMod] = useState(false);
    const [id, setId] = useState(null);
    const [delid, setdelId] = useState(null);

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

    const opendelModal = (id) => {
        setDelMod(true)
        setdelId(id)
    }

    const closedelModal = () => {
        setDelMod(false)
    }

    const closeQrModal = () => {
        setOPenQr(false);
    };

    const [rows, setRows] = useState(10);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const openModal = (rowData) => {
        setOPenQr(true);
        setId(rowData?.id);
        setName(rowData?.name)
        setSelectedImage(rowData?.image_url)
    };

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
     if(name){
        data.append("name", name);

     }
     if(selectedImage){
        data.append("image", imagefile);

     }
        dispatch(updateAdminCats({ data: data, id: id })).then(() => {
            dispatch(getAdmincategories()).then((error) => {
                setOPenQr(false)
                if(error?.payload?.code === 200){
                    toast.success('Category Updated successfully')

                }
            })
        })
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

  const deleteCats = () => {
    dispatch(deleteAdminCats({ id: delid })).then(() => {
        dispatch(getAdmincategories()).then((error) => {
        setDelMod(false)

            if(error?.payload?.code === 200){
                toast.success('Category deleted successfully')

            }
        })
    })
    setDelMod(false)

  }

    let columns = [
        {
            field: 'id',
            header: 'S/N',
            isSort: true,
            body: (rowData, options) => {
                return options.rowIndex + 1;
            },
        },

        {
            field: 'name',
            header: 'Name',
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
                    <div className='flex space-x-4' >
                        <button className='bg-green-700 rounded-md text-white px-4 py-2' onClick={() => openModal(rowData)}>
                            Update
                        </button>
                          <button className='bg-red-700 rounded-md text-white px-4 py-2' onClick={() => opendelModal(rowData.id)}>
                          Delete
                      </button>
                    </div>
                );
            },
        },

        // {
        //     field: '',
        //     header: 'Delete',
        //     isSort: true,
        //     body: (rowData) => {
        //         return (
        //             <div>
        //                 <button onClick={() => deleteCats(rowData.id)}>
        //                     Delete
        //                 </button>
        //             </div>
        //         );
        //     },
        // },
    ];

    return (
        <div className="table-responsive">
            <DataTable
                value={customData}
                // loading={reservationHistory?.isLoading}
                // paginatorF
                paginator
                rows={rows}
                rowClassName={() => 'table-row-border'}

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
                open={delMod}
                // onOk={handleOk}
                footer={false}
                onCancel={closedelModal}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                style={{ marginTop: 0 }}>
                    
                    <p>Deleted Category?</p>
                    <div className='flex justify-end space-x-4' >
                        <button className='bg-green-600 rounded-md text-white px-4 py-2' onClick={deleteCats} >Yes</button>
                        <button className='bg-red-700 rounded-md text-white px-4 py-2' onClick={closedelModal}>No</button>
                    </div>
                     </Modal>
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
                    <Image  height={500} width={500} alt='' src={selectedImage} className='w-40 h-40 ml-4 object-contain' />
                </div>
                <div className='mt-4' >
                    <button className='bg-primary p-2 rounded-lg text-white' onClick={handleUpdate}>Update</button>
                </div>
            </Modal>
        </div>
    );
};

export default TableCategoryItems;
