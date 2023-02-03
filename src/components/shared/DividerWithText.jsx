import React from "react";

const DividerWithText = ({ children }) => {

    return (
        <div className='flex items-center w-full'>
            <div className='border border-white w-full' />
            <span className='pt-2 pb-2 pr-3 pl-3 text-bold text-xl text-white'>{children}</span>
            <div className='border border-white w-full' />
        </div>
    );
};
export default DividerWithText;