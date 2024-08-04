import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AddNewProductModal from './AddNewProductModal'

function AddNewProductPage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);
    return (
        <div className='mt-10 px-6' >
            <Button onClick={handleOpen} variant="contained" color="primary" >
                Add Products
            </Button>
            <AddNewProductModal open={open} handleClose={handleClose} handleToggle={handleToggle} />
        </div>
    )
}

export default AddNewProductPage
