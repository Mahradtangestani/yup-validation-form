import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../PersonalError';

const Input = (props) => {
    const {name,label,type,placeholder} = props
    return (
        <div className="mt-4">
        <label className="label-control text-center text-white">{label}</label>
        <FastField type={type} placeholder={placeholder} className="form-control" name={name}/>
        <ErrorMessage name={name} component={PersonalError}/>
     </div>
    );
}

export default Input;
