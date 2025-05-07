import React, { useState, useEffect } from 'react';
import './AvailableTutors.css';
import { FaStar } from 'react-icons/fa';
import Topheader from '../topheader/topheader';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AvailableTutors = () => {
  const { subject } = useParams(); // e.g., "Maths Specialist" or "English"

  const [filteredContractors, setFilteredContractors] = useState([]);
 
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get('https://apifrwrd.smplyrefer.com/api/contractorsalldata');

        const updatedData = response.data.map(tutor => ({
          ...tutor,
          parsedSubjects: JSON.parse(tutor.subject), // Parse subject string to array
        }));


        // Filter based on the subject from the route param (match sub.name, not category_name)
        const filtered = updatedData.filter(tutor =>
          tutor.parsedSubjects.some(sub =>
            sub.name.toLowerCase() === decodeURIComponent(subject).toLowerCase()
          )
        );

        setFilteredContractors(filtered);
      } catch (error) {
        console.error('Error fetching contractor data:', error);
      }
    };

    fetchContractors();
  }, [subject]);

  

  

  return (
    <>
      <Topheader />
      <div className="container mt-4">
        <h4 className="mb-4 font-weight-bold">Available Tutors for "{decodeURIComponent(subject)}"</h4>

        <div className="row">
          {filteredContractors.map((tutor) => (
            <div className="col-md-6 mb-3" key={tutor.id}>
              <div className="tutor-card h-100">
                <div className="d-flex align-items-start">
                  <img
                    src={tutor.photo}
                    alt={`${tutor.first_name} ${tutor.last_name}`}
                    className="tutor-img mr-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="tutor-name mb-1">
                      {tutor.first_name} {tutor.last_name}
                    </h6>
                    <div>
                      {tutor.parsedSubjects.map((subj, i) => (
                        <span className="subject-badge" key={i}>{subj.name}</span>
                      ))}
                    </div>
                    <p className="tutor-desc">{tutor.town}, {tutor.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="tutor-rating">
                      <FaStar className="text-warning" />
                      <strong>4.5</strong>
                    </div>
                    <p className="small text-muted mb-0"><strong>12</strong> reviews</p>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button className="select-btn" >Select Tutor</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default AvailableTutors;
