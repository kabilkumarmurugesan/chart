import * as React from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
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

export default function DownTimeAction({ data, isDownTime }) {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell align="left">Down Time</StyledTableCell>
                  <StyledTableCell align="right">
                    Down Time Details
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0
                  ? data.map((row, index) => (
                      <StyledTableRow key={row.time}>
                        <StyledTableCell component="th" scope="row">
                          {row.interval}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.downTime}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.message}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
