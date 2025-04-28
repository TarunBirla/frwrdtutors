import React, { useEffect, useState } from 'react';
import './Package.css';
import Topheader from '../topheader/topheader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';




const Package = () => {
  const {id} =useParams()
  const [packages,setPackages]=useState([])
const [tutorid,setTutorid]=useState("")

useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/allpackega');
      setPackages(response.data);
      console.log('response',response.data);
      
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
  fetchSubjects();
}, []);

useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/api/contractorsbyid/${id}`);
      setTutorid(response?.data?.id);
      // console.log('contractorsbyid???',response?.data?.id);
      
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
  fetchSubjects();
}, []);


  return (
    <>
      <Topheader />
      <div className="package-container">
        <h4 className="mb-4 font-weight-bold">Package</h4>

        <div className="package-grid">
          {packages.map((pkg, index) => (
            <Link to={`/packagedetails/${tutorid}/${pkg.id}`} key={index} className="package-link">
              <div className={`package-card ${pkg.name}`}>
                <div className="package-header">
                  <h4>{pkg.name.toUpperCase()}</h4>
                  <span className="class-count">{pkg.numberofclass} Classes</span>
                </div>
                <ul className="feature-list">
                <li dangerouslySetInnerHTML={{ __html: pkg.description }}></li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">Term</button>


      <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Terms & conditions</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body" style={{ height: '350px', overflowY: 'auto' }}>
              <p><strong>1 Terms</strong><br/>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>


            </div>
            <div className="modal-footer custom-footer">
  <div className="row w-100">
    <div className="col-6 d-flex justify-content-center">
      <button type="button" className="custom-button" data-dismiss="modal">Decline</button>
    </div>
    <div className="col-6 d-flex justify-content-center">
      <button type="button" className="custom-button">Accept</button>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

    </>
  );
};

export default Package;
