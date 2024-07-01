import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  const series = props.response;
  return (
    <TableContainer component={Paper}>
      <Table
        orientation="vertical"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="uphTable"
      >
        <TableRow>
          <TableCellHeader title={"Time"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                padding: "10px",
                textAlign: "center",
              }}
            >
              {item.x}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"UPH"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                textAlign: "center",
                padding: "10px",
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
                padding: "10px",
              }}
            >
              {item.headcount}
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
                padding: "10px",
              }}
            >
              {item.upph}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Down Time"} />
          {series.map((item, i) => (
            <TableCell
              key={i}
              style={{
                padding: "10px",
                textAlign: "center",
              }}
            >
              {item.downtime}
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
        padding: "8px",
        width: "88px",
        background: "#4d5a81",
      }}
    >
      {props.title}
    </TableCell>
  );
}
