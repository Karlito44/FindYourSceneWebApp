import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, TablePagination } from '@material-ui/core';
import { v4 as uuid_v4 } from "uuid";
import './TableFilms.css';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(title, production, type, genre, language, date, plot, address, actors, released) {
  return {
    title,
    production,
    type,
    genre,
    language,
    details: [
      { date, plot, address, actors, released }
    ],
  };
}

function Row(props) {
  const { row, adresse } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{row.production}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.genre}</TableCell>
        <TableCell align="right">{row.language}</TableCell>
        <TableCell align="right">
          <Button variant="contained" size="small" color="primary" >
            <a className="link" href={adresse} target="_blank" rel="noreferrer">Trouver la scène</a>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Détails
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Résumé</TableCell>
                    <TableCell align="left">Réalisateur(s)</TableCell>
                    <TableCell align="left">Acteur(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detail) => (
                    <TableRow key={uuid_v4()}>
                      <TableCell>
                        {detail.date}
                      </TableCell>
                      <TableCell>
                        {detail.plot}
                      </TableCell>
                      <TableCell>
                        {detail.released.map((realisator, index) => (
                          <div key={uuid_v4()}>
                            {index + 1 === detail.released.length ? realisator : realisator + ", "}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                      {detail.actors.map((actor, index) => (
                          <div key={uuid_v4()}>
                            {index + 1 === detail.actors.length ? actor : actor + ", "}
                          </div>
                        ))}
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

Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    production: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
};

const rows = [
  createData('L\'Attaque des titans', "Studio Kaze", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Demon Slayer', "Studio Ina", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Dragon Ball Super', "Studio Baba", "Shojo", "Combat", "Française", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('L\'Attaque des titans', "Studio Kaze", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Demon Slayer', "Studio Ina", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Dragon Ball Super', "Studio Baba", "Shojo", "Combat", "Française", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('L\'Attaque des titans', "Studio Kaze", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Demon Slayer', "Studio Ina", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Dragon Ball Super', "Studio Baba", "Shojo", "Combat", "Française", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('L\'Attaque des titans', "Studio Kaze", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Demon Slayer', "Studio Ina", "Shonen", "Combat", "Japonaise", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"]),
  createData('Dragon Ball Super', "Studio Baba", "Shojo", "Combat", "Française", "2020-01-05", "Charly inherited the family butcher's shop. As she prepares to sell it, Martial, the boss's former clerk, decides to fight to get the business back. These two characters who are completely opposed will be brought to cohabit.", "6 allée Robert", ["George", "Brassens", "Eric"], ["Bernard", "Robert"])
];

export default function TableFilms({ listFilms }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className="table" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Titre</TableCell>
            <TableCell align="left">Producteur</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Genre</TableCell>
            <TableCell align="left">Langue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <Row key={uuid_v4()} row={row} adresse="https://www.google.com/maps/search/?api=1&query=6+rue+louis+pergaut" />
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[2, 4]}
          count={rows.length}
          // component="tfoot"
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
