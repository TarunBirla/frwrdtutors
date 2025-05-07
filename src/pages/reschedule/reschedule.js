import React, { useEffect, useState } from 'react';
import './reschedule.css';
import Topheader from '../topheader/topheader';
import tutorimage from '../../assets/image/tutor1.png';
import axios from 'axios';

const Reschedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [rescheduleStates, setRescheduleStates] = useState({});
  const [feedbackStates, setFeedbackStates] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
  const studentid = localStorage.getItem("studentid");

  useEffect(() => {
    const fetchAppointmentsAndServices = async () => {
      try {
        const res = await axios.get(`https://apifrwrd.smplyrefer.com/api/appointments/?recipient=${studentid}`);
        const appointments = res.data.results || [];
        setAppointments(appointments);

        // Fetch all related service details
        const serviceData = {};
        await Promise.all(
          appointments.map(async (appt) => {
            const serviceUrl = appt.service?.url;
            if (serviceUrl) {
              const serviceRes = await axios.get(serviceUrl);
              serviceData[appt.id] = serviceRes.data;
              console.log("serviceRes",serviceRes);
              
            }
          })
        );
        setServiceDetails(serviceData);
      } catch (error) {
        console.error('Error fetching appointments or service data:', error);
      }
    };

    fetchAppointmentsAndServices();
  }, [studentid]);

  const toggleReschedule = (id) => {
    setRescheduleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFeedback = (id) => {
    setFeedbackStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
  const formatTime = (dateStr) => new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <Topheader />
      <div className="card-container row">
        {appointments.map((appt) => {
          const service = serviceDetails[appt.id];
          const contractorName = service?.conjobs?.[0]?.name || 'Unknown Tutor';

          return (
            <div className="col-4" key={appt.id}>
              <div className="card">
                <div className="profile-section">
                  <img src={tutorimage} alt="Tutor" className="profile-img" />
                  <div>
                    <h3>{contractorName}</h3>
                    <p>{appt.topic || 'Subject'}</p>
                  </div>
                  <span className={`status-tag ${appt.status}`}>{appt.status}</span>
                </div>
                <div className="info-section">
                  <p><i className="fa fa-map-marker"></i> Online</p>
                  <p><strong>Date:</strong> {formatDate(appt.start)}</p>
                  <p><strong>Time:</strong> {formatTime(appt.start)} - {formatTime(appt.finish)}</p>
                  <p><strong>Duration:</strong> 60 min</p>
                </div>
                <div className="button-group">
                  <button onClick={() => toggleReschedule(appt.id)}>Reschedule</button>
                  <button onClick={() => toggleFeedback(appt.id)}>Review</button>
                </div>

                {rescheduleStates[appt.id] && (
                  <div className="reschedule-section">
                    <label>Select New Date & Time:</label>
                    <input type="datetime-local" />
                  </div>
                )}

                {feedbackStates[appt.id] && (
                  <div className="feedback-section">
                    <h4>Feedback</h4>
                    <p>What are your thoughts on the class you attended?</p>
                    <label>Rate your Class:</label>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map(num => (
                        <span key={num} className="star">★</span>
                      ))}
                    </div>
                    <textarea placeholder="Do you have any thoughts you’d like to share?" />
                    <div className="feedback-buttons">
                      <button className="cancel-btn" onClick={() => toggleFeedback(appt.id)}>Cancel</button>
                      <button className="submit-btn">Submit</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reschedule;
