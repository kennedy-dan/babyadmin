import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addAdmincategories, getAdmincategories } from '~/redux/features/productSlice';

const FormCreateCategory = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSubmit = () => {
        if(!name){
            toast.error('name is required')
            return
        }
        const data = {
            name: name
        }
        dispatch(addAdmincategories(data)).then((error ) => {
            console.log(error)
            if (error?.payload?.code === 200) {
                toast.success("Category added successfully")

            }
            dispatch(getAdmincategories())

    })}

    return (
        <  >
            <div className="ps-form__content">
                <div className="form-group">
                    <label>
                        Create New Category<sup>*</sup>
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
               
            </div>
            <div className="ps-form__bottom">
                {/* <button className="ps-btn ps-btn--gray">Reset</button> */}
                <button className="ps-btn ps-btn--sumbit success" onClick={handleSubmit}>
                    Add new
                </button>
            </div>
        </>
    );
};

export default FormCreateCategory;
