import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from "@mui/icons-material/Search";



const FilterInput = ({ placeholder, handleInputChange, inputValue }) => {


    return (
        <div className='h-full flex flex-row '>
            <TextField
                placeholder={placeholder}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><Search /></InputAdornment>
                }}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>

    )
}

export default FilterInput