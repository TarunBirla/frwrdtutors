import React, { useEffect, useState } from 'react';
import Topheader from '../topheader/topheader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Package.css'; // Include custom styles
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Packagedetails = () => {
  const navigate =useNavigate()

  const { tutorid } = useParams();
  const { id } = useParams();

  const [values, setValues] = useState({});

  const handleChange = (subject, value) => {
    const total = Object.values(values).reduce((sum, val) => sum + val, 0);
    const current = values[subject] || 0;
    const newTotal = total - current + value;
  
    if (newTotal <= packages.numberofclass) {
      setValues((prev) => ({ ...prev, [subject]: value }));
    }
  };
  const totalSelected = Object.values(values).reduce((sum, val) => sum + val, 0);
  // localStorage.setItem("totalSelected",totalSelected)

console.log("totalSelected",totalSelected)
  const [packages,setPackages]=useState("")
  const [tutordetails,setTutordetails]=useState("") 
useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/api/packega/${id}`);
      setPackages(response?.data);
      console.log('response???',response?.data);
      
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
  fetchSubjects();
}, []);

  
useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:4500/api/contractorsbyid/${tutorid}`);
      const tutorData = response?.data;

      // Parse subject string if it's not already an array
      if (typeof tutorData.subject === 'string') {
        tutorData.subject = JSON.parse(tutorData.subject);
      }

      setTutordetails(tutorData);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
  fetchSubjects();
}, []);

const Availabletutors = () => {
  const total = Object.values(values).reduce((sum, val) => sum + val, 0);
  const required = packages.numberofclass;

  if (total !== required) {
    toast.error(`Please allocate all ${required} classes across subjects before proceeding.`)
    // alert(`Please allocate all ${required} classes across subjects before proceeding.`);
    console.log("Selected subject allocation:", values);
    return;
  }

  console.log("All subjects selected with counts:",values );
  localStorage.setItem("totalSelected", JSON.stringify(values));

  navigate(`/slotbooking/${tutorid}`);
};

const Availablassessment = () => {
  const total = Object.values(values).reduce((sum, val) => sum + val, 0);
  const required = packages.numberofclass;

  if (total !== required) {
    toast.error(`Please allocate all ${required} classes across subjects before proceeding.`)

    // alert(`Please allocate all ${required} classes across subjects before proceeding.`);
    console.log("Selected subject allocation:", values);
    return;
  }

  console.log("Proceeding to assessment with subject allocation:", values);
  navigate(`/assessment/${tutorid}`);
};


  return (
    <>
    <Toaster/>
      <Topheader />
      <div className="package-container ">
        <div className="row">
          {/* Left: Package Card */}
          {packages && (
  <div className="col-lg-4">
    <h4 className="mb-4 font-weight-bold">{packages.name} Package</h4>
    <div className="package-grid justify-content-center">
      <div className={`package-card ${packages.name}`}>
        <div className="package-header">
          <h4>{packages.name.toUpperCase()}</h4>
          <span className="class-count">{packages.numberofclass} Classes</span>
        </div>
        <ul className="feature-list">
          <li dangerouslySetInnerHTML={{ __html: packages.description }}></li>
        </ul>
      </div>
    </div>
  </div>
)}


        
{tutordetails && (
  <div className="col-lg-8">
    <div className="row mt-5">
      {[...new Map(
        tutordetails.subject.map((s) => [s.name, s])
      ).values()].map((subject) => (
        <div key={subject.name} className="col-lg-6 mb-4">
          <div className={`slider-card ${subject.name === 'English' ? 'active-border' : ''}`}>
            <div className="d-flex justify-content-between mb-2">
              <h6>{subject.name}</h6>
              <span>{values[subject.name] || 0}/{packages.numberofclass || 6}</span>
            </div>
            <input
              type="range"
              className="form-range custom-range"
              min="0"
              max={(packages.numberofclass || 6) - totalSelected + (values[subject.name] || 0)}
              value={values[subject.name] || 0}
              onChange={(e) =>
                handleChange(subject.name, parseInt(e.target.value))
              }
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)}



        </div>
        <div className="action-buttons">
          <button className="assessment-btn" onClick={Availablassessment}>Free Assessment</button>
          <button className="book-btn" onClick={Availabletutors}>Book Now</button>
        </div>
      </div>
    </>
  );
};

export default Packagedetails;
