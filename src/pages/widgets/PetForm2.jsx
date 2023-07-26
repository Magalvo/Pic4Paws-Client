import { useState, useEffect } from 'react';
import axios from 'axios';

import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
  FormControl
} from '@mui/material';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FlexBetween from '../../components/flexBetween';

import { createPet, upload } from '../../api/pets.api';
import MapComponent from '../../components/GoogleMaps';

const PetForm = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [breedSelectionVisible, setBreedSelectionVisible] = useState(false);

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery('(min-width: 600px)');

  const userId = localStorage.getItem('userId');

  const initialValues = {
    petDescription: '',
    pictures: [],
    petName: '',
    petType: '',
    primaryBreed: '',
    secondaryBreed: '',
    tags: [],
    gender: '',
    age: ''
  };

  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);

  const getCatBreeds = async () => {
    const res = await axios('https://api.thecatapi.com/v1/breeds', {
      headers: {
        Authorization: `${import.meta.env.VITE_CAT_API}`
      }
    });
    setCatBreeds(res.data);
  };

  useEffect(() => {
    getCatBreeds().catch(error => {
      // ...handle the error...
      console.error('error fetching breeds', error);
    });
  }, []);

  const getDogBreeds = async () => {
    const res = await axios('https://api.thedogapi.com/v1/breeds', {
      headers: {
        Authorization: `${import.meta.env.VITE_CAT_API}`
      }
    });
    setDogBreeds(res.data);
  };

  useEffect(() => {
    getDogBreeds().catch(error => {
      // ...handle the error...
      console.error('error fetching breeds', error);
    });
  }, []);

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const newPet = {
        petDescription: values.petDescription,
        pictures: values.pictures,
        petName: values.petName,
        petType: values.petType,
        primaryBreed: values.primaryBreed,
        secondaryBreed: values.secondaryBreed,
        tags: values.tags,
        gender: values.gender,
        age: values.age
      };

      if (newPet.pictures.length > 0) {
        // Upload each image to Cloudinary
        const uploadedUrls = await Promise.all(
          newPet.pictures.map(async image => {
            const uploadData = new FormData();
            uploadData.append('file', image);
            const response = await upload(uploadData);
            return response.data.fileUrl;
          })
        );
        newPet.photos = uploadedUrls;
      }

      newPet.userId = userId;

      const responseCreate = await createPet(newPet);

      const create = responseCreate.data;
      onSubmitProps.resetForm();
      console.log(create);
    } catch (error) {
      console.log('Error Updating the Project', error);
    }
  };

  return (
    <>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => {
          return (
            <Box>
              <Typography
                variant='h5'
                color='#638bf1'
                textAlign='center'
                fontWeight='bold'
                fontSize='2rem'
                mb='1rem'
              >
                Create a New 4 Paws
              </Typography>
              <form onSubmit={handleSubmit}>
                <MapComponent />
              </form>
            </Box>
          );
        }}
      </Formik>
    </>
  );
};

export default PetForm;
