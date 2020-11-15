import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
    padding: theme.spacing(1, 0, 1),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    width: '100%',
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

export default function Profile() {
  const classes = useStyles();
  const { username } = useParams();
  const [info, setInfo] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const history = useHistory();
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const url = `https://torre.bio/api/bios/${username}`;
  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    fetch(proxyurl + url, { method: 'GET' })
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
              Profile
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph
            >
              Here you see detailed info from the profile you selected
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
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
          <Grid container spacing={1} justify='center'>
            {ready ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image='https://source.unsplash.com/random'
                    image={
                      info.person.picture
                        ? info.person.picture
                        : 'https://source.unsplash.com/random'
                    }
                    title='Image'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {info.person.name}
                    </Typography>
                    <Typography>{info.person.professionalHeadline}</Typography>
                    <Typography>{info.person.summaryOfBio}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      color='primary'
                      onClick={() => history.push('/persons')}
                    >
                      See Persons
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ) : (
              <Typography
                gutterBottom
                variant='h3'
                component='h3'
                style={{ textAlign: 'center' }}
              >
                Nothing to show
              </Typography>
            )}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
