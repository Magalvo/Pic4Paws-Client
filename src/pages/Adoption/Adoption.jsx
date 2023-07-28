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
            <Grid item xs={12} sm={7}>
              <PetsWidget />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <PetForm /> */}
              {/* <NewPetForm /> */}
              {/* <PetForm currentId={currentId} setCurrentId={setCurrentId} /> */}
              {/* <CreatePaws /> */}
              <FormAccordion />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Adoption;
