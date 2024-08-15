import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addAdmincategories, getAdmincategories } from '~/redux/features/productSlice';

const FormCreateCategory = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSubmit = () => {
        const data = {
            name: name
        }
        dispatch(addAdmincategories(data)).then(({ error }) => {
            if (!error) {
                dispatch(getAdmincategories());
            }
    })}

    return (
        <  >
            <div className="ps-form__content">
                <div className="form-group">
                    <label>
                        Name<sup>*</sup>
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
