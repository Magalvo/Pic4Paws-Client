import { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@mui/material';

import PetsWidget from '../widgets/PetsWidget/PetsWidget';
import PetForm from '../widgets/PetForm';
import './Styles.css';

import Navbar from '../navBar/index';

import FormAccordion from '../../components/Accordion';

const Adoption = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <>
      <Navbar />
      <Grow in>
        <Container>
          <Typography variant='h2' color='inherit' align='center'>
            Adopt a 4 Paws
          </Typography>
          <Grid
            className='gridContainer'
            container
            direction='column-reverse'
            justify-content='space-between'
            alignItems='stretch'
            spacing={3}
          >
            <PetsWidget />
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Adoption;
