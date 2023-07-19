import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme
} from '@mui/material';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FlexBetween from '../../components/flexBetween';

import { createPet, upload } from '../../api/pets.api';

const PetForm = () => {
  const [photos, setPhotos] = useState([]);

  const navigate = useNavigate();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery('(min-width: 600px)');

  const userId = localStorage.getItem('userId');

  const initialValues = {
    petDescription: '',
    picture: '',
    petName: '',
    petType: '',
    primaryBreed: '',
    secondaryBreed: '',
    tags: [],
    gender: '',
    age: ''
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const newPet = {
        petDescription: values.petDescription,
        picture: values.picture,
        petName: values.petName,
        petType: values.petType,
        primaryBreed: values.primaryBreed,
        secondaryBreed: values.secondaryBreed,
        tags: values.tags,
        gender: values.gender,
        age: values.age
      };
      if (newPet.picture) {
        // Upload the image to Cloudinary
        const uploadData = new FormData();
        uploadData.append('file', newPet.picture);
        const response = await upload(uploadData);
        // Save the Cloudinary image URL instead of the file
        console.log(response.data.fileUrl);
        newPet.photos = [response.data.fileUrl];
      }

      newPet.userId = userId;

      const responseCreate = await createPet(newPet);

      const create = responseCreate.data;
      onSubmitProps.resetForm();
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
        }) => (
          <Box>
            <Typography
              variant='h5'
              color='#638bf1'
              textAlign='center'
              fontWeight='bold'
              fontSize='2rem'
              mb='1rem'
            >
              New Pet
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                display='grid'
                gap='30px'
                gridTemplateColumns='repeat(4,minmax(0,1fr))'
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                }}
              >
                <TextField
                  required
                  placeholder='Pet Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.petName}
                  name='petName'
                  sx={{ gridColumn: 'span 2' }}
                />

                <TextField
                  required
                  placeholder='Cat or Dog'
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.petType}
                  name='petType'
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  required
                  placeholder='Gender'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
                  name='gender'
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  required
                  placeholder='age'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  name='age'
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpeg,.jpeg,.png'
                    multiple={false}
                    onDrop={acceptedFiles => {
                      setFieldValue('picture', acceptedFiles[0]);
                      setPhotos(acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography>Add Pictures Here</Typography>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
                  required
                  placeholder='Pet Description'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.petDescription}
                  name='petDescription'
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  required
                  placeholder='Primary Bread'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primaryBreed}
                  name='primaryBreed'
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  placeholder='Secondary Bread'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.secondaryBreed}
                  name='secondaryBreed'
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  placeholder='Tags (coma separated)'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tags}
                  name='tags'
                  sx={{ gridColumn: 'span 4' }}
                />
              </Box>

              {/* BUTTONS */}
              <Box>
                <Button
                  fullWidth
                  type='submit'
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: '#6BBB52', //palette.primary.main,
                    color: 'white', //palette.background.alt,
                    '&:hover': '#6BBB5233', //{ color: palette.primary.main }
                    borderRadius: '60px'
                  }}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default PetForm;
