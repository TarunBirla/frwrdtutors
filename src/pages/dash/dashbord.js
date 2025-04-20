import React from 'react';
import Topheader from '../topheader/topheader';
import './dash.css';
import Featured from '../Featured/Featured';
import { useNavigate } from 'react-router-dom';

const Dashbord = () => {
  const naviagte =useNavigate()
  const packegescreen=()=>{
    naviagte('/package')
  }
  return (
    <>
      <Topheader />
      <div className="searchsection-wrapper">
  <div className="searchsection container">
    <div className="row">
      <div className="col-lg-3">
        <div className="form-group">
          <label>Select Class</label>
          <select className="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="form-group">
          <label>Select Subject</label>
          <select className="form-control">
            <option>Bio</option>
            <option>Maths</option>
            <option>Chemistry</option>
          </select>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="form-group">
          <label>Location</label>
          <select className="form-control">
            <option>Indore</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Kota</option>
          </select>
        </div>
      </div>

      <div className="col-lg-3 d-flex justify-content-center">
        <button className="search-btn" onClick={packegescreen}>Search</button>
      </div>
    </div>
  </div>
</div>

      <Featured/>
    </>
  );
};

export default Dashbord;
