import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchCategory from './SearchCategory';
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


function SubCategory() {

    const [open, setopen] = React.useState(false)
    const [category, setcategory] = useState([])
    const [Newcategory, setNewCategory] = useState("")
    const [selectedcategory, setselectedcategory] = useState(null)
    const [ListCategory, setListCategory] = useState([])
    const [update, setupdate] = useState(false);

    const handelOpen = () => {
        setopen(true)
    }
    const handelClose = () => {
        setopen(false)
        setNewCategory("")
        setselectedcategory(null)
        setupdate(false)
    }

    useEffect(() => {
        fetchData();
        fetchListCategory()
    }, [])
    let token = localStorage.getItem('isLoggedIn')

    const fetchListCategory = () => {
        axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data);
                const filteredCategories = res.data.data.filter(cat => cat.status === "on");
                setListCategory(filteredCategories)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const fetchData = () => {
        axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data);
                setcategory(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleRemove = (id) => {
        axios.delete(`https://interviewhub-3ro7.onrender.com/subcatagory/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data);
                fetchData()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handelAdd = (e) => {
        e.preventDefault()
        if (!selectedcategory) {
            alert("please select category before submitting");
            return;
        }
        const newsubcat = {
            subCatagoryname: Newcategory,
            categoryID: selectedcategory?._id,
        }
        console.log(newsubcat);

        if (update && selectedcategory) {
            axios.patch(`https://interviewhub-3ro7.onrender.com/subcatagory/${selectedcategory._id}`,newsubcat,{
                headers: {
                    Authorization: token
                }
            })
            .then((res) => {
                console.log(res.data);
                fetchData()
                handelClose();
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            axios.post('https://interviewhub-3ro7.onrender.com/subcatagory/create', newsubcat, {
                headers: {
                    Authorization: token
                }
            })

                .then((res) => {
                    console.log(res.data);
                    fetchData();
                    handelClose();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    const handelUpdateData = (val) => {
        setNewCategory(val.subCatagoryname)
        setselectedcategory(val)
        setupdate(true)
        handelOpen()
    }
    const handelSearch = (value) => {
        const option = value
        axios.get(`https://interviewhub-3ro7.onrender.com/subcatagory/?search=${option}`,{
            headers: {
                Authorization: token
            }
        })
        .then((res) => {
            console.log(res.data);
            setcategory(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const handelStatus = () => {

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

            <div style={{ width: '100%' }}>

                <div className="boxData" style={{ display: 'flex', margin: '20px', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Autocomplete
                        disablePortal
                        options={category}
                        onInputChange={handelSearch}
                        getOptionLabel={(option) => option.subCatagoryname || ""}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="select category" />}
                    />
                    {/* .......... */}
                    <React.Fragment>
                        <Button variant="outlined" onClick={handelOpen}>
                            Open form dialog
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handelClose}>
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
                                        <Autocomplete
                                            disablePortal
                                            options={ListCategory}
                                            getOptionLabel={(option) => option.catagoryName || ""}
                                            value={selectedcategory}
                                            onChange={(e, newValue) => setselectedcategory(newValue)}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Search Category" />}
                                        />
                                    </Box>
                                </DialogContent>
                                <Stack spacing={2} direction="row" sx={{ padding: '16px' }}>
                                    <Button variant="contained" type='submit'>Submit</Button>
                                    <Button variant="outlined" onClick={handelClose}>
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
                                    <StyledTableCell>Sub Category</StyledTableCell>
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
                                            {row.subCatagoryname}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.catagoryID?.catagoryName || "No Category"}
                                        </StyledTableCell>
                                        <StyledTableCell align="right"><Switch {...label} onChange={() => handelStatus(row._id, row.status)} /></StyledTableCell>
                                        <StyledTableCell align="right"><Button onClick={() => handleRemove(row._id)}><DeleteIcon /></Button></StyledTableCell>
                                        <StyledTableCell align="right"><button onClick={() => handelUpdateData(row)}><CreateIcon /></button></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>


        </>
    )
}

export default SubCategory
