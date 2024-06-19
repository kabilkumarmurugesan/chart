import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4d5a81",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(time, downtime, details) {
  return { time, downtime, details };
}

const rows = [
  createData("3:00 - 4:00 PM", "15 min", "Power cut"),
  createData("4:00 - 5:00 PM", "25 min", "Power cut"),
];

export default function DownTimeAction() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell align="right">Down Time</StyledTableCell>
            <StyledTableCell align="right">
              Down Time Details&nbsp;(g)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.time}>
              <StyledTableCell component="th" scope="row">
                {row.time}
              </StyledTableCell>
              <StyledTableCell align="right">{row.downtime}</StyledTableCell>
              <StyledTableCell align="right">{row.details}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
