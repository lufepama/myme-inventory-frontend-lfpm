import React, { useRef, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

export default function AutocompleteInput({ productList, handleSeletedProductInput }) {

    const inputRef = useRef()

    return (
        <div className='w-full border-2'>
            <Autocomplete
                sx={{
                    display: 'inline-block',
                    '& input': {
                        width: '90%',
                        bgcolor: 'background.paper',
                        color: (theme) =>
                            theme.palette.getContrastText(theme.palette.background.paper),
                    },
                }}
                id="custom-input-demo"
                noOptionsText="Product not found..."
                options={productList}
                onChange={(e, value) => handleSeletedProductInput(value)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref} className='flex flex-row items-center b'>
                        <input ref={inputRef} type="text" {...params.inputProps} className='h-10 w-full' />
                        <SearchIcon className='font-bold w-20 h-20' />
                    </div>
                )}
            />
        </div>
    );
}
