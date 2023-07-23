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
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { getPet, removePet } from '../../../api/pets.api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import Navbar from '../../navBar/index';
import InfoPet from '../../../components/petInfo';

export default function PetDetails() {
  const [pet, setPet] = useState(null);
  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPet = async () => {
    try {
      const response = await getPet(id);
      console.log('This is the Pet response', response);
      setPet(response.data);
      setAge(response.data.age);
      setTags(response.data.tags);
      setGender(response.data.gender);
      setName(response.data.petName);
      setImage(response.data.profilePicture);
      setDescription(response.data.petDescription);
      setAge(response.data.age);
    } catch (e) {
      console.log('Error Fetching Project', e);
    }
  };

  useEffect(() => {
    fetchPet();
  }, [id]);
  //maxW={'7xl'} => Container
  return (
    <>
      <Navbar />
      {pet ? (
        <SimpleGrid
          columns={{ base: 1, lg: 1 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
          marginTop='-2rem'
        >
          <Image
            rounded={'md'}
            alt={'Pet Image'}
            src={
              image
                ? image
                : 'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg'
            }
            fit={'contain'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
          <InfoPet />
        </SimpleGrid>
      ) : (
        <Loading />
      )}
    </>
  );
}
