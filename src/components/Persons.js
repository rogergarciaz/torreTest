import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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

export default function Persons() {
  const classes = useStyles();
  const [info, setInfo] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const history = useHistory();
  const offset = 30; // don't variate with increasing data
  const size = 15; //quantity of data
  const aggregate = 'torre'; // don't change a thing
  const url = `https://search.torre.co/people/_search/?[offset=${offset}&size=${size}&aggregate=${aggregate}]`;
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

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {console.log(info)}
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
              Persons
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph
            >
              Every time you click the button <strong>Random</strong> it will
              search for amazing people that are using Torre.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleSearch()}
                  >
                    Random
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => setReady(!ready)}
                  >
                    {!ready ? 'Show' : 'Hide'}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth='lg'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {ready
              ? info.results.map((profile, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={
                          profile.picture
                            ? profile.picture
                            : 'https://source.unsplash.com/random'
                        }
                        title='Image'
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {profile.name}
                        </Typography>
                        <Typography>
                          {profile.professionalHeadline}, located in{' '}
                          {profile.locationName}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size='small'
                          color='primary'
                          onClick={() =>
                            history.push(`/profile/${profile.username}`)
                          }
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              : ''}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
