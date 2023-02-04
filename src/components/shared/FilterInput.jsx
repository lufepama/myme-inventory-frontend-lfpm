import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from "@mui/icons-material/Search";



const FilterInput = () => {
    return (
        <div className='h-full flex flex-row '>
            <TextField
                placeholder='Search product...'
                InputProps={{
                    endAdornment: <InputAdornment position="end"><Search /></InputAdornment>
                }}
            />
        </div>

    )
}

export default FilterInput