import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem
} from '@chakra-ui/react';

import axios from 'axios';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { getPet, removePet } from '../../../api/pets.api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Navbar from '../../navBar/index';
import ImageSlider from '../../../components/ImageSlider';

export default function PetDetailsApi() {
  const [pet, setPet] = useState(null);
  const [image, setImage] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const bearerToken = localStorage.getItem('bearerToken');

  const fetchPet = async () => {
    try {
      const response = await axios.get(
        `https://api.petfinder.com/v2/animals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );

      setImage(response.data.animal.photos);

      console.log('This is the Pet response', response);
      setPet(response.data.animal);
      setAge(response.data.animal.age);
      setTags(response.data.animal.tags);
      setGender(response.data.animal.gender);
      setName(response.data.animal.name);
      setDescription(response.data.animal.description);
    } catch (e) {
      console.log('Error Fetching Project', e);
    }
  };

  useEffect(() => {
    const largeUrlsArray = image.reduce((urls, photo) => {
      if (photo.hasOwnProperty('large')) {
        urls.push(photo.large);
      }
      return urls;
    }, []);
    setImage(largeUrlsArray);
  }, []);

  useEffect(() => {
    fetchPet();
  }, [id]);
  //maxW={'7xl'} => Container

  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto'
  };
  return (
    <>
      <Navbar />
      <Container>
        {pet ? (
          <SimpleGrid
            columns={{ base: 1, lg: 1 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <ImageSlider cards={image} />
            </Flex>
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
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={300}
                  fontSize={'2xl'}
                >
                  {gender}
                  {'°'}
                  {age}
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
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue('gray.500', 'gray.400')}
                    fontSize={'2xl'}
                    fontWeight={'300'}
                  >
                    {tags && tags.map(tag => `#${tag} `)}
                  </Text>
                  <Text fontSize={'lg'}>{description}</Text>
                </VStack>

                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
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
                      {pet.breeds.mixed ? 'Mixed Breed' : 'Pure Breed'}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Unknown Breed:
                      </Text>{' '}
                      {pet.breeds.unknown ? 'Unknown Breed' : 'No'}
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('gray.900', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg'
                }}
              >
                Contact Owner
              </Button>
            </Stack>
          </SimpleGrid>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}
