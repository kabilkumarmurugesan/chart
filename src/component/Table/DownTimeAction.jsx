import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4d5a81",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: 16,
    border: "1px solid #ddd", // Adding border to header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid #ddd", // Adding border to body cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function DownTimeAction({ data }) {
  const [pageNo, setPageNo] = useState(0);
  const [downTimeReport, setDownTimeReport] = useState([]);

  useEffect(() => {
    handlePageChange(pageNo);
  }, [data]);

  const handlePageChange = (pageNo) => {
     if (data.length > 0) {
      let temp = data.reduce((acc, val, i) => {
        let idx = Math.floor(i / 2);
        let page = acc[idx] || (acc[idx] = []);
        page.push(val);

        return acc;
      }, []);
      temp[pageNo] && setDownTimeReport(temp[pageNo]);
    }
  };

  return (
    <Grid container spacing={2} sx={{mt:0.5}}>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{height:'15.2vh'}} className="table-container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "20%" }}>Time</StyledTableCell>
                <StyledTableCell sx={{ width: "15%" }} align="left">
                  Down Time
                </StyledTableCell>
                <StyledTableCell sx={{ width: "65%" }} align="left">
                  Down Time Details
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {downTimeReport.length > 0 ? (
                downTimeReport.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.interval}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.downTime}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.message}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center">
                    No data available
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <IconButton
            disabled={pageNo < 1}
            onClick={() => {
              handlePageChange(pageNo - 1);
              setPageNo(pageNo - 1);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            disabled={pageNo >= Math.floor(data.length / 2)}
            onClick={() => {
              handlePageChange(pageNo + 1);
              setPageNo(pageNo + 1);
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
