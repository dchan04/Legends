import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { visuallyHidden } from "@mui/utils";
import "./LegendTable.css";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [totalCount, setCount] = React.useState([]);
  const [variantCount, setVCount] = React.useState([]);

  useEffect(() => {
    fetch("https://localhost:7150/get-total-count")
      .then((res) => res.json().then((data) => setCount(data)))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://localhost:7150/get-total-variant-count-per-species/${row.speciesCode}`
    )
      .then((res) => res.json().then((data) => setVCount(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "td:first-of-type": {
            borderTopLeftRadius: "8px",
          },
          "td:last-of-type": {
            borderBottomRightRadius: "8px",
          },
        }}
      >
        <TableCell align="center" scope="row">
          <img src={row.defaultImg} />
        </TableCell>
        <TableCell align="center">
          <b>{row.speciesName}</b>
        </TableCell>
        <TableCell align="center">
          {((variantCount / totalCount) * 100).toFixed(1)}%
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className="variantRow">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                All Variants
              </Typography>
              <Table size="small" aria-label="variants">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Icon</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Level</TableCell>
                    <TableCell align="left">Rarity</TableCell>
                    <TableCell align="left">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.variants.map((variantRow) => (
                    <TableRow key={variantRow.variantId}>
                      <TableCell align="left">
                        <img src={variantRow.imgPath} width={75} height={50} />
                      </TableCell>
                      <TableCell align="left">{variantRow.name}</TableCell>
                      <TableCell align="left">{variantRow.level}</TableCell>
                      <TableCell align="left">{variantRow.rarity}</TableCell>
                      <TableCell align="left">
                        {((variantRow.count / variantCount) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const headCells = [
  {
    id: "speciesName",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};
Row.propTypes = {
  row: PropTypes.shape({
    speciesId: PropTypes.number,
    speciesCode: PropTypes.number,
    speciesName: PropTypes.string,
    defaultImg: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        variantId: PropTypes.number,
        variantCode: PropTypes.number,
        level: PropTypes.number,
        count: PropTypes.number,
        rarity: PropTypes.string,
        name: PropTypes.string,
        imgPath: PropTypes.string,
        speciesId: PropTypes.number,
      })
    ),
  }).isRequired,
};
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Icon</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Pick Rate</TableCell>
        <TableCell align="center">All Species</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function FetchLegendsTable() {
  const [species, setspecies] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("speciesName");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  useEffect(() => {
    (async () => {
      const url = "https://localhost:7150/get-all-species";
      fetch(url, {
        method: "GET",
      })
        .then((Response) => Response.json())
        .then((speciesFromServer) => {
          console.log(speciesFromServer);
          setspecies(speciesFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    })();
  }, []);

  return (
    <TableContainer
      className="table-responsive legendTable justify-content-center align-items-center"
      component={Paper}
    >
      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0px 5px",
        }}
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {species.sort(getComparator(order, orderBy)).map((species) => (
            <Row key={species.id} row={species} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
