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

function QA() {
    const [open, setOpen] = useState(false);
    const [subCategory, setSubCategory] = useState([]);
    const [listSubCat, setListSubCat] = useState([]);
    const [newSubCategory, setNewSubCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    // const [listCategory, setListCategory] = useState([]);
    const [update, setUpdate] = useState(false);
    const [QuestionToUpdate, setQuestionToUpdate] = useState(null);
    const [question, setQuestion] = useState([]);
    const [newQuestion, setNewQuestion] = useState([]);
    // const [answer, setAnswer] = useState([]);
    const [newAnswer, setNewAnswer] = useState([]);
    // const [fillterCat, setFillterCat] = useState([]);
    // const [search, setSearch] = useState("");

    const token = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (!token) return;
        fetchData();
        fetchListSubCategory();
    }, [token]);

    // useEffect(() => {
    //     const filltered = category.filter((item) =>
    //         item.subCatagoryname.toLowerCase().includes(search.toLowerCase()));
    //     setFillterCat(filltered);
    // }, [search, category]);

    const fetchListSubCategory = () => {
        axios
            .get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
                headers: { Authorization: token },
            })
            .then((res) => {
                console.log(res.data.data);
                setListSubCat(res.data.data);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    };


    const fetchData = () => {
        axios
            .get('https://interviewhub-3ro7.onrender.com/questions/', {
                headers: { Authorization: token },
            })
            .then((res) => {
                setQuestion(res.data.data || []);
            })
            .catch((err) => console.error("Error fetching subcategories:", err));
    };

    const handleUpdateData = (val) => {
        console.log(val);
        
        setNewQuestion(val.questions);
        setNewAnswer(val.answer);
        setSelectedSubCategory(listSubCat.find((cat) => cat._id === val.subcatagoryID));
        setQuestionToUpdate(val);
        console.log(setQuestionToUpdate);
        setUpdate(true);
        setOpen(true);
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();

        if (!selectedSubCategory) {
            alert("Please select a category before submitting.");
            return;
        }

        const payload = {
            questions: newQuestion,
            answer:newAnswer,
            subcatagoryID: selectedSubCategory._id,
        };
        console.log(payload);
        

        if (update) {

            axios
                .patch(`https://interviewhub-3ro7.onrender.com/questions/${QuestionToUpdate._id}`, payload, {
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

            axios.post('https://interviewhub-3ro7.onrender.com/questions/create', payload, {
                    headers: { Authorization: token },
                })
                .then((res) => {
                    console.log(res.data.data);           
                    alert("Subcategory added successfully.");
                    fetchData();
                    handleClose();
                })
                .catch((err) => console.error("Error creating subcategory:", err));
        }
    };


    const handleRemove = (id) => {
        axios
            .delete(`https://interviewhub-3ro7.onrender.com/questions/${id}`, {
                headers: { Authorization: token },
            })
            .then(() => {
                alert("Subcategory deleted successfully.");
                fetchData();
            })
            .catch((err) => console.error("Error deleting subcategory:", err));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewQuestion("");
        setNewAnswer("");
        setSelectedSubCategory(null);
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
                <Button variant="outlined" onClick={handleOpen}>Add Q & A</Button>

                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleAddOrUpdate}>
                        <DialogTitle>Add New Q & A</DialogTitle>
                        <DialogContent>
                            <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
                                <TextField
                                    label="Question"
                                    variant="outlined"
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                />
                                 <TextField
                                    label="Answer"
                                    variant="outlined"
                                    value={newAnswer}
                                    onChange={(e) => setNewAnswer(e.target.value)}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={listSubCat}
                                    getOptionLabel={(option) => option.subCatagoryname|| ""}
                                    value={selectedSubCategory || null}
                                    onChange={(e, newValue) => setSelectedSubCategory(newValue)}
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
                            <StyledTableCell>Question</StyledTableCell>
                            <StyledTableCell>Answer</StyledTableCell>
                            <StyledTableCell align="right">Sub-Catagory</StyledTableCell>
                            <StyledTableCell align="right">Answer</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                            <StyledTableCell align="right">Update</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {question.map((row, i) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>{i + 1}</StyledTableCell>
                                <StyledTableCell>{row.questions}</StyledTableCell>
                                <StyledTableCell>{row.answer}</StyledTableCell>
                                <StyledTableCell>{row.subcatagoryID?.subCatagoryname || "No Category"}</StyledTableCell>
                                <StyledTableCell>{row.subcatagoryID?.catagoryID?.catagoryName || "No Category"}</StyledTableCell>
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

export default QA;
