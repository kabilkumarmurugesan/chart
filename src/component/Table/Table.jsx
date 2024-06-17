import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ response }) {
  const series = response;
  return (
    <TableContainer component={Paper}>
      <Table
        orientation="vertical"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableRow>
          <TableCellHeader title={"UPH"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                textAlign: "center",
              }}
            >
              {item.y}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Operator"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                textAlign: "center",
              }}
            >
              {item.y}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"UPPH"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                textAlign: "center",
              }}
            >
              {item.target}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Down Time"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                textAlign: "center",
              }}
            >
              -
            </TableCell>
          ))}
        </TableRow>
      </Table>
    </TableContainer>
  );
}

function TableCellHeader(props) {
  return (
    <TableCell
      style={{
        fontWeight: "bold",
        fontSize: "15px",
        color: "#fff",
        width: "10px",
        background: "#4d5a81",
      }}
    >
      {props.title}
    </TableCell>
  );
}
