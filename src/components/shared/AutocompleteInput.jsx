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
                        paddingLeft: '12px',
                        color: (theme) =>
                            theme.palette.getContrastText(theme.palette.background.paper),
                    },
                }}
                id="custom-input-demo"

                noOptionsText={`${productList.length == 0 ? 'Product list empty' : 'Product not found...'} `}
                options={productList}
                onChange={(e, value) => handleSeletedProductInput(value)}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )
                }}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref} className='flex flex-row items-center b'>
                        <input placeholder={'Search product...'} ref={inputRef} type="text" {...params.inputProps} className='h-10 w-full' />
                        <SearchIcon className='font-bold w-20 h-20' />
                    </div>
                )}
            />
        </div>
    );
}
