import React from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'none',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [info, setInfo] = React.useState([]);
  const [datachart, setDatachart] = React.useState([]);
  const [dataorders, setDataorders] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  // const offset = 16; // increase offset of data
  // const size = 69; //quantity of data
  const aggregate = ''; // don't change nothing yet
  let { offset, size } = useParams();
  if (!offset || offset === 'undefined') {
    offset = 16;
  }
  if (!size || size === 'undefined') {
    size = 69;
  }
  const url = `https://search.torre.co/people/_search/?offset=${offset}&size=${size}&aggregate=${aggregate}`;
  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    fetch(url, { method: 'POST' })
      .then(res => res.json())
      .then(contents => setInfo(contents))
      .catch(() =>
        console.log('Can’t access ' + url + ' response. Blocked by browser?')
      );
  };

  const cleanData = () => {
    let location = [];
    let result = [];
    setDataorders(info.results);
    info.results.map(profile => {
      location = [...location, profile.locationName];
      return null;
    });
    var unique = location.filter(onlyUnique);
    unique.map(uniq => {
      let count = countData(uniq);
      result = [...result, { name: uniq, quantity: count }];
      return null;
    });
    setDatachart(result);
    setReady(true);
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const countData = uniq => {
    let count = info.results.reduce(
      (acc, cur) => (cur.locationName === uniq ? ++acc : acc),
      0
    );
    return count;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {ready ? (
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart data={datachart} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits offset={offset} size={size} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders rows={dataorders} datachart={datachart} />
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Button
              variant='outlined'
              color='primary'
              onClick={() => cleanData()}
            >
              {!ready ? 'Show Data' : 'Hide Data'}
            </Button>
          )}
        </Container>
      </main>
    </div>
  );
}
