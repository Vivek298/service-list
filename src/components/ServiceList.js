import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ServiceForm from './ServiceForm';

const ServiceList = ({ services, updateService, deleteService }) => {
  const [editingService, setEditingService] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleEditClick = (service) => {
    setEditingService(service);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete.id);
      setOpenDeleteDialog(false);
      setServiceToDelete(null);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
            <Card sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant="h6" noWrap>
                  {service.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {service.description}
                </Typography>
                <Typography variant="body1">
                  ${service.price}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => handleEditClick(service)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="secondary"
                  onClick={() => handleDeleteClick(service)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '30vh' }}
          >
            <ServiceForm
              serviceToEdit={editingService}
              updateService={(updatedService) => {
                updateService(updatedService);
                setOpenEditDialog(false);
                setEditingService(null);
              }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{' '}
            {serviceToDelete ? serviceToDelete.name : ''}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServiceList;
