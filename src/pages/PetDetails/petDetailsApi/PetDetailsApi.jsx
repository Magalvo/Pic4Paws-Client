import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem
} from '@chakra-ui/react';

import { useMediaQuery } from '@chakra-ui/react';

import { css } from '@emotion/react';

import { useTheme } from '@mui/material';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Navbar from '../../navBar/index';
import Carrousel from '../../../components/ImageSlider';
import MapComponent from '../../../components/GoogleMaps';
import { getPet } from '../../../api/pets.api';
import LocationMap from '../../../components/LocationMap';

export default function PetDetailsV2() {
  const [pet, setPet] = useState(null);
  const [image, setImage] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [largeImageUrls, setLargeImageUrls] = useState([]);
  const [location, setLocation] = useState([]);
  const [petType, setPetType] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem('bearerToken');
  const parser = new DOMParser();
  const theme = useTheme();

  const [isSmallScreen] = useMediaQuery(`(max-width: 1100px)`);

  const fetchPet = async () => {
    try {
      const response = await getPet(id);
      console.log('This is the Pet response', response);
      setImage(response.data.photos);
      setPet(response.data);
      setPetType(response.data.petType);
      setAge(response.data.age);
      setTags(response.data.tags);
      setGender(response.data.gender);
      setName(response.data.petName);
      const decodedText = parser.parseFromString(
        `<!doctype html><body>${response.data.petDescription}`,
        'text/html'
      ).body.textContent;
      console.log(decodedText);
      setDescription(decodedText);
      setLocation(response.data.location);
    } catch (e) {
      console.log('Error Fetching Project', e);
    }
  };

  useEffect(() => {
    if (image && image.length > 0) {
      // Extract "large" URLs from each photo object in the "photos" array
      /*  const largeUrlsArray = image.map(photo => photo.large);
      console.log(largeUrlsArray); */
      setLargeImageUrls(image); // Update the state with filtered URLs
    }
  }, [image]);

  useEffect(() => {
    fetchPet();
  }, [id]);
  //maxW={'7xl'} => Container

  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto'
  };

  let colorGender = '';
  if (gender === 'Male') {
    colorGender = '#539CE9';
  } else if (gender === 'Female') {
    colorGender = '#cc44ea';
  } else {
    colorGender = 'Black';
  }

  return <LocationMap lng={location.lng} lat={location.lat} />;
}
