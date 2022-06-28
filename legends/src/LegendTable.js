import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./LegendTable.css";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">
            <img src={row.defaultImg} width={75} height={50} />
          </TableCell>
          <TableCell align="left">{row.speciesName}</TableCell>
          <TableCell align="left">{row.speciesId}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Species
                </Typography>
                <Table size="small" aria-label="variants">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Img</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Level</TableCell>
                      <TableCell align="right">Rarity</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
export default function CollapsibleTable() {
    const [species, setspecies] = useState([]);

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
        <Table aria-label="collapsible table table-bordered border-dark">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Icon</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Count</TableCell>
              <TableCell align="left">All Species</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {species.map((species) => (
              <Row key={species.id} row={species}/>
                
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
