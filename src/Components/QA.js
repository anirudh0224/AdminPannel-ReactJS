import React from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


function QA() {

    // const label = { inputProps: { 'aria-label': 'Switch demo' } };

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

    function createData(No, Question, Answer, subcategory, category, deleteData, updateData) {
        return { No, Question, Answer, subcategory, category, deleteData, updateData };
    }

    const rows = [
        createData(1, 'What are basic data types supported in the C Programming Language?', '<p>Hello this is sample </p>', 'javascript', 'dasdsz', <DeleteIcon />, <CreateIcon />),
    ];
    return (
        <>

            <div style={{ width: '100%' }}>
                
                <div className="boxData" style={{ display: 'flex', margin: '20px', alignItems: 'center', justifyContent: 'end' }}>

                    <Stack spacing={2} direction="row">
                        <Button variant="contained">Add Q & A</Button>
                    </Stack>

                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>No</StyledTableCell>
                                    <StyledTableCell>Question</StyledTableCell>
                                    <StyledTableCell>Answer</StyledTableCell>
                                    <StyledTableCell>Sub Category</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell align="right">Delete</StyledTableCell>
                                    <StyledTableCell align="right">Upadte</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (

                                    <StyledTableRow key={row.Question}>
                                        <StyledTableCell align="left">{row.No}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.Question}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.Answer}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.subcategory}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.category}
                                        </StyledTableCell>

                                        <StyledTableCell align="right">{row.deleteData}</StyledTableCell>
                                        <StyledTableCell align="right">{row.updateData}</StyledTableCell>
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

export default QA
