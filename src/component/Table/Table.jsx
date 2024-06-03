import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const series = [
  { line: 1, x: "09-10", y: 1292, goals: 5600, dn: "DT" },
  {
    x: "10-11",
    line: 1,
    y: 432,
    goals: 560,
    dn: "DT",
  },
  {
    x: "11-12",
    y: 423,
    line: 1,
    goals: 520,
    dn: "DT",
  },
  {
    x: "12-01",
    line: 1,
    y: 653,
    goals: 520,
    dn: "DT",
  },
  {
    x: "01-02",
    y: 133,
    line: 1,
    goals: 520,
    dn: "DT",
  },
  { line: 1, x: "02-03", y: 7132, goals: 5200, dn: "NB" },
  {
    x: "03-04",
    line: 1,
    y: 332,
    goals: 520,
    dn: "NB",
  },
  {
    x: "04-05",
    line: 1,
    y: 553,
    goals: 520,
    dn: "NB",
  },
  {
    x: "05-06",
    line: 1,
    y: 753,
    goals: 520,
    dn: "NB",
  },
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        orientation="vertical"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableRow>
          <TableCellHeader title={"Shift"} />
          {series.map((item) => (
            <TableCell> {item.x}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Actual"} />
          {series.map((item) => (
            <TableCell> {item.y}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Target"} />
          {series.map((item) => (
            <TableCell> {item.goals}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"DT/NB"} />
          {series.map((item) => (
            <TableCell> {item.dn}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Line"} />
          {series.map((item) => (
            <TableCell> {item.line}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCellHeader title={"Down Time"} />
          {series.map((item) => (
            <TableCell> -</TableCell>
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
        fontSize: "1rem",
        color: "#fff",
        background: "rgb(4, 142, 254)",
      }}
    >
      {props.title}
    </TableCell>
  );
}
