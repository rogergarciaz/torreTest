import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Explanation() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth='lg'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Internship Test
            </Typography>
            <Typography
              variant='h5'
              align='left'
              color='textSecondary'
              paragraph
            >
              In this app you will found three sections, which are: <br />
              <strong>1- Persons:</strong> you can search randomly all the
              people that appears in torre DB, and see a brieve resume, also you
              can see more details of a selected profile. <br />
              <strong>2- Graphs:</strong> you can also see this data in a Graph
              way with a Table and the variables that are being used for obtain
              that data.
              <br />
              <strong>3- Explanation:</strong> the page where you are right now,
              with this short explanation of the app.
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
