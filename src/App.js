import React, { useState } from 'react';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';
import Navbar from './components/Navbar';

const App = () => {
  const [services, setServices] = useState([]);

  const addService = (newService) => {
    setServices((prevServices) => [
      ...prevServices,
      { ...newService },
    ]);
  };

  const updateService = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const deleteService = (serviceId) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId)
    );
  };

  return (
    <div>
      <Navbar />
      <ServiceForm addService={addService} />
      <ServiceList
        services={services}
        updateService={updateService}
        deleteService={deleteService}
      />
    </div>
  );
};

export default App;
