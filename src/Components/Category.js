import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';



function Category() {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState([]);
    const [Newcategory, setNewCategory] = useState("");
    const [selectedcategory, setSelectedCategory] = useState(null);
    const [update, setupdate] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewCategory("");
        setupdate(false);
        setSelectedCategory(null);
    };
    useEffect(() => {
        fetchData()
    }, [])
    let token = localStorage.getItem('isLoggedIn')
    
    const fetchData = () => {
        axios.get('https://interviewhub-3ro7.onrender.com/catagory', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setCategory(res.data.data)  
            })
            .catch((err) => {
                console.log(err);

            })
    }

    const handleRemove = (id) => {
        axios.delete(`https://interviewhub-3ro7.onrender.com/catagory/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data);
                fetchData()
                // setCategory(res.data.data)

            })
            .catch((err) => {
                console.log(err);

            })
    }

    const handelAdd = (e) => {
        e.preventDefault();
        const newCategoryData = { catagoryName: Newcategory }
        if (update && selectedcategory) {
            axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${selectedcategory._id}`, newCategoryData, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    console.log(res.data);
                    fetchData();
                    handleClose();
                    setupdate(false);
                    setSelectedCategory(null);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            axios.post('https://interviewhub-3ro7.onrender.com/catagory/create', newCategoryData, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    console.log(res.data);
                    fetchData();
                    handleClose();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const handelUpdateData = (val) => {
        setNewCategory(val.categoryName);
        setSelectedCategory(val);
        setupdate(true);
        handleClickOpen();
    }

    const handelsearch = (e, value) => {
        const option = value
        axios.get(`https://interviewhub-3ro7.onrender.com/catagory/?search=${option}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data);
                setCategory(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handelStatus = (_id, currentStatus) => {
        const updateStatus = {status: currentStatus ? "off" : "on"};
        axios.patch(`https://interviewhub-3ro7.onrender.com/catagory/${_id}`,updateStatus, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data);
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <>
            {/* <div style={{ display: 'flex' }}> */}

            <div style={{ width: '100%' }}>

                <div className="boxData" style={{ display: 'flex', margin: '20px', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Autocomplete
                        disablePortal
                        options={category}
                        onInputChange={handelsearch}
                        getOptionLabel={(option) => option.catagoryName || ""}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Search Category" />}
                    />
                    {/* .......... */}
                    <React.Fragment>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Open form dialog
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}>
                            <form action="#" onSubmit={handelAdd}>
                                <DialogTitle>Add New Category</DialogTitle>
                                <DialogContent>
                                    <Box
                                        component="form"
                                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={Newcategory} onChange={(e) => setNewCategory(e.target.value)} />
                                    </Box>
                                </DialogContent>
                                <Stack spacing={2} direction="row" sx={{ padding: '16px' }}>
                                    <Button variant="contained" type='submit'>Submit</Button>
                                    <Button variant="outlined" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Stack>
                            </form>
                        </Dialog>
                    </React.Fragment>
                    {/* ............ */}

                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>No</StyledTableCell>
                                    <StyledTableCell>Category Name</StyledTableCell>
                                    <StyledTableCell align="right">Status</StyledTableCell>
                                    <StyledTableCell align="right">Delete</StyledTableCell>
                                    <StyledTableCell align="right">Upadte</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.map((row, i) => (

                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell align="left">{i + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.catagoryName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right"><Switch {...label} checked={row.status === "on"} onChange={() => handelStatus(row._id, row.status === "on")} /></StyledTableCell>
                                        <StyledTableCell align="right"><Button onClick={() => handleRemove(row._id)}><DeleteIcon /></Button></StyledTableCell>
                                        <StyledTableCell align="right"> <button onClick={() => handelUpdateData(row)}><CreateIcon /></button> </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
            {/* </div> */}

        </>
    )
}

export default Category
