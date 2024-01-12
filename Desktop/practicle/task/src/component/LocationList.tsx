import React from 'react';
import styles from '../styles/LocationList.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';


const LocationList = () => {
  const countryState:any = useSelector((state:any)=>state.submitCountryReducer);
  const countryArr:any = countryState?.countries;
  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>REGION</TableCell>
            <TableCell>REGION</TableCell>
            <TableCell>CURRENCY</TableCell>
            <TableCell>CALLING CODE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countryArr.map((country:any) => (
            <TableRow
              key={country.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {country.region}
              </TableCell>
              <TableCell >{country.country}</TableCell>
              <TableCell >{country.currency}</TableCell>
              <TableCell >{country.callingCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div>
  );
};

export default LocationList;