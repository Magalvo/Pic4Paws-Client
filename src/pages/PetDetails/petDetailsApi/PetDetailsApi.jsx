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

import { useTheme } from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Navbar from '../../navBar/index';
import Carrousel from '../../../components/ImageSlider';
import { getApiPet } from '../../../api/apiPets.api';
import HorizontalScrollbar from '../../../components/HorizontalScrollbar';

export default function PetDetailsApi() {
  const [pet, setPet] = useState(null);
  const [image, setImage] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [largeImageUrls, setLargeImageUrls] = useState([]);
  const [petType, setPetType] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem('bearerToken');
  const parser = new DOMParser();
  const theme = useTheme();

  const [isSmallScreen] = useMediaQuery(`(max-width: 1100px)`);

  const fetchPet = async () => {
    try {
      const response = await getApiPet(id, bearerToken);
      console.log('This is the Pet response', response);
      setImage(response.data.animal.photos);
      setPet(response.data.animal);
      setPetType(response.data.animal.petType);
      setAge(response.data.animal.age);
      setTags(response.data.animal.tags);
      setGender(response.data.animal.gender);
      setName(response.data.animal.petName);
      const decodedText = parser.parseFromString(
        `<!doctype html><body>${response.data.animal.petDescription}`,
        'text/html'
      ).body.textContent;
      console.log(decodedText);
      setDescription(decodedText);
    } catch (e) {
      console.log('Error Fetching Project', e);
    }
  };

  useEffect(() => {
    if (image && image.length > 0) {
      // Extract "large" URLs from each photo object in the "photos" array
      const largeUrlsArray = image.map(photo => photo.large);
      console.log(largeUrlsArray);
      setLargeImageUrls(largeUrlsArray); // Update the state with filtered URLs
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

  return (
    <>
      <Navbar />
      <Container>
        {pet ? (
          <SimpleGrid
            columns={{ base: 1, lg: 1 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 0, md: 0 }}
          >
            <Flex>
              <Carrousel cards={largeImageUrls} />
            </Flex>
            <Flex
              direction={isSmallScreen ? 'column' : 'row'}
              justifyContent={isSmallScreen ? 'center' : 'space-between'}
              alignItems={isSmallScreen ? 'center' : 'flex-start'}
            >
              <Box
                mx='3rem'
                bg='white'
                p={{ base: 8, md: 16 }}
                rounded='md'
                textAlign='left'
                //mx='auto'
                my={10}
                maxW={{ base: '100%', md: '100%' }}
                width={{ base: '100%', md: '100%' }}
              >
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                    >
                      {name}
                    </Heading>
                    <Text
                      fontWeight={600}
                      fontSize={'2xl'}
                      stye={{ color: 'pink' }}
                    >
                      {gender} {' ● '}
                      {age}
                      {' ● '}
                      {petType === 'Dog' ? (
                        <Text
                          cursor='pointer'
                          color='teal.500'
                          onClick={() =>
                            navigate(
                              `/breeds/dog-breeds/${pet.breedsId.primaryId}`
                            )
                          }
                        >
                          {pet.breeds.primary}
                        </Text>
                      ) : (
                        <Text
                          cursor='pointer'
                          color='teal.500'
                          onClick={() =>
                            navigate(
                              `/breeds/cat-breeds/${pet.breedsId.primaryId}`
                            )
                          }
                        >
                          {pet.breeds.primary}
                        </Text>
                      )}
                    </Text>
                  </Box>

                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                      />
                    }
                  >
                    <Box spacing={{ base: 4, sm: 6 }}>
                      <Text
                        color={useColorModeValue('gray.500', 'gray.400')}
                        fontSize={'2xl'}
                        fontWeight={'300'}
                        textAlign='left'
                      >
                        {tags && tags.map(tag => `#${tag.trim()} `)}
                      </Text>
                      <Text fontSize={'lg'}>{pet.description}</Text>
                    </Box>

                    <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        color='#455eb5'
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}
                      >
                        Breeds
                      </Text>

                      <List spacing={2}>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Primary Breed:
                          </Text>{' '}
                          {pet.breeds.primary}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Secondary Breed:
                          </Text>{' '}
                          {pet.breeds.secondary ? pet.breeds.secondary : 'none'}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Mixed:
                          </Text>{' '}
                          {pet.breeds.primary && pet.breeds.secondary
                            ? 'Mixed Breed'
                            : 'Pure Breed'}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Unknown Breed:
                          </Text>{' '}
                          {!pet.breeds.primary && !pet.breeds.secondary
                            ? 'Unknown Breed'
                            : 'No'}
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Flex>

            {/* <LocationMap lng={location.lng} lat={location.lat} /> */}
            <Box sx={{ backgroundColor: '#638bf1' }}>
              <Text
                textAlign='center'
                fontWeight='600'
                color='white'
                fontSize='2rem'
                mt='1rem'
              >
                Other 4 Paws
              </Text>
              <HorizontalScrollbar petType={pet.type} />
            </Box>
          </SimpleGrid>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}
