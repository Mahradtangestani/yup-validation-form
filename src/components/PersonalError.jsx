import React from 'react';

const PersonalError = ({children}) => {
    return (
        <small className='d-block text-center text-danger'>
            {children}
        </small>
    );
}

export default PersonalError;
