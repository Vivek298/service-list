import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';

const ServiceForm = ({ addService, serviceToEdit, updateService }) => {
  const [service, setService] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    if (serviceToEdit) {
      setService(serviceToEdit);
    } else {
      setService({ name: '', description: '', price: '' });
    }
  }, [serviceToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service.name && service.description && service.price) {
      if (serviceToEdit) {
        updateService(service);
      } else {
        addService({ ...service, id: Date.now() });
      }
      setService({ name: '', description: '', price: '' }); // Clear the form after submission
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{ padding: '1rem' }} // Removed top margin to integrate better
    >
      <Paper elevation={3} style={{ padding: '1rem', width: '400px', marginLeft: '20px', marginTop: '40px'}}>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                label="Service Name"
                name="name"
                value={service.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Service Description"
                name="description"
                value={service.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={service.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                {serviceToEdit ? 'Update Service' : 'Add Service'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default ServiceForm;
