import React from 'react';

const PersonalError = ({children}) => {
    return (
        <small className='d-block text-center text-warning'>
            {children}
        </small>
    );
}

export default PersonalError;
