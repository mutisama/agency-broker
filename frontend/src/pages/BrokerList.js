import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await axios.get('/list');
    setData(result.data);
    console.log(result.data);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label='simple table'
        style={{ margin: '1rem' }}>
        <TableHead>
          <h2 style={{ marginLeft: '1rem' }}>Broker List</h2>
          <TableRow>
            <TableCell align='right'>First name</TableCell>
            <TableCell align='right'>Last name</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Address</TableCell>
            <TableCell align='right'>Agency name</TableCell>
            <TableCell align='right'>Agency domain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={Math.random().toString()}>
              <TableCell component='th' scope='row'>
                {row.firstname}
              </TableCell>
              <TableCell align='right'>{row.lastname}</TableCell>
              <TableCell align='right'>{row.email}</TableCell>
              <TableCell align='right'>{row.address}</TableCell>
              <TableCell align='right'>{row.title}</TableCell>
              <TableCell align='right'>{row.domain}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
