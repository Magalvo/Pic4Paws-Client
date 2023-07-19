import { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@mui/material';
import useStyles from './styles';
import PetsWidget from '../widgets/PetsWidget/PetsWidget';
import PetForm from '../widgets/PetForm';

import Navbar from '../navBar/index';

const Adoption = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grow in>
        <Container>
          <Typography
            variant='h2'
            color='inherit'
            align='center'
            className={classes.heading}
          >
            Adopt a 4 Paws
          </Typography>
          <Grid
            className={classes.mainContainer}
            container
            direction='column-reverse'
            justify-content='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <PetsWidget />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PetForm currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Adoption;
