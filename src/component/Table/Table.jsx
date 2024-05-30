import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const series = [
  { line: 1, x: "09-10", y: 1292, goals: 5600 },
  {
    x: "10-11",
    line: 1,
    y: 4432,
    goals: 5600,
  },
  {
    x: "11-12",
    y: 5423,
    line: 1,
    goals: 5200,
  },
  {
    x: "12-01",
    line: 1,
    y: 6653,
    goals: 5200,
  },
  {
    x: "01-02",
    y: 8133,
    line: 1,
    goals: 5200,
  },
  { line: 1, x: "02-03", y: 7132, goals: 5200 },
  {
    x: "03-04",
    line: 1,
    y: 7332,
    goals: 5200,
  },
  {
    x: "04-05",
    line: 1,
    y: 6553,
    goals: 5200,
  },
  {
    x: "05-06",
    line: 1,
    y: 6753,
    goals: 5200,
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
          <TableCell>Shift</TableCell>
          {series.map((item) => (
            <TableCell> {item.x}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Actual</TableCell>
          {series.map((item) => (
            <TableCell> {item.y}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Targat</TableCell>
          {series.map((item) => (
            <TableCell> {item.goals}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Line</TableCell>
          {series.map((item) => (
            <TableCell> {item.line}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell>Down Time</TableCell>
          {series.map((item) => (
            <TableCell> -</TableCell>
          ))}
        </TableRow>
      </Table>
    </TableContainer>
  );
}
