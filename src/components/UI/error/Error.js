import React from 'react';

const Error = ({message}) => {
    return (
        <div>
            <h2 style={{color:'crimson'}}>ERROR: {message}</h2>
        </div>
    );
};

export default Error;