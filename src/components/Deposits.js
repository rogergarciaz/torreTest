import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Deposits(props) {
  let { offset, size } = useParams();
  if (!offset || offset === 'undefined') {
    offset = 16;
  }
  if (!size || size === 'undefined') {
    size = 69;
  }
  return (
    <React.Fragment>
      <Title>Variables</Title>
      <Typography component='p' variant='h4'>
        Offset: {props.offset}
      </Typography>
      <Typography component='p' variant='h4'>
        Size: {props.size}
      </Typography>
      <br />
      <div>
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
