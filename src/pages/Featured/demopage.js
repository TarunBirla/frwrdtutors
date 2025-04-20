import React, { useState } from 'react';
import axios from 'axios';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  
    title: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        ...formData,
      }
    };

    try {
      const response = await axios.post(
        'http://localhost:4500/api/clients',
        data,
      
      );
      console.log('Client created:', response.data);
      alert('Client added successfully!');
    } catch (error) {
      console.error('Error adding client:', error.response?.data || error);
      alert('Failed to add client');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add New Client</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
            <div className="form-group col-md-4">
                <label>Title</label>
                <select name="title" className="form-control" value={formData.title} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                  <option>Dr</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>First Name</label>
                <input type="text" name="first_name" className="form-control" value={formData.first_name} onChange={handleChange} required />
              </div>
              <div className="form-group col-md-4">
                <label>Last Name</label>
                <input type="text" name="last_name" className="form-control" value={formData.last_name} onChange={handleChange} required />
              </div>
            </div>
           
            <div className="form-row">


            
              <div className="form-group col-md-4">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              </div>
             
            </div>


           

            

            
           

            <button type="submit" className="btn btn-success ml-auto">Add Client</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
