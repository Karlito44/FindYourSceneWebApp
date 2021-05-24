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

function createData(title, production, type, genre, language, date, plot, address, actors) {
  return {
    title,
    production,
    type,
    genre,
    language,
    details: [
      { date, plot, address, actors }
    ],
  };
}

function Row(props) {
  const { film, city } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
      {/* <TableRow > */}
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {film.title.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + film.title.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}
        </TableCell>
        <TableCell align="left">{film.production.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + film.production.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}</TableCell>
        <TableCell align="left">{film.type.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + film.type.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}</TableCell>
        <TableCell align="left">{film.genre.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + film.genre.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}</TableCell>
        <TableCell align="left">{film.language.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + film.language.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}</TableCell>
        <TableCell align="left">
          <Button variant="contained" size="small" color="primary" >
            {/* {film.details.map((detail)=> { */}
              <a className="link" href={"https://www.google.com/maps/search/?api=1&query=" + film.details[0].address.value + "+" + city} target="_blank" rel="noreferrer">Trouver la scène</a>
            {/* })} */}
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
                    <TableCell align="left">Acteur(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {film.details.map((detail) => (
                    <TableRow key={uuid_v4()}>
                      <TableCell align="left">
                        {detail.date.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + detail.date.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}
                      </TableCell>
                      <TableCell align="left">
                        {detail.plot.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + detail.plot.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}
                      </TableCell>
                      <TableCell align="left">
                        {detail.actors.value.replaceAll("_"," ").replaceAll("�","é").charAt(0).toUpperCase() + detail.actors.value.slice(1).replaceAll("_"," ").replaceAll("�","é")}
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


export default function TableFilms({ listFilms, city }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("page:", page)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var films = []
  listFilms.map(elem => {
    films.push(createData(elem.labelFilm, elem.labelProduction, elem.labelType, elem.labelGenre, elem.langue, elem.date, elem.resume, elem.adresse, elem.labelActeur))
  })

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
          {films.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((film) => (
            <Row key={uuid_v4()} film={film} city={city} />
          ))}
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2, 4]}
              count={films.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
