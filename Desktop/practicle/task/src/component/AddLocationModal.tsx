import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, InputLabel, MenuItem, Select, Button ,Container } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { submitCountryAction } from '../redux/actions/submitCountry';





// import { GoPlus } from "react-icons/go";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface PropTypes {
  handleClose: () => void;
  open: boolean
}



const AddLocationModal = ({ open, handleClose }: PropTypes) => {
  const [regions, setRegions] = useState<any>([]);
  const dispatch = useDispatch();
  const countries = useSelector((state:any)=>state.submitCountryReducer);
  console.log(countries ,"countre")
  const [countriesByRegion, setCountriesByRegion] = useState<any>({});
  useEffect(() => {
    // Fetch regions from the API
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const uniqueRegions = Array.from(new Set(response.data.map((country:any) => country.region)));
        setRegions(uniqueRegions);
      })
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  const formik = useFormik({
    initialValues: {
      region: '',
      country: '',
    },
    validationSchema: Yup.object({
      region: Yup.string().required('Please select a region'),
      country: Yup.string().required('Please select a country'),
    }),
    onSubmit: (values) => {
      // Fetch additional information (currency and calling code) based on the selected country
      if (values.country) {
        axios.get(`https://restcountries.com/v3.1/name/${values.country}?fullText=true`)
          .then(response => {
            console.log(response.data , "data")
            const countryInfo = response.data[0];
            const keyArr = Object.keys(countryInfo?.currencies);
            const currencyName = countryInfo?.currencies[keyArr[0]];
            const newArr = countries.countries;
            newArr.push({
              region: values.region,
              country: values.country,
              currency: currencyName?.name,
              callingCode: countryInfo?.idd?.root + countryInfo?.idd?.suffixes[0],
            })

            dispatch(submitCountryAction(newArr));
            handleClose();
          })
          .catch(error => console.error('Error fetching country information:', error));
      }

      // Handle the rest of the form submission logic
      
    },
  });
  useEffect(() => {
    // Fetch countries based on selected region
    if (formik.values.region) {
      axios.get(`https://restcountries.com/v3.1/region/${formik.values.region}`)
        .then(response => {
          const countries = response.data.map((country:any) => country.name.official);
          setCountriesByRegion((prevState:any) => ({ ...prevState, [formik.values.region]: countries }));
        })
        .catch(error => console.error('Error fetching countries:', error));
    }
  }, [formik.values.region]);





  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        p={3}
        style={{
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add a Location
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="region">Select Region</InputLabel>
            <Select
              id="region"
              name="region"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.region}
              error={formik.touched.region && Boolean(formik.errors.region)}
            >
              <MenuItem value="" disabled>
                Select a region
              </MenuItem>
              {regions.map((region:any) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.region && formik.errors.region && (
              <div style={{ color: 'red', marginTop: '8px' }}>
                {formik.errors.region}
              </div>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="country">Select Country</InputLabel>
            <Select
              id="country"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              error={formik.touched.country && Boolean(formik.errors.country)}
            >
              <MenuItem value="" disabled>
                Select a country
              </MenuItem>
              {formik.values.region &&
                (countriesByRegion[formik.values.region] || []).map((country:any) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <div style={{ color: 'red', marginTop: '8px' }}>
                {formik.errors.country}
              </div>
            )}
          </FormControl>

          <Button type="submit" variant="contained" sx={{backgroundColor:"black"}} fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>

    </Modal>
  );
};

export default AddLocationModal;
