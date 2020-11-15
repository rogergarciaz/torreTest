import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  let { offset, size } = useParams();
  if (!offset || offset === 'undefined') {
    offset = 16;
  }
  if (!size || size === 'undefined') {
    size = 69;
  }
  return (
    <React.Fragment>
      <Title>Values</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Subject Id</TableCell>
            <TableCell>User name</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell># by Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.subjectId}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.locationName}</TableCell>
              <TableCell>
                {props.datachart.map(item =>
                  item.name === row.locationName ? item.quantity : null
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link
          color='primary'
          to={`/persons/${offset}/${size}`}
          style={{ textDecoration: 'none' }}
        >
          See Persons
        </Link>
      </div>
    </React.Fragment>
  );
}
