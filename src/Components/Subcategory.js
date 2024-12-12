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

function SubCategory() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [update, setUpdate] = useState(false);
    const [SubCatagoryToUpdate, setSubCatagoryToUpdate] = useState(null);
    const [fillterCat, setFillterCat] = useState([]);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (!token) return;
        fetchData();
        fetchListCategory();
    }, [token]);

    useEffect(() => {
        const filltered = category.filter((item) =>
            item.subCatagoryname.toLowerCase().includes(search.toLowerCase()));
        setFillterCat(filltered);
    }, [search, category]);

    const fetchListCategory = () => {
        axios
            .get('https://interviewhub-3ro7.onrender.com/catagory/', {
                headers: { Authorization: token },
            })
            .then((res) => {
                const filteredCategories = res.data.data.filter((cat) => cat.status === "on");
                setListCategory(filteredCategories);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    };


    const fetchData = () => {
        axios
            .get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
                headers: { Authorization: token },
            })
            .then((res) => {
                setCategory(res.data.data || []);
            })
            .catch((err) => console.error("Error fetching subcategories:", err));
    };

    const handleUpdateData = (val) => {
        setNewCategory(val.subCatagoryname);
        setSelectedCategory(listCategory.find((cat) => cat._id === val.catagoryID));
        console.log("==============", val._id);
        setSubCatagoryToUpdate(val);
        setUpdate(true);
        setOpen(true);
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();

        if (!selectedCategory) {
            alert("Please select a category before submitting.");
            return;
        }

        const payload = {
            subCatagoryname: newCategory,
            catagoryID: selectedCategory._id,
        };

        if (update) {

            axios
                .patch(`https://interviewhub-3ro7.onrender.com/subcatagory/${SubCatagoryToUpdate._id}`, payload, {
                    headers: { Authorization: token },
                })
                .then((res) => {
                    console.log("update response==", res.data);
                    if (res.data.status === "success") {
                        alert("Subcategory updated successfully.");
                        fetchData();
                        handleClose();
                    } else {
                        alert("Failed to update subcategory.");
                    }
                })
                .catch((err) => console.error("Error updating subcategory:", err));
        } else {

            axios
                .post('https://interviewhub-3ro7.onrender.com/subcatagory/create', payload, {
                    headers: { Authorization: token },
                })
                .then((res) => {
                    alert("Subcategory added successfully.");
                    fetchData();
                    handleClose();
                })
                .catch((err) => console.error("Error creating subcategory:", err));
        }
    };


    const handleRemove = (id) => {
        axios
            .delete(`https://interviewhub-3ro7.onrender.com/subcatagory/${id}`, {
                headers: { Authorization: token },
            })
            .then(() => {
                alert("Subcategory deleted successfully.");
                fetchData();
            })
            .catch((err) => console.error("Error deleting subcategory:", err));
    };

    const handleStatus = (id, currentStatus) => {
        const updatedStatus = { status: currentStatus ? "off" : "on" };
        axios
            .patch(`https://interviewhub-3ro7.onrender.com/subcatagory/${id}`, updatedStatus, {
                headers: { Authorization: token },
            })
            .then((res) => {
                console.log(res.data);
                fetchData();
            })
            .catch((err) => console.error("Error updating status:", err));
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewCategory("");
        setSelectedCategory(null);
        setUpdate(false);
    };


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
    }));

    return (
        <div style={{ width: '100%' }}>
            <div className="boxData" style={{ display: 'flex', margin: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Autocomplete
                    disablePortal
                    options={fillterCat} // Filtered categories
                    onInputChange={(event, value) => setSearch(value)} // Update search value
                    getOptionLabel={(option) => option.subCatagoryname || ""}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search Subcategory" />}
                    noOptionsText="No matching subcategories"
                />
                <Button variant="outlined" onClick={handleOpen}>Add New Subcategory</Button>

                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleAddOrUpdate}>
                        <DialogTitle>{update ? "Update Subcategory" : "Add New Subcategory"}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
                                <TextField
                                    label="Subcategory Name"
                                    variant="outlined"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={listCategory}
                                    getOptionLabel={(option) => option.catagoryName || ""}
                                    value={selectedCategory || null}
                                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Category" />}
                                />
                            </Box>
                        </DialogContent>
                        <Stack spacing={2} direction="row" sx={{ padding: '16px' }}>
                            <Button variant="contained" type="submit">Submit</Button>
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        </Stack>
                    </form>
                </Dialog>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Subcategory Name</StyledTableCell>
                            <StyledTableCell>Category Name</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                            <StyledTableCell align="right">Update</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fillterCat.map((row, i) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>{i + 1}</StyledTableCell>
                                <StyledTableCell>{row.subCatagoryname}</StyledTableCell>
                                <StyledTableCell>{row.catagoryID?.catagoryName || "No Category"}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Switch
                                        checked={row.status === "on"}
                                        onChange={() => handleStatus(row._id, row.status === "on")}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button onClick={() => handleRemove(row._id)}>
                                        <DeleteIcon />
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button onClick={() => handleUpdateData(row)}>
                                        <CreateIcon />
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default SubCategory;
