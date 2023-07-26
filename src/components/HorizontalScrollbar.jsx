import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import PetCard from '../pages/widgets/petApiWidget/petApiWidget';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className='right-arrow'>
      <img src={ArrowBackIcon} alt='left-arrow' />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className='left-arrow'>
      <img src={ArrowForwardIcon} alt='right-arrow' />
    </Typography>
  );
};

const HorizontalScrollbar = ({ petType }) => {
  const type = petType;
  const [pets, setPets] = useState([]);
  const fetchPetType = async () => {
    const bearerToken = localStorage.getItem('bearerToken');
    try {
      const response = await axios.get(
        `https://api.petfinder.com/v2/animals?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setPets(response.data);
    } catch (error) {
      console.log('PETCARD', error);
    }
  };

  useEffect(() => {
    fetchPetType();
  }, [type]);

  return (
    <div
      style={{
        backgroundColor: '#638bf1',
        overflowX: 'scroll',
        whiteSpace: 'nowrap'
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        {pets.animals &&
          pets.animals.map(pet => (
            <div key={pet._id} style={{ width: '300px' }}>
              <PetCard pet={pet} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
