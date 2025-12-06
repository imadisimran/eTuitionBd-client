import React from 'react';

const Container = ({children}) => {
    return (
        <div className='w-11/12 max-w-7xl mx-auto'>
            {children}
        </div>
    );
};

export default Container;